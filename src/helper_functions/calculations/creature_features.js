
export const defaultCreatureInfo = () => {
	return {
		effects: []
	}
}


export const calculateCreatureInfo = (creature) => {
	let creatureInfo = defaultCreatureInfo()

	creature.feats.forEach(feat =>{
		feat.features.forEach(f => renderFeature(f, {source: "feats", sourceId: feat.id, sourceName: feat.name}, creatureInfo))
	})

	return {...creature, creatureInfo}
}

const renderFeature = (feature, sourceObj, creatureInfo) => {
	feature.weapon_applications.forEach(wa => {
		creatureInfo.effects.push({...wa, source: sourceObj})
	})
}
