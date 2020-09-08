const initialState = {
  currentUser: "",
  admin: false,
  character: {},
  character_info: {
    ability_scores: {},
    classes: [],
    hardcode: {},
    bonuses: [],
    features: [],
		forbidden: [],
    effects: [],
    size: 'Medium',
    actions: {
      full: false,
      standard: false,
      move: false,
      swift: false,
      immediate: false
    },
    conditions: [],
    proficiencies: {weapon: {groups: [], individualIds: []}, armor: {groups: [], individualIds: []}},
    movement: [],
    load: 0,
    equipped: [],
		activeFeatures: [],
		temporaryHitPoints: [],
		statusConditions: [],
		displayDescriptions: []
  },
  classes: [],
  races: [],
  spells: [],
  tooltip: {},
  modal: {},
	websocket: {},
	notifications: [],
	storedNotifications: []
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case "SIGNIN":
      return {...state, currentUser: action.user, admin: action.admin};
    case "SIGNOUT":
      return {...state, currentUser: "", admin: false};
    case "CHARACTER":
      // hardcoded stuff
      let size = 'Medium'
      if (action.character.name === "Nettie"){
        size = 'Tiny'
      }
      if (action.character.name === 'Cedrick'){
        size = 'Small'
      }
      // hardcoded end
      let classesCopy = state.character_info.classes
      let clearedCopy = classesCopy.map(cc => {
        let copiedClassInfo = {...cc}
        copiedClassInfo.castSpells = {}
        return copiedClassInfo
      })
      let staticStats = hardcoded(state, {name: action.character.name})
      // hardcoded new data
        staticStats.armor = state.character_info.hardcode.armor
        staticStats.crew = state.character_info.hardcode.crew
      // hardcoded new data end
      return {...state, character: action.character, character_info: {...state.character_info, classes: clearedCopy, size: size, hardcode: staticStats}};
		case "START WEBSOCKET":
			console.log("initialized websocket")
			return {...state, websocket: action.websocket}
		case "SUBSCRIBE WEBSOCKET":
			console.log("Subscibed to channel")
			return {...state, websocket: action.websocket}
    case "ABILITY SCORE":
      return {...state, character_info: {...state.character_info, ability_scores: {...state.character_info.ability_scores, [action.ability]: action.score, }, hardcode: {} }};
    case "CHARACTER_CLASSES":
      return {...state, character_info: {...state.character_info, classes: action.classes}};
    // case "CLASSES":
    //   return {...state, classes: action.classes}
    case "EVERYTHING":
      return {...state, classes: action.classes, races: action.races};
    case "CAST CANTRIP SPA OR SPONTANEOUS SPELL":
      let updatedState = castingCantripSPASpontaneous(state, action)
      return {...state, character_info: updatedState};
    case "CAST PREPARED NONCANTRIP SPELL":
      let updatedPreparedSpellState = castingPrepared(state, action);
      return {...state, character: updatedPreparedSpellState};
    case "REMOVE PREPARED SPELL":
      return {...state, character: {...state.character, prepared_spells: action.newPreparedSpells}};
    case "PREPARE SPELLS":
      let preparedCopy = [...state.character.prepared_spells]
      action.spells.forEach(sp => preparedCopy.push(sp))
      return {...state, character: {...state.character, prepared_spells: preparedCopy}}
    case "ALL SPELLS":
      return {...state, spells: action.spells}
    case "SPECIFIC USER":
      let hardcode = hardcoded(state, action)
      return {...state, character_info: {...state.character_info, hardcode: hardcode}}
    case "POINTS CHANGE":
      let amount = action.amount === 'increase' ? state.character_info.hardcode.points + 1 : state.character_info.hardcode.points - 1
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, points: amount}}}
    case "CHANGE PERFORMANCE":
      if (action.name === 'none'){
        return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, performance: null}}}
      }
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, performance: action.name, points: state.character_info.hardcode.points - 1}}}
    case "SUMMON MONSTER":
      let monsters = state.character_info.hardcode.monsters ? [...state.character_info.hardcode.monsters] : []
      let monster = action.monster
      monsters.push(monster)
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, monsters}}}
    case "TRIGGER ACTION":
      let actionDupe = state.character_info.actions
      if(action.action === 'full' && actionDupe.full === false){
        actionDupe = {full: true, standard: true, move: true, swift: true, immediate: false}
      } else if(action.action === 'full' && actionDupe.full === true) {
        actionDupe = {full: false, standard: false, move: false, swift: false, immediate: false}
      } else {
        actionDupe[action.action] = !actionDupe[action.action]
      }
      return {...state, character_info: {...state.character_info, actions: actionDupe}}
    case "NEW TURN":
      let actions = {full: false, standard: false, move: false, swift: false, immediate: false}
      return {...state, character_info: {...state.character_info, actions: actions, hardcode: {...state.character_info.hardcode, power: false, eBloodActive: false, ffs: false, fd: false, charge: false, cleave: false, arcane_strike: false, taal_tele: false, augment: false, slide: false, dodgingPanache: false, parry: false, precise: false, charmedActive: false}}}
    case "POWER ATTACK":
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, power: true}}}
    case "RAGE":
      let status = action.change === "START" ? true : false
      let conditions = [...state.character_info.conditions]
      if (!status){
        conditions.push('Fatigued')
      }
      return {...state, character_info: {...state.character_info, conditions, hardcode: {...state.character_info.hardcode, rage: status}}}
    case "SPARKS":
      let eBlood = state.character_info.hardcode.eBlood || 0
      eBlood < 3 ? eBlood += 1 : eBlood = 3
      return {...state, character_info: {...state.character_info, actions: {...state.character_info.actions, swift: true}, hardcode: {...state.character_info.hardcode, eBlood, eBloodActive: true}}}
    case 'CONDITION':
      let newConditions = [...state.character_info.conditions]
      if (newConditions.includes(action.condition)){
        newConditions = newConditions.filter(c => c !== action.condition)
      } else {
        newConditions.push(action.condition)
      }
      return {...state, character_info: {...state.character_info, conditions: newConditions}}
    case 'FIVE FOOT STEP':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, ffs: true}}}
    case 'FIGHT DEFENSIVELY':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, fd: true}}}
    case 'CHARGE':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, charge: true}}}
    case 'SHIFT':
      const shifterPoints = state.character_info.hardcode.points - action.points
      let combat = action.form === 'combat' ? action.detail : state.character_info.hardcode.combat
      let minor = action.form === 'minor' ? action.detail : state.character_info.hardcode.minor
      let major = action.form === 'major' ? action.detail : state.character_info.hardcode.major
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, points: shifterPoints, combat, minor, major}}}
    case 'CHANGE SIZE':
    let baseSize = "Medium"
    let updatedSize = action.size
    if (state.character.name === "Nettie"){
      baseSize = 'Tiny'
    }
    if (state.character.name === 'Cedrick'){
      baseSize = 'Small'
    }
    if (action.size === state.character_info.size){
      updatedSize = baseSize
    }
      return {...state, character_info: {...state.character_info, size: updatedSize}}
    case 'CLEAVE':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, cleave: true}}}
    case 'SPEED SHIFT':
      let speed = hardcoded(state, action).speed
      if (action.speed !== state.character_info.speed){
        speed = action.speed
      }
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, speed}}}
    case 'FROG COMBAT':
      let frogCombat = state.character_info.hardcode.frogCombat
      if (action.name === frogCombat){
        frogCombat = null
      } else {
        frogCombat = action.name
      }
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, frogCombat}}}
    case "COMMAND POINTS CHANGE":
      let ringAmount = action.amount === 'increase' ? state.character_info.hardcode.ringPoints + 1 : state.character_info.hardcode.ringPoints - 1
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, ringPoints: ringAmount}}}
    case 'TIME TRAVEL':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, age: action.age}}}
    case 'LIMIT CASTING':
      // check to see if limits has been created
      let limits = state.character_info.hardcode.limits || []
      // find a specific spell that is limited
      let chosenLimit = limits.find(l => l.name === action.name)
      // if found
      if (chosenLimit){
        // go through all limits, update that one with ++ to cast
        limits = limits.map(l => {
          if (l.name === action.name){
            return {name: l.name, cast: l.cast+1}
          } else {
            return l
          }
        })
      } else {
        // else, create it
        limits.push({name: action.name, cast: 1})
      }
      // add limits to hardcode
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, limits}}}
    case 'ABILITY SCORE IMPROVEMENT':
      let ability_scores = {...state.character_info.ability_scores}
      ability_scores[action.ability_score]++
      return {...state, character_info: {...state.character_info, ability_scores}}
    case 'REMOVE ALLY':
      let monstersToBeRemoved = [...state.character_info.hardcode.monsters]
      monstersToBeRemoved.splice(action.monster, 1)
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, monsters: monstersToBeRemoved}}}
    case 'I CAN FLY':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, fly: !state.character_info.hardcode.fly}}}
    case 'ARCANE STRIKE':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, arcane_strike: true}}}
    case 'INIT REROLL':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, init_reroll: true}}}
    case 'DOUBLE DAMAGE':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, double_damage: true}}}
    case 'TAALMON TELEPORT':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, taal_tele: true}}}
    case 'AUTUMN EQUINOX':
      let autumn = !state.character_info.hardcode.autumn
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, autumn}}}
    case 'USED ITEM':
      let usedItems = state.character_info.hardcode.usedItems || []
      usedItems.push(action.name)
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, usedItems}}}
    case 'ACTIVE ARMOR':
      let armor = state.character_info.hardcode.armor
      armor = armor === action.name ? null : action.name
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, armor}}}
    case 'AUGMENT SPELL':
      let augment = {spellId: action.spellId, augment: action.augment}
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, augment}}}
    case 'DIMENSIONAL SLIDE':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, slide: true}}}
    case 'SIZE STAFF':
      let sizeStaff = (state.character_info.hardcode.sizeStaff || 0) + action.amount
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, sizeStaff}}}
    case 'ENLARGE':
      let enlarge = !state.character_info.hardcode.enlarge
      var staticSize = 'Medium'
      staticSize = state.character.name === 'Nettie' ? 'Tiny' : staticSize
      staticSize = state.character.name === 'Cedrick' ? 'Small' : staticSize
      staticSize = state.character_info.hardcode.age === 'Young' ? 'Small' : staticSize
      var newSize = 'Large'
      newSize = state.character.name === 'Nettie' ? 'Small' : newSize
      newSize = state.character.name === 'Cedrick' ? 'Medium' : newSize
      newSize = state.character_info.hardcode.age === 'Young' ? 'Medium' : newSize

      newSize = state.character_info.size === staticSize ? newSize : staticSize
      // ^this^ code doesn't account for polymorph size changes
      return {...state, character_info: {...state.character_info, size: newSize, hardcode: {...state.character_info.hardcode, enlarge}}}
    case 'REDUCE':
      let reduce = !state.character_info.hardcode.reduce
      var staticSize = 'Medium'
      staticSize = state.character.name === 'Nettie' ? 'Tiny' : staticSize
      staticSize = state.character.name === 'Cedrick' ? 'Small' : staticSize
      staticSize = state.character_info.hardcode.age === 'Young' ? 'Small' : staticSize
      var newSize = 'Small'
      newSize = state.character.name === 'Nettie' ? 'Diminutive' : newSize
      newSize = state.character.name === 'Cedrick' ? 'Tiny' : newSize
      newSize = state.character_info.hardcode.age === 'Young' ? 'Tiny' : newSize

      newSize = state.character_info.size === staticSize ? newSize : staticSize
      // ^this^ code doesn't account for polymorph size changes
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, reduce}}}
    case 'DODGING PANACHE':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, dodgingPanache: true}}}
    case 'PARRY':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, parry: true}}}
    case 'PRECISE STRIKE':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, precise: true}}}
    case 'CHARMED':
      let charmedLife = state.character_info.hardcode.charmedLife
      let charmedActive = false
      if (charmedLife < 3){
        charmedLife += 1
        charmedActive = true
      }
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, charmedLife, charmedActive}}}
    case 'EXPEDITIOUS RETREAT':
      let expeditious = !state.character_info.hardcode.expeditious
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, expeditious}}}
    case 'SWIM SPEED':
      let swim = !state.character_info.hardcode.swim
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, swim}}}
    case 'TEMPEST':
      let tempest = (state.character_info.hardcode.tempest || 0) + action.amount
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, tempest}}}
    case 'SWIM 20':
      let swim20 = !state.character_info.hardcode.swim20
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, swim20}}}
    case 'LAND 10':
      let land10 = !state.character_info.hardcode.land10
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, land10}}}
    case 'LAND 20':
      let land20 = !state.character_info.hardcode.land20
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, land20}}}
    case 'QUICK':
      let quick = !state.character_info.hardcode.quick
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, quick}}}
    case 'ALTER SELF':
      let alterSelf = !state.character_info.hardcode.alterSelf
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, alterSelf}}}
    case 'AMMO CHANGE':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, ammo: action.ammo}}}
    case 'ACTIVE WEAPON':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, activeWeapon: action.weapon}}}
    case 'WEAPON AMMO':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, weaponAmmo: action.weaponAmmo}}}
    case 'SPEND AMMO':
      let selectedWeapon = state.character_info.hardcode.weaponAmmo.find(wa => wa.weapon === action.weapon)
      let selectedAmmo = state.character_info.hardcode.ammo.find(a => a.name === selectedWeapon.ammo)
      let ammoDup = [...state.character_info.hardcode.ammo]
      ammoDup = ammoDup.map(a => {
        if (a.name === selectedAmmo.name){
          let thisAmmo = {...a}
          if (thisAmmo.amount > 0){
            thisAmmo.amount = thisAmmo.amount-1
          }
          return thisAmmo
        } else {
          return a
        }
      })
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, ammo: ammoDup}}}
    case 'HELMSMAN':
      let helmsman = !state.character_info.hardcode.helmsman
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, helmsman}}}
    case 'CREW':
      let crew = !state.character_info.hardcode.crew
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, crew}}}
    case 'TELESWAP':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, teleswap: true}}}
    case 'MAGICAL HATS':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, magicalHats: true}}}
    case 'REALITY BEND':
      let manipulate = state.character_info.hardcode.manipulate || 0
      if (manipulate <= 2){
        manipulate = manipulate + 1
      }
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, manipulate}}}
    case 'AURA READ':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, auraRead: true}}}
    case 'STEAL TIME':
      let stealTime = !state.character_info.hardcode.stealTime
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, stealTime}}}
    case 'BONUS':
      let bonuses
      if (action.alreadyEquipped){
        bonuses = state.character_info.bonuses.filter(b => b.source !== action.bonus.source)
      } else if (action.remove) {
				bonuses = [...state.character_info.bonuses].filter(b => b.source.featureId !== action.bonus.source.featureId && b.source.sourceId !== action.bonus.source.sourceId && b.source.source !== action.bonus.source.source)
			} else {
        bonuses = [...state.character_info.bonuses, action.bonus]
      }
      return { ...state, character_info: { ...state.character_info, bonuses } }
    case 'EFFECT':
      let effects
      if (action.alreadyEquipped){
        effects = state.character_info.effects.filter(b => b.source !== action.effect.source)
      } else {
        effects = [...state.character_info.effects, action.effect]
      }
      return { ...state, character_info: { ...state.character_info, effects } }
    case 'ACTIVATED FEATURE':
      let features
      if (action.feature.remove){
        features = state.character_info.features.filter(f => f.source !== action.feature.source)
      } else {
        features = [...state.character_info.features, action.feature]
      }
      return { ...state, character_info: { ...state.character_info, features } }
    case 'NEW NOTE':
      var notes
      if (state.character.notes.find(n => n.id === action.note.id)){
        notes = [...state.character.notes].map(n => n.id !== action.note.id ? n : action.note)
      } else {
        notes = [...state.character.notes, action.note]
      }
      return {...state, character: {...state.character, notes}}
    case 'REMOVE NOTE':
      var notes = [...state.character.notes].filter(n => n.id !== action.note.id)
      return {...state, character: {...state.character, notes}}
    case 'DONE PREPARING':
      return {...state, character: {...state.character, is_done_preparing_spells: true}}
    case 'EQUIP CMI':
      let cmis = [...state.character.character_magic_items]
      let filteredCMIs = cmis.map(mi => {
        if (mi.id === action.id){
          let altered = {...mi}
          altered.equipped = !mi.equipped
          return altered
        } else {
          return mi
        }
      })
      return {...state, character: {...state.character, character_magic_items: filteredCMIs}}
    case 'EQUIP WEAPON':
      let cws = [...state.character.character_weapons]
      let mappedCWs = cws.map(w => {
        if (w.id === action.id){
          var altered = {...w}
          altered.equipped = action.equipped
          return altered
        } else if (w.equipped === action.equipped || ( (action.equipped === "Primary" || action.equipped === "Off") && ( (w.equipped === "Two") || (w.equipped === "Double") ) ) || action.equipped === "Two" || action.equipped === "Double"){
          // if the weapon is in the same slot as the new weapon, remove it
          // if the weapon is in two hands, and new weapon is in one hand, remove it
          // if the new weapon is in two hands or a double weapon, remove all other weapons
          let alteredOldEquipped = {...w}
          alteredOldEquipped.equipped = ""
          return alteredOldEquipped
        } else {
          return w
        }
      })
      return {...state, character: {...state.character, character_weapons: mappedCWs}}
    case 'EQUIP ARMOR':
      var selectedCA = state.character.character_armors.find(a => a.id === action.id)
      let cas = [...state.character.character_armors].map(a => {
        if (a.id === action.id){
          var altered = {...a}
          altered.equipped = action.equipped
          return altered
        } else {
          var altered = {...a}
          altered.equipped = false
          return altered
        }
      })
      return {...state, character: {...state.character, character_armors: cas}}
    case 'MUTAGEN':
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, mutagen: action.name}}}
    case 'TOGGLE MUTAGEN':
      let activeMutagen = state.character_info.hardcode.activeMutagen || false
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, activeMutagen: !activeMutagen}}}
		// TO BE DEPRECATED
    case 'PROFICIENCY':
      let proficiencies = {...state.character_info.proficiencies}
			let d = action.detail
      if (d.type === "weapon"){
        if (d.additive){
          if (d.proficiency_group) proficiencies.weapon.groups.push(d.proficiency_group)
          if (d.weapon_id) proficiencies.weapon.individualIds.push(d.weapon_id)
        }
      }
      return {...state, character_info: {...state.character_info, proficiencies}}
		// NEW IMPROVED "PROFICIENCY"
		// CHANGE NAME TO JUST "PROFICIENCY" WHEN OTHER CAN BE REMOVED
		// LOCATED IN /helper_functions/action_creator/features
		case 'NEW PROFICIENCY':
			return {...state, character_info: {...state.character_info, proficiencies: action.proficiencies}}
    case 'TOOLTIP':
      let tooltip = {message: action.message, target: action.target}
      if (state.tooltip.target === action.target){
        tooltip = {}
      }
      return {...state, tooltip}
    case 'MODAL':
      let modal = {detail: action.detail, obj: action.obj}
      if (action.remove){
        modal = {}
      }
      return {...state, modal}
    case "CHANGE AMMO":
      var characterWeapons = [...state.character.character_weapons].map(cw => {
        if (cw.id === action.characterWeapon.id){
          let newCW = {...cw}
          newCW.character_weapon_ammunition_id = action.ammoId
          newCW.magazine = 0
          newCW.improvised_ammunition = action.ammoId === 0 ? true : false
          return newCW
        } else {return cw}
      })
      return {...state, character: {...state.character, character_weapons: characterWeapons}}
    case "UPDATE AMMO":
      var characterWeapons = [...state.character.character_weapons].map(cw => {
        if (cw.id === action.cw.id){
          let newCW = {...cw}
          newCW.magazine = action.magazine
          return newCW
        } else if (cw.id === action.cw.character_weapon_ammunition_id && action.ammunition_amount){
          let newCWAmmo = {...cw}
          newCWAmmo.ammunition_amount = action.ammunition_amount
          return newCWAmmo
        } else {return cw}
      })
      return {...state, character: {...state.character, character_weapons: characterWeapons}}
    case "DISCOVER EQUIPMENT":
      var equipment = [...state.character[action.detail]].map(eq => {
        if (eq.id === action.id){
          var newEq = {...eq}
          newEq.discovered = true
          return newEq
        } else {return eq}
      })
      return {...state, character: {...state.character, [action.detail]: equipment}}
    case "ADD MOVEMENT":
      return {
        ...state,
        character_info: {
          ...state.character_info,
          movement: [
            ...state.character_info.movement,
            action.movement
          ]
        }
      }
		case "ACTIVE FEATURE":
			var activeFeatures = [...state.character_info.activeFeatures]
			var oldActiveFeaturesLength = activeFeatures.length
			activeFeatures = activeFeatures.filter(af => af.featureId !== action.featureSource.featureId && af.sourceId !== action.featureSource.sourceId && (af.source !== action.featureSource.source || af.senderId !== action.featureSource.senderId))

			if (activeFeatures.length === oldActiveFeaturesLength && (action.options?.additive ?? true)){
				activeFeatures.push(action.featureSource)
			}
			return {...state, character_info: {...state.character_info, activeFeatures}}
		case "ADD TEMP HP":
			var temporaryHitPoints = [...state.character_info.temporaryHitPoints]
			temporaryHitPoints.push({...action.tempHP, damage: 0})
			return {...state, character_info: {...state.character_info, temporaryHitPoints}}
		case "REMOVE TEMP HP":
			var temporaryHitPoints = [...state.character_info.temporaryHitPoints]
			temporaryHitPoints = temporaryHitPoints.filter(fhp => fhp.source.sourceId !== action.source.sourceId && fhp.source.featureId !== action.source.featureId && fhp.source.source !== action.source.source)
			return {...state, character_info: {...state.character_info, temporaryHitPoints}}
		case "DAMAGE TEMP HP":
			var temporaryHitPoints = [...state.character_info.temporaryHitPoints]
			temporaryHitPoints = temporaryHitPoints.map(fhp => {
				if (fhp.source.sourceId === action.source.sourceId && fhp.source.featureId === action.source.featureId && fhp.source.source === action.source.source) {
					fhp.damage += action.damage
					return fhp
				} else {return fhp}
			})
			return {...state, character_info: {...state.character_info, temporaryHitPoints}}
		case "ADJUST CHARACTER":
			return {...state, character: {...state.character, [action.adjust]: action.value}}
		case "ADJUST CHARACTER REPLACE VALUE IN ARRAY":
			var adjustedArray = [...state.character[action.adjust]]
			if (!adjustedArray.length){
				adjustedArray.push(action.value)
			} else {
				adjustedArray = adjustedArray.map(aa => {
					return aa.id === action.value.id ? action.value : aa
				})
			}
			return {...state, character: {...state.character, [action.adjust]: adjustedArray}}
		case "ADJUST STATUS CONDITION":
			return {...state, character_info: {...state.character_info, statusConditions: action.conditions}}
		case 'FORBIDDEN':
			let forbidden
			if (action.remove) {
				forbidden = [...state.character_info.forbidden].filter(f => f.source.featureId !== action.forbidden.source.featureId && f.source.sourceId !== action.forbidden.source.sourceId && f.source.source !== action.forbidden.source.source)
			} else {
				forbidden = [...state.character_info.forbidden, action.forbidden]
			}
			return { ...state, character_info: { ...state.character_info, forbidden } }
		case "ADJUST CHARACTER INFO":
			return {...state, character_info: {...state.character_info, [action.adjust]: action.value}}
		case "UPDATE NOTIFICATIONS":
			return {...state, notifications: action.notifications}
		case "UPDATE STORED NOTIFICATIONS":
			return {...state, storedNotifications: action.notifications}
    default:
      return state
  }
}

const castingCantripSPASpontaneous = (state, action) => {
  // duplicate state
  let modifiedState = {...state.character_info}
  // find out which class you are modifying
  let klassId = action.spell.klass_id || action.spell.klass.id
  const klass = modifiedState.classes.find(cl => cl.id === klassId)
  // find out which level spell you cast
  const lvl = action.spell.spell_level
  // if redux doesn't have that spell level, create it. if not, update the value by one
  if (lvl === 0 && action.infinite_zero_level){
    // if you have infinite cantrips, do nothing
  } else {
    klass.castSpells[lvl] ? klass.castSpells[lvl] = klass.castSpells[lvl] + 1 : klass.castSpells[lvl] = 1
  }
  // merge changes into duplicate of state
  modifiedState.classes.map(cl => cl.id === klass.id ? klass : cl)
  return modifiedState
}

const castingPrepared = (state, action) => {
  // duplicate state
  let modifiedState = {...state.character}
  // loop though all the character's prepared spells
  let modifiedPrepared = modifiedState.prepared_spells.map(cs => {
    // find the cast spell within the character's prepared spells
    if (cs.id === action.spell.id){
      // return the updated cast spell
      return action.spell
    } else {
      // otherwise, return the original spell
      return cs
    }
  })
  modifiedState.prepared_spells = modifiedPrepared
  return modifiedState
}

const hardcoded = (state, action) => {
  switch(action.name){
    case 'Nettie':
      return {points: 19, speed: 20}
    case 'Merg':
      return {points: 18, speed: 30}
    case 'Cedrick':
      return {points: 7, speed: 30, ringPoints: 2, ammo:[{name: 'bolt', amount: 6}], weaponAmmo: [{weapon: '+1 Underwater Light Crossbow', ammo: 'bolt'}]}
    case 'Maddox':
      return {points: 6, speed: 30, age: 'Venerable'}
    case 'Persephone':
      return {speed: 30, ammo:[{name: 'bolt', amount: 10}], weaponAmmo: [{weapon: 'Light Crossbow', ammo: 'bolt'}]}
    case 'Robby':
      return {speed: 30, points: 4, charmedLife: 0, ammo:[{name: 'arrow', amount: 11}, {name: 'cartridge', amount: 0}, {name: '+1 cunning arrow', amount: 1}], weaponAmmo: [{weapon: 'Long Bow', ammo: 'arrow'}, {weapon: 'Revolver', ammo: 'cartridge'}]}
    case 'Festus':
      return {speed: 35}
    case 'Grackle':
      return {speed: 30, points: 0, ammo: [{name: 'arrow', amount: 20}], weaponAmmo:[{weapon: 'Long Bow', ammo: 'arrow'}]}
    default:
      return {}
  }
}

export default reducer;
