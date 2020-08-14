import store from '../../store'
import { mod } from '../../fuf'


export const calculateFeaturePercentage = feature => {
	// CALCULATED DATA
	let maxUsage = calculateMaxUsage(feature.usage, feature.klassId)
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

	if (used.length === 1){return used.current_usage}
}

export const remainingUsage = feature => {
	// CALCULATED DATA
	let maxUsage = calculateMaxUsage(feature.usage, feature.klassId)
	let timesUsed = calculateCurrentUsage(feature.character_klass_feature_usages)

	return maxUsage - timesUsed
}
