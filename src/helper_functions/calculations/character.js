import _ from 'lodash'

export const dispatchClassLevels = (character) => {
  let cKArray = []
  let completedClasses = []
  character.character_klasses.forEach(cK => {
    const id = cK.klass_id
    if (!completedClasses.includes(id)){
      let characterKlass = character.character_klasses.filter(ck => ck.klass_id === id)
      const level = characterKlass.length
      let klass = character.uniq_klasses.find(k => k.id === id)

      completedClasses.push(id)
      const classInfo = {id, level}

      // changing fetch data, this part is not applicable with starting fetch

      let spellsFeature = klass.klass_features.find(f => f.name === 'Spells' || f.name === 'Alchemy')
      let spellcasting = spellsFeature ? spellsFeature.spellcasting : null

      // look to see if there are any cast spells for the given class
      const castSpellsForThisClass = character.cast_spells.filter(cs => cs.klass_id === id)
      // if (castSpellsForThisClass[0]){
      const castSpells = {}
      const transformedCastSpellsToLevelCast = castSpellsForThisClass.map(cs => cs.spell_level)
      transformedCastSpellsToLevelCast.forEach(lvl => {
        castSpells[lvl] ? castSpells[lvl] = castSpells[lvl] + 1 : castSpells[lvl] = 1
      })
      classInfo.castSpells = castSpells
      classInfo.spellcasting = spellcasting
      // hardcoded start
      let name = character.name
        if (name === "Nettie" || name === "Persephone" || name === "Maddox"){
          classInfo.spellcastingAbility = 'intelligence'
        } else if (name === "Sylvester"){
          classInfo.spellcastingAbility = 'charisma'
        }
      // hardcoded end
      // }

      // relocate to a new function when data is applcable

      cKArray.push(classInfo)
    }
  })
  // debugger
  return cKArray
  // dispatch({type: 'CHARACTER_CLASSES', classes: cKArray})
}

export const renderAbilityScoreCalc = (ability, character) => {
  const downcaseAbility = _.lowerCase(ability)
  let score = character[downcaseAbility]
  character.race.race_ability_score_modifiers.forEach(mod => {
    if (ability === mod.ability_score){
      score += mod.bonus
    }
  })
  if (character.any_bonus === ability){
    score +=2
  }
  return { ability: downcaseAbility, score }
}

export const calculateWeight = (character, character_info) => {
  let weight = 0;

  character.character_weapons.forEach(cw => {
    weight += cw.weapon.weight
  })
  character.character_armors.forEach(ca => {
    weight += ca.armor.weight
  })


  return weight
}

export const equippedWeapons = characterWeapons => {
  return characterWeapons.filter(cw => cw.equipped !== "")
}

export const calculateLoad = (weight, strength) => {
  let carryingCapacityByStrength = carryingCapacity(strength)
  if (weight <= carryingCapacityByStrength[0]){return "Light"}
  if (weight <= carryingCapacityByStrength[1]){return "Medium"}
  if (weight <= carryingCapacityByStrength[2]){return "Heavy"}
  return "Overload"
}

export const carryingCapacity = strength => {
  switch(strength){
    case 1: return [3, 6, 10]
    case 2: return [6, 13, 20]
    case 3: return [10, 20, 30]
    case 4: return [13, 26, 40]
    case 5: return [16, 33, 50]
    case 6: return [20, 40, 60]
    case 7: return [23, 46, 70]
    case 8: return [26, 53, 80]
    case 9: return [30, 60, 90]
    case 10: return [33, 66, 100]
    case 11: return [38, 76, 115]
    case 12: return [43, 86, 130]
    case 13: return [50, 100, 150]
    case 14: return [58, 116, 175]
    case 15: return [66, 133, 200]
    case 16: return [76, 153, 230]
    case 17: return [86, 173, 260]
    case 18: return [100, 200, 300]
    case 19: return [116, 233, 350]
    case 20: return [133, 266, 400]
    case 21: return [153, 306, 460]
    case 22: return [173, 346, 520]
    case 23: return [200, 400, 600]
    case 24: return [233, 466, 700]
    case 25: return [266, 533, 800]
    case 26: return [306, 613, 920]
    case 27: return [346, 693, 1040]
    case 28: return [400, 800, 1200]
    case 29: return [466, 933, 1400]
    case 30: return [532, 1064, 1600]
    default: return [0, 0, 0]
  }
}

export const reducedSpeed = (speed) => {
	switch(speed){
		case 15: return 10
		case 20: return 15
		case 25: return 20
		case 30: return 20
		case 35: return 25
		case 40: return 30
		case 45: return 30
		case 50: return 35
		case 55: return 40
		case 60: return 40
		case 65: return 45
		case 70: return 50
		case 75: return 50
		case 80: return 55
		case 85: return 60
		case 90: return 60
		case 95: return 65
		case 100: return 70
		case 105: return 70
		case 110: return 75
		case 115: return 80
		case 120: return 80

		default: return speed
	}
}
