import { mod, pluser } from '../../fuf'
import { abilityScoreMod } from './ability_scores'
import { armorCheckPenaltyOnOtherAbilities } from './proficiencies'
import { sizeMod, specialSizeMod } from './size'

export const ab = (characterObj, characterInfoObj, type, options = {}) => {
	// NEW DATA
	let array = []
	let permanent = 0
	let temporary = 0
  let attackBonus = 0
  let bab = baseAttackBonus(characterInfoObj.classes, characterObj.uniq_klasses)
	let abilityMod
	let permAbilityMod

	let str = abilityScoreMod("strength")
	let dex = abilityScoreMod("dexterity")

	let permSTR = abilityScoreMod("strength", true)
	let permDEX = abilityScoreMod("dexterity", true)



  if (type === "melee"){
    abilityMod = str
		permAbilityMod = permSTR
  } else if (type === "range"){
    abilityMod = dex
		permAbilityMod = permDEX
  }

	if (options.finesse){
		abilityMod = dex
		permAbilityMod = permDEX
	}

	let bonuses = additionalBonuses(characterInfoObj.bonuses, type)
		.map(b => b.bonus)
		.reduce((agg, el) => {
			return agg + el
		}, 0)
	// if you aren't proficient with your equipped armor
	// armor check penalty applies to attack rolls
	let armorCheckPenalty = armorCheckPenaltyOnOtherAbilities()

	permanent += bab
	permanent += armorCheckPenalty
	permanent += sizeMod(characterObj.race.size)

	if (permAbilityMod !== abilityMod) {
		temporary += abilityMod - permAbilityMod
		permanent += permAbilityMod
	} else {
		permanent += abilityMod
	}

	temporary += bonuses

	array.push(permanent)
	array.push(temporary)
	return array
}

export const renderAB = (characterObj, characterInfoObj, type, options) => {
	let abArray = ab(characterObj, characterInfoObj, type, options)
	return (abArray[0] + abArray[1])
}

export const pluserAB = (characterObj, characterInfoObj, type) => {
	return pluser(renderAB(characterObj, characterInfoObj, type))
}

 export const baseAttackBonus = (klassLevels, allKlasses) => {
	 let bab = 0
	 klassLevels.forEach(cl => {
     let klass = allKlasses.find(uk => uk.id === cl.id)
     let preBAB = 1
     preBAB = parseInt(klass.hit_die) === 8 ? 0.75 : preBAB
     preBAB = parseInt(klass.hit_die) === 6 ? 0.5 : preBAB
     bab += preBAB * cl.level
   })
	 return Math.floor(bab)
 }

export const additionalBonuses = (bonuses, type) => {
	let applicableBonuses = []

	bonuses.forEach(b => {
		if (b.statistic === "Attack" && (b.specific_statistic === null || b.specific_statistic === type)){
			applicableBonuses.push(b)
		}
	})

	return applicableBonuses
}

export const bonusPenaltyAB = (characterObj, characterInfoObj, type) => {
	let temp = ab(characterObj, characterInfoObj, type)[1]
	let color = "black"
	if (temp > 0){color = "green"}
	if (temp < 0){color = "maroon"}
	return color
}

export const combatManuevers = (characterObj, characterInfoObj) => {
	let obj = {}

	let bab = baseAttackBonus(characterInfoObj.classes, characterObj.uniq_klasses)
	let str = abilityScoreMod("strength")
	let dex = abilityScoreMod("dexterity")
	let size = specialSizeMod(characterObj.race.size)

	obj.bonus = str + bab + size
	obj.defense = 10 + str + dex + bab + size

	return obj
}
