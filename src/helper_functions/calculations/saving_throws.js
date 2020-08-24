import _ from 'lodash'
import { pluser } from '../../fuf'
import store from '../../store'
import { abilityScoreMod } from './ability_scores'

export const renderSave = (save, ability) => {
	// return an array
	// first value is base
	// second value is temporary bonuses/penalties
	let savesArray = calculateSave(save, ability)
	return pluser(savesArray[0] + savesArray[1])
}

export const calculateSave = (save, ability) => {
	// NEW DATA
	let array = []
	let permanent = 0
	let temporary = 0


	// STORED DATA
	let characterInfo = store.getState().character_info
	let klasses = store.getState().character.uniq_klasses

	// CALCULATED DATA
	let abilityMod = abilityScoreMod(ability)
	let classSaves = characterInfo.classes.map((cl) => {
		let classInfo = klasses.find(kl => kl.id === cl.id)
		return renderBaseClassSave(cl.level, classInfo[save])
	})
	let classSavesTotal = _.sum(classSaves)
	let bonusObjs = characterInfo.bonuses.filter(b => {
		return (b.statistic === "Save" || b.statistic === "Fortitude" || b.statistic === "Reflex" || b.statistic === "Will")
	})


	permanent += abilityMod
	permanent += classSavesTotal

	bonusObjs.forEach(bo => {
		if (bo.statistic === "Save" || bo.statistic === _.capitalize(save)) {
			if (bo.duration === "temporary"){
				temporary += bo.bonus
			} else if (bo.duration === "permanent"){
				permanent += bo.bonus
			}
		}
	})

	array.push(permanent)
	array.push(temporary)
	return array
}

export const renderBaseClassSave = (num, save) => {
	let base = num * save
	if (save === 0.5){base +=2}
	return _.floor(base)
}