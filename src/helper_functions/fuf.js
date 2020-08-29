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

export const featureNameFromSource = source => {
	let ability = locateAbility(source)
	let feature = locateFeatureThroughAbility(ability, source.featureId)
	return feature.name || ability.name
}

export const locateFeatureAndAbilityFromSource = source => {
	let ability = locateAbility(source)
	let feature = locateFeatureThroughAbility(ability, source.featureId)
	return {feature, ability}
}

export const actionClass = a => {
  switch(a){
    case 'Standard Action':
      return 'standard'
    case 'Swift Action':
      return 'swift'
    case 'Move Action':
      return 'move'
    case 'Full-Round Action':
      return 'full'
    case 'Immediate Action':
      return 'immediate'
    case 'Free Action':
      return 'free'
    default:
      return a
  }
}
