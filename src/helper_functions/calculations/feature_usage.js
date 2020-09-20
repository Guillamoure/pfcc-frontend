import store from '../../store'
import { mod } from '../../fuf'
import { featureDistribution as removeFeature } from '../distributers/features'
import { patchFetch } from '../fetches'
import { replaceCharacterArrayAction } from '../action_creator/character'
import { locateFeatureFromSource } from '../fuf'


export const calculateFeaturePercentage = feature => {
	if (!feature.usage){return null}
	// CALCULATED DATA
	let maxUsage = calculateMaxUsage(feature.baseFeatureAndAbility?.feature.usage ?? feature.usage, feature.klassId)
	let timesUsed = calculateCurrentUsage(feature.character_klass_feature_usages)

	return `${maxUsage - timesUsed}/${maxUsage}`
}

export const calculateMaxUsage = (usage, klassId) => {
	// NEW DATA
	let points = 0

	// STORED DATA
	let reduxState = store.getState()
	let abilityScores = reduxState.character_info.ability_scores
	let classLvl = reduxState.character_info.classes.find(cl => cl.id === klassId).level

	// if it has a static limit, return that
	if (usage.limit){return usage.limit}

	// otherwise, calculate the limit
	points += usage.base_limit
	points += mod(abilityScores[usage.base_limit_modifier])
	if (classLvl > 1){points += (usage.limit_increase_per_level * (classLvl - 1))}

	return points
}

export const calculateCurrentUsage = used => {
	if (used.length === 0){return 0}

	if (used.length === 1){return used[0].current_usage}
	if (used.length > 1) {
		debugger
	// 	return used[0].current_usage
	}
}

export const remainingUsage = feature => {
	if (!feature.usage){return 1000}
	// CALCULATED DATA
	let maxUsage = calculateMaxUsage(feature.baseFeatureAndAbility?.feature.usage ?? feature.usage, feature.klassId)
	let timesUsed = calculateCurrentUsage(feature.character_klass_feature_usages)

	return maxUsage - timesUsed
}

export const incrementFeatureUsage = async feature => {
	if (remainingUsage(feature) > 0){
		let usage = feature.character_klass_feature_usages.length === 1 && feature.character_klass_feature_usages[0]
		await alterCurrentUsage(usage, 1)
	} else {
		let options = feature.usage?.all_feature_usage_options || []
		if (options.length){

			const { character_info } = store.getState()

			options.forEach(opt => {
				if (character_info.activeFeatures.find(af => af.featureId === opt.optionSource.featureId & af.sourceId === opt.optionSource.sourceId && af.source === opt.optionSource.source)) {
					removeFeature({...locateFeatureFromSource(opt.optionSource), sourceId: opt.optionSource.sourceId, klassId: opt.optionSource.feature, source: "applicable_klass_features"})
				}
			})
		} else {
			removeFeature(feature)
		}
	}
}

export const decrementFeatureUsage = async feature => {
	let usage = feature.character_klass_feature_usages.length === 1 && feature.character_klass_feature_usages[0]
	if (!!usage.current_usage){
		await alterCurrentUsage(usage, -1)
	}
}

export const alterCurrentUsage = async (usage, amount) => {
	await patchFetch("character_klass_feature_usages", {...usage, current_usage: usage.current_usage + amount})
		.then(data => {
			replaceCharacterArrayAction("character_klass_feature_usages", data)
		})
}

export const isThisFeatureActive = feature => {
	let active = false
	const { character_info } = store.getState()
	character_info.activeFeatures.forEach(af => {
		if (af.featureId === feature.id && af.sourceId === feature.sourceId && af.source === feature.source){
			active = true
		}
		let options = feature.usage?.all_feature_usage_options || []

		options.forEach(opt => {
			if (opt.optionSource.featureId === feature.id && opt.optionSource.sourceId === feature.sourceId && opt.optionSource.source === feature.source) {
				active = true
			}
		})
	})

	return active
}
