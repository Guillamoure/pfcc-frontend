import store from '../../store'
import { abilityScoreMod } from './ability_scores'

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
	let level = character_info.classes.find(cl => cl.id === klassFeature.klass_id).level
	let abilityScoreModifier
	let klassName = character.uniq_klasses.find(uk => uk.id === klassFeature.klass_id).name

	klassFeature.features.forEach(f => {
		if (f.spellcasting){
			abilityScoreModifier = abilityScoreMod(f.spellcasting.ability_score)
			let applicableSPD = f.spellcasting.spells_per_day_per_level.filter(spd => spd.klass_level === level)
			applicableSPD = applicableSPD.map(spd => {
				if (spd.spell_level <= abilityScoreModifier){
					spd.spells++
				}
				return {...spd, klassId: klassFeature.klass_id, klassName}
			})
			array = applicableSPD
		}
	})
	// here, you'd remove spells per level, as well

	return {spellsPerDay: array, klassFeature, klassName, abilityScoreModifier, level}
}

export const additionalSpellStats = (klassFeature, abilityScoreModifier) => {
	const { character_info } = store.getState()
	let lvl = character_info.classes.find(cl => cl.id === klassFeature.klass_id).level

	return {casterLevel: lvl, concentration: lvl + abilityScoreModifier}
}

export const remainingKnownSpellsArray = (klassFeature, level) => {
	const { character } = store.getState()
	let spellcasting
	klassFeature.features.forEach(f => spellcasting = f.spellcasting || spellcasting)

	let knownSpellsThisLevel = knownSpellsArray(klassFeature, level)
	let characterKnownSpells = character.character_known_spells

	knownSpellsThisLevel = knownSpellsThisLevel.map(kspl => {
		let knownSpells = characterKnownSpells.filter(cks => cks.spellcasting.id === kspl.feature_spellcasting_id && cks.spell_list_spell.spell_level === kspl.spell_level)

		let remainingSpells = kspl.spells - knownSpells.length
		remainingSpells = remainingSpells < 0 ? 0 : remainingSpells
		return {...kspl, spells: remainingSpells}
	})

	return knownSpellsThisLevel
}

export const knownSpellsArray = (klassFeature, level) => {
	let spellcasting
	klassFeature.features.forEach(f => spellcasting = f.spellcasting || spellcasting)

	return spellcasting.known_spells_per_level.filter(kspl => kspl.klass_level === level)
}

export const areAllKnownSpellsFilled = (klassFeature, level) => {
	let remainingKnownSpells = remainingKnownSpellsArray(klassFeature, level)

	let areThereKnownSpellsMissing = false
	let i = 0

	while (!areThereKnownSpellsMissing || i+1 === remainingKnownSpells.length){
		if (remainingKnownSpells[i].spells > 1){
			areThereKnownSpellsMissing = true
		}
		i++
	}

	return areThereKnownSpellsMissing
}
