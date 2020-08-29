import store from '../store'

export const locateAbility = (source) => {
	const { character } = store.getState()
	return character[source.source].find(ability => ability.id === source.sourceId)
}

export const locateFeatureThroughAbility = (ability, featureId) => {
	return ability.features.find(f => f.id === featureId)
}

export const locateFeatureFromSource = source => {
	return locateFeatureThroughAbility(locateAbility(source), source.featureId)
}
