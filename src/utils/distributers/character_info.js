import store from '../../store'
import { replaceCharacterInfoAction } from '../action_creator/character'
import _ from 'lodash'

export const replaceCharacterInfo = (where, data) => {
	let adjust
	let value

	let ci = store.getState().character_info

	if (where.sub_feature.includes("proficiencies")){
		adjust = "proficiencies"
		value = {...ci.proficiencies}
		let key
		let subKey
		if (where.specifics === "weapon_id"){
			key = "weapon"
			subKey="individualIds"
		}
		value = mutateCharacterInfoArray(value, where, data, key, subKey)
	}

	replaceCharacterInfoAction(adjust, value)
}

export const mutateCharacterInfoArray = (array, where, data, key, subKey) => {
	if (where.isNew) {
		array[key][subKey].push({weapon_id: parseInt(data.choice), additive: true, source: {
			characterChoiceId: data.id,
			featureId: data.feature_id,
			source: "applicable_klass_features",
			sourceId: where.sourceId
		}})
	} else {
		array[key][subKey] = array[key][subKey].map(ii => {
			return ii.source.characterChoiceId === data.id ? {...ii, weapon_id: parseInt(data.choice)} : ii
		})
	}
	return array
}
