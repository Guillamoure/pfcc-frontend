const initialState = {
  currentUser: "",
  admin: false,
  character: {},
  character_info: {
    ability_scores: {},
    classes: [],
    hardcode: {},
    size: 'Medium',
    actions: {
      full: false,
      standard: false,
      move: false,
      swift: false,
      immediate: false
    },
    conditions: []
  },
  classes: [],
  races: [],
  spells: []
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
      return {...state, character: action.character, character_info: {...state.character_info, classes: clearedCopy, size: size}};
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
      let monster = action.monster
      if (monster === state.character_info.hardcode.monster){
        monster = null
      }
      return {...state, character_info: {...state.character_info, hardcode: {...state.character_info.hardcode, monster: monster}}}
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
      return {...state, character_info: {...state.character_info, actions: actions, hardcode: {...state.character_info.hardcode, power: false, eBloodActive: false, ffs: false, fd: false, charge: false, cleave: false}}}
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
    default:
      return state
  }
}

const castingCantripSPASpontaneous = (state, action) => {
  // duplicate state
  let modifiedState = {...state.character_info}
  // find out which class you are modifying
  const klass = modifiedState.classes.find(cl => ((cl.id === action.spell.klass_id)|| (cl.id === action.spell.klass.id)))
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
      return {points: 7, speed: 30, ringPoints: 2}
    case 'Maddox':
      return {speed: 30, age: 'Venerable'}
    default:
      return {}
  }
}

export default reducer;
