import store from '../../store'
import { abilityScoreMod } from './ability_scores'
import { actionClass } from '../fuf'

export const allSpellcastingKlassFeatures = () => {
	const { character } = {...store.getState()}

	return [...character.applicable_klass_features].filter(akf => {
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
			let applicableSPD = [...f.spellcasting.spells_per_day_per_level].filter(spd => spd.klass_level === level)
			applicableSPD = [...applicableSPD].map(spd => {
				let increase = 0
				if (spd.spell_level <= abilityScoreModifier){
					increase = 1
				}
				return {...spd, spells: spd.spells + increase, klassId: klassFeature.klass_id, klassName}
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

	while (i <= remainingKnownSpells.length){
		if (remainingKnownSpells[i]?.spells > 0){
			areThereKnownSpellsMissing = true
		}
		i++
	}

	return areThereKnownSpellsMissing
}

export const characterKnownSpells = (klassFeature) => {
	let spellcasting
	const { character_known_spells } = {...store.getState().character}

	klassFeature.features.forEach(f => spellcasting = f.spellcasting || spellcasting)

	return character_known_spells.filter(cks => cks.spellcasting.id === spellcasting.id)
}

export const spellData = (spellData, klassId) => {
	const { character_info } = store.getState()
	let { spell, spell_list_spell: sls, spellcasting } = spellData
	let level = character_info.classes.find(cl => cl.id === klassId).level


	let spellLevel = sls.spell_level
	let action = actionClass(spell.action.name)
	let name = spell.name
	let range = renderSpellRange(spell, level)
	let duration = renderSpellDuration(spell, level)
	let difficultyClass = renderSpellDC(spellData)
	let hitModifier = ""
	let spellResistance = spell.spell_resistance ? "Y" : "N"
	let spellId = spell.id

	return { spellLevel, action, name, range, duration, difficultyClass, hitModifier, spellResistance, spellId }
}

export const renderSpellRange = (spell, level) => {
	let rangeIncrease = spell.spell_range.increase_per_level * level
	if (rangeIncrease % 1 !== 0){
		rangeIncrease -= spell.spell_range.increase_per_level
	}
	if (spell.spell_range.feet + rangeIncrease === 0){return "-"}
	return Math.floor(spell.spell_range.feet + rangeIncrease) + " ft"
}

export const renderSpellDuration = (spell, level) => {
	let duration = spell.time + (spell.increase_per_level * (level - 1))
	let unitOfTime = spell.unit_of_time
	if (duration !== 1){unitOfTime += "s"}
	if (duration === 0){
		if (spell.duration === "instantaneous"){return "instant."}
		if (spell.duration === "concentration"){return "concent."}
	}
	let time = duration + " " + unitOfTime
	let concentration = spell.concentration ? "con./" : ""
	let dismissible = spell.dismissible ? " (D)" : ""
	return concentration + time + dismissible
}

export const renderSpellDC = (spellData) => {
	if (spellData.spell.saving_throw === "none"){return "-"}
	let save = spellData.spell.saving_throw
	if (save === "Fortitude"){save = "Fort"}
	if (save === "Reflex"){save = "Ref"}
	return save + " " + (10 + abilityScoreMod(spellData.spellcasting.ability_score) + spellData.spell_list_spell.spell_level)
}
