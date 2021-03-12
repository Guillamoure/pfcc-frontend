import store from '../../store'
import { mod } from '../../fuf'
import { featureDistribution as removeFeature } from '../distributers/features'
import { patchFetch } from '../fetches'
import { replaceCharacterArrayAction } from '../action_creator/character'
import { locateFeatureFromSource } from '../fuf'


export const calculateFeaturePercentage = feature => {
	if (!feature.usage){return null}
	// CALCULATED DATA
	let maxUsage = calculateMaxUsage(feature.baseFeatureAndAbility?.feature.usage ?? feature.usage, feature.klassId, {klassArchetypeId: feature.klassArchetypeId})
	let timesUsed = calculateCurrentUsage(feature.usageSources)

	return `${maxUsage - timesUsed}/${maxUsage}`
}

export const calculateMaxUsage = (usage, klassId, options) => {
	// NEW DATA
	let points = 0

	// STORED DATA
	let reduxState = store.getState()
	let abilityScores = reduxState.character_info.ability_scores
	let classLvl = reduxState.character_info.classes.find(cl => {
		if (klassId){
			return cl.id === klassId
		} else if (options.klassArchetypeId){
			let arch = reduxState.character.archetypes.find(ar => ar.id === options.klassArchetypeId)
			return cl.id === arch.klass_id

		}
	}).level

	// if it has a static limit, return that
	if (usage.limit){return usage.limit}

	// otherwise, calculate the limit
	points += usage.base_limit
	if (usage.base_limit_modifier){points += mod(abilityScores[usage.base_limit_modifier])}
	if (classLvl > 1){points += (usage.limit_increase_per_level * (classLvl - 1))}

	// if a feature has a float for its limit_increase_per_level, and the base_limit is 0, its probably not nothing at the 1st level, but the same as the limit_increase_per_level
	if (usage.base_limit === 0 && usage.limit_increase_per_level < 1){points += usage.limit_increase_per_level}

	// if it has a minimum, but that value is not met, replace points with the minimum
	if (usage.minimum_limit > points){points = usage.minimum_limit}

	// round down points
	points = Math.floor(points)

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
	let maxUsage = calculateMaxUsage(feature.baseFeatureAndAbility?.feature.usage ?? feature.usage, feature.klassId, {klassArchetypeId: feature.klassArchetypeId})
	let timesUsed = calculateCurrentUsage(feature.usageSources)

	return maxUsage - timesUsed
}

export const incrementFeatureUsage = async feature => {
	if (remainingUsage(feature) > 0){
		let usage = feature.usageSources.length === 1 && feature.usageSources[0]
		await alterCurrentUsage(usage, 1, usageArrayBasedOnSource(feature.source, {klassArchetypeId: feature.klassArchetypeId}))
	} else {
		let options = feature.usage?.all_feature_usage_options || []
		if (options.length){

			const { character_info } = store.getState()

			// this is used when a feature expends every round
			// once that feature runs out of points, it goes to here
			// the below code only works for klass features, not klass_specializations or other future features
			debugger
			// placing a debugger here for future use, to make universal in the future

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
	let usage = feature.usageSources.length === 1 && feature.usageSources[0]
	if (!!usage.current_usage){
		await alterCurrentUsage(usage, -1, usageArrayBasedOnSource(feature.source, {klassArchetypeId: feature.klassArchetypeId}))
	}
}

export const alterCurrentUsage = async (usage, amount, url) => {
	await patchFetch(url, {...usage, current_usage: usage.current_usage + amount})
		.then(data => {
			replaceCharacterArrayAction(url, data)
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

const usageArrayBasedOnSource = (source, options) => {
	switch(source){
		case "applicable_klass_features":
			if (options.klassArchetypeId){
				return "character_klass_archetype_feature_usages"
			}
			return "character_klass_feature_usages"
		case "klass_specializations":
			return "character_klass_specialization_feature_usages"
		default:
			return null
	}
}
