import { mod } from '../../fuf'

export const ab = (characterObj, characterInfoObj, type) => {
  let attackBonus = 0
  let bab = baseAttackBonus(characterInfoObj.classes, characterObj.uniq_klasses)
	let abilityScoreMod

	let str = mod(characterInfoObj.ability_scores.strength)
	let dex = mod(characterInfoObj.ability_scores.dexterity)

  if (type === "melee"){
    abilityScoreMod = str
  } else if (type === "range"){
    abilityScoreMod = dex
  }

	let bonuses = additionalBonuses(characterInfoObj.bonuses, type)
		.map(b => b.bonus)
		.reduce((agg, el) => {
			return agg + el
		}, 0)

	return bab + abilityScoreMod + bonuses
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
	 return bab
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
