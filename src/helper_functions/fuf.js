import store from '../store'
import _ from 'lodash'

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

export const renderTH = (num) => {
	switch (parseInt(num)){
		case 1:
			return "1st"
		case 2:
			return "2nd"
		case 3:
			return "3rd"
		default:
			return `${num}th`
	}
}

export const classLevel = (klassId) => {
	let classes = store.getState().character_info.classes
	let klass = classes.find(cl => cl.id === klassId)
	return klass?.level ?? null
}

export const renderDamage = damage => {
	return `${damage.num_of_dice}d${damage.damage_dice}`
}

export const abbreviateDamageType = damageType => {
	if (!damageType){return null}
	if (damageType === "positive" || damageType === "negative"){
		return _.capitalize(damageType.substring(0,3))
	} else {
		return _.capitalize(damageType[0])
	}
}
