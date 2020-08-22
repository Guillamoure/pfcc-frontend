import store from '../../store'
import { mod, pluser } from '../../fuf'


export const abilityScore = ability => {
	let array = abilityScoreArray(ability)
	return array[0] + array[1]
}

export const abilityScoreMod = ability => {
	return mod(abilityScore(ability))
}

export const abilityScoreModString = ability => {
	return pluser(abilityScoreMod(ability))
}

export const abilityScoreArray = ability => {
	// NEW DATA
	let array = []
	let permanentScore = 0
	let temporary = 0
	// STORED DATA
	let ability_scores = store.getState().character_info.ability_scores
	permanentScore = ability_scores[ability]
	// CALCULATED DATA

	// 0 index has permanent score
	// 1 index has bonuses/penalties

	array.push(permanentScore)
	array.push(temporary)
	return array
}
