import { mod, pluser } from '../../fuf'
import { abilityScoreMod } from './ability_scores'

export const ab = (characterObj, characterInfoObj, type) => {
  let attackBonus = 0
  let bab = baseAttackBonus(characterInfoObj.classes, characterObj.uniq_klasses)
	let abilityMod

	let str = abilityScoreMod("strength")
	let dex = abilityScoreMod("dexterity")

  if (type === "melee"){
    abilityMod = str
  } else if (type === "range"){
    abilityMod = dex
  }

	let bonuses = additionalBonuses(characterInfoObj.bonuses, type)
		.map(b => b.bonus)
		.reduce((agg, el) => {
			return agg + el
		}, 0)

	return bab + abilityMod + bonuses
}

export const pluserAB = (characterObj, characterInfoObj, type) => {
	return pluser(ab(characterObj, characterInfoObj, type))
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
