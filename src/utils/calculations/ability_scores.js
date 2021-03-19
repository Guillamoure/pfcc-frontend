import store from '../../store'
import { mod, pluser } from '../../fuf'


export const abilityScore = (ability, permanent = false) => {
	let array = abilityScoreArray(ability)
	if (permanent){
		return array[0]
	} else {
		return array[0] + array[1]
	}
}

export const abilityScoreMod = (ability, permanent = false) => {
	return mod(abilityScore(ability, permanent))
}

export const abilityScoreModString = (ability, permanent =  false) => {
	return pluser(abilityScoreMod(ability, permanent))
}

export const abilityScoreArray = ability => {
	// NEW DATA
	let array = []
	let permanentScore = 0
	let temporary = 0
	// STORED DATA
	let ci = store.getState().character_info
	let ability_scores = ci.ability_scores
	permanentScore = ability_scores[ability]
	// CALCULATED DATA
	if (store.getState().character.any_bonus === ability){
		permanentScore += 2
	}

	ci.bonuses.forEach(b => {
		if (b.statistic === ability){
			if (b.duration === "temporary"){
				temporary += b.bonus
			}
		}
	})

	// 0 index has permanent score
	// 1 index has bonuses/penalties

	array.push(permanentScore)
	array.push(temporary)
	return array
}
