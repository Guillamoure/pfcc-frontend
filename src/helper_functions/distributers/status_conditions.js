import store from '../../store'
import * as featureDistributions from './features'
import {
  bonusAction,
	forbiddenAction
} from '../action_creator/features'
import { replaceCharacterInfoAction } from '../action_creator/character'

export const statusConditionDistribution = statusCondition => {
	let character_info = featureDistributions.defaultCharacterInfo()
	let source = {...statusCondition.source, condition: statusCondition.condition}
	switch (statusCondition.condition){
		case "Fatigued":
			character_info.bonuses.push(featureDistributions.statBonusFeature({statistic: "strength", bonus: -2, bonus_type: "untyped", duration: "temporary", specific_statistic: null, bonus_multiplier: null, bonus_multiplier_based_on_feature_level: null}, source))
			character_info.bonuses.push(featureDistributions.statBonusFeature({statistic: "dexterity", bonus: -2, bonus_type: "untyped", duration: "temporary", specific_statistic: null, bonus_multiplier: null, bonus_multiplier_based_on_feature_level: null}, source))
			character_info.forbidden.push(featureDistributions.forbiddenFeature("Run", source))
			character_info.forbidden.push(featureDistributions.forbiddenFeature("Charge", source))
			break
		default:
			break
	}
	character_info.bonuses.forEach(b => {
		bonusAction(b)
	})

	character_info.forbidden.forEach(f => {
		forbiddenAction(f)
	})
}

export const removeStatusConditionDistribution = statusCondition => {
	let character_info = {...store.getState().character_info}

	let bonuses = character_info.bonuses.filter(b => {
		return b.source.condition !== statusCondition.condition
	})
	replaceCharacterInfoAction("bonuses", bonuses)

	let forbidden = character_info.forbidden.filter(f => {
		return f.source.condition !== statusCondition.condition
	})
	replaceCharacterInfoAction("forbidden", forbidden)
}
