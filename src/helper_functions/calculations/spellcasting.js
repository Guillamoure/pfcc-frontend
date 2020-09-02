import store from '../../store'

export const allSpellcastingKlassFeatures = () => {
	const { character } = store.getState()

	return character.applicable_klass_features.filter(akf => {
		let spellcasting = false
		akf.features.forEach(f => {
			if (f.spellcasting){spellcasting = true}
		})
		return spellcasting
	})
}

export const allRemainingSpellsPerDay = () => {
	let spellcastingKlassFeatures = allSpellcastingKlassFeatures()
	return spellcastingKlassFeatures.map(remainingSpellsPerDay)
}

export const remainingSpellsPerDay = (klassFeature) => {
	let array = []
	const { character, character_info } = store.getState()
	let lvl = character_info.classes.find(cl => cl.id === klassFeature.klass_id).level

	klassFeature.features.forEach(f => {
		if (f.spellcasting){
			let applicableSPD = f.spellcasting.spells_per_day_per_level.filter(spd => spd.klass_level === lvl)
			applicableSPD = applicableSPD.map(spd => {
				let klassName = character.uniq_klasses.find(uk => uk.id === klassFeature.klass_id).name
				return {...spd, klassId: klassFeature.klass_id, klassName}
			})
			array = applicableSPD
		}
	})
	// here, you'd remove spells per level, as well

	return array
}
