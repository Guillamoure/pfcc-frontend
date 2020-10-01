import store from '../../store'
import { abilityScoreMod } from './ability_scores'
import { isThisActionAvailable } from './round_actions'
import { actionClass, classLevel } from '../fuf'
import { postFetch, patchFetch } from '../fetches'
import { replaceCharacterAction, triggerTurnActionAction } from '../action_creator/character'

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

export const locateSpellcastingFeatureThroughId = id => {
	let spellcasting
	allSpellcastingKlassFeatures.forEach(sckf => {
		sckf.feature.forEach(f => {
			if (f.spellcasting.id === id){spellcasting = f.spellcasting}
		})
	})
	return spellcasting
}

export const locateBonusSpellSlotsKlassFeature = () => {
	const { character } = {...store.getState()}

	return [...character.applicable_klass_features].filter(akf => {
		let bonusSpellSlot = false
		akf.features.forEach(f => {
			if (f.bonus_spell_slot){bonusSpellSlot = true}
		})
		return bonusSpellSlot
	})
}

export const availableCastableSpellLevelsThroughKlassId = id => {
	let spellcastingKlassFeatures = allSpellcastingKlassFeatures()
	let spellcasting = spellcastingKlassFeatures.find(kf => kf.klass_id === id && kf.features.find(f => f.spellcasting))?.features.find(f => f.spellcasting)?.spellcasting
	let level = classLevel(id)
	return spellcasting.spells_per_day_per_level.filter(spdpl => spdpl.klass_level === level).map(spd => spd.spell_level)
}

export const allRemainingSpellsPerDay = () => {
	let spellcastingKlassFeatures = allSpellcastingKlassFeatures()
	return spellcastingKlassFeatures.map(remainingSpellsPerDay)
}

export const remainingSpellsPerDay = (klassFeature) => {
	let array = []
	const { character, character_info } = store.getState()
	let level = character_info.classes.find(cl => cl.id === klassFeature.klass_id).level
	let klassName = character.uniq_klasses.find(uk => uk.id === klassFeature.klass_id).name
	let abilityScoreModifier
	let spellcasting

	klassFeature.features.forEach(f => {
		if (f.spellcasting){
			spellcasting = f.spellcasting
			abilityScoreModifier = abilityScoreMod(spellcasting.ability_score)

			array = remainingSpellsPerDayFromSpellcasting(spellcasting, level, abilityScoreModifier)
		}
	})
	// here, you'd remove spells per level, as well
	return {spellsPerDay: array, klassFeature, klassName, abilityScoreModifier, level, spellcasting}
}

export const remainingSpellsPerDayFromSpellcasting = (spellcasting, level) => {
	const { character, character_info } = store.getState()
	let abilityScoreModifier = abilityScoreMod(spellcasting.ability_score)

	let applicableSPD = [...spellcasting.spells_per_day_per_level].filter(spd => spd.klass_level === level)

	return applicableSPD = [...applicableSPD].map(spd => {
		let bonusSpell = null
		let increase = 0
		if (spd.spell_level <= abilityScoreModifier){increase = 1}

		let decrease = 0
		character.cast_spells.forEach(cs => {
			if (spd.spell_level === cs.spell_level){decrease++}
		})
		character.prepared_spells.forEach(ps => {
			if (spd.spell_level === ps.spell_level && ps.cast && !ps.bonus_spell){decrease++}
			if (spd.spell_level === ps.spell_level && ps.bonus_spell){bonusSpell = true}
			if (spd.spell_level === ps.spell_level && ps.bonus_spell && ps.cast){bonusSpell = "cast"}
		})

		return {...spd, spells: (spd.spells + increase - decrease), bonusSpell}
	})
}

export const additionalSpellStats = (lvl, abilityScoreModifier) => {
	return {casterLevel: lvl, concentration: lvl + abilityScoreModifier}
}

export const remainingKnownSpellsArray = (spellcasting, level) => {
	const { character } = store.getState()

	let knownSpellsThisLevel = knownSpellsArray(spellcasting, level)
	let characterKnownSpells = character.character_known_spells

	knownSpellsThisLevel = knownSpellsThisLevel.map(kspl => {
		let knownSpells = characterKnownSpells.filter(cks => cks.spellcasting.id === kspl.feature_spellcasting_id && cks.spell_list_spell.spell_level === kspl.spell_level)

		let remainingSpells = kspl.spells - knownSpells.length
		remainingSpells = remainingSpells < 0 ? 0 : remainingSpells
		return {...kspl, spells: remainingSpells}
	})

	return knownSpellsThisLevel
}

export const remainingPreparedSpellsArray = (spellcasting, level) => {
	const { character } = store.getState()

	let preparedSpellsThisLevel = remainingSpellsPerDayFromSpellcasting(spellcasting, level)
	let characterPreparedSpells = character.prepared_spells

	preparedSpellsThisLevel = preparedSpellsThisLevel.map(pspl => {
		let cpsThisSpellLevel = characterPreparedSpells.filter(cps => cps.feature_spellcasting_id === pspl.feature_spellcasting_id && cps.spell_level === pspl.spell_level)

		let remainingSpells = pspl.spells - cpsThisSpellLevel.length
		remainingSpells = remainingSpells < 0 ? 0 : remainingSpells
		return {...pspl, spells: remainingSpells}
	})

	return preparedSpellsThisLevel
}

export const knownSpellsArray = (spellcasting, level) => {
	return spellcasting.known_spells_per_level.filter(kspl => kspl.klass_level === level)
}

export const spellsPerDayArray = (spellcasting, level) => {
	return spellcasting.spells_per_day_per_level.filter(spdpl => spdpl.klass_level === level)
}

export const areAllKnownSpellsFilled = (spellcasting, level) => {
	let remainingKnownSpells = remainingKnownSpellsArray(spellcasting, level)

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

export const areAllPreparedSpellsFilled = (spellcasting, level) => {
	if (!spellcasting.prepare_spells){
		return false
	}
	let remainingPreparedSpells = remainingPreparedSpellsArray(spellcasting, level)

	let areTherePreparedSpellsMissing = false
	let i = 0

	let preparedSpells = store.getState().character.prepared_spells

	while (i <= remainingPreparedSpells.length){
		let preparedSpellsThisLevel = preparedSpells.filter(ps => ps.spell_level === i)
		if (remainingPreparedSpells[i]?.spells > preparedSpellsThisLevel.length){
			areTherePreparedSpellsMissing = true
		}
		i++
	}

	return areTherePreparedSpellsMissing
}

export const areAllBonusSpellSlotsFilled = (spellcasting, level) => {
	let spellLevels = spellsPerDayArray(spellcasting, level).map(spd => spd.spell_level)
	let bssAbilities = locateBonusSpellSlotsKlassFeature()
	if (bssAbilities.length === 1) {
		let featureBonusSpellSlot = bssAbilities[0].features.find(f => f.bonus_spell_slot).bonus_spell_slot
		// if (featureBonusSpellSlot.list_of_available_spells === "klass specialization"){
			//
			// 	store.getState().character.klass_specializations
			// }
			let preparedSpells = store.getState().character.prepared_spells

			// iterate through the preparedSpells, if you find a prepared spell, remove that spell level from the spellLevels array

			// if the array is empty, all spells have been prepared

			return !!spellLevels.length
	}

}

export const bonusSpellSlotOptions = (spellcasting, level) => {
	let bssAbilities = locateBonusSpellSlotsKlassFeature()
	let spellLevels = spellsPerDayArray(spellcasting, level).map(spd => spd.spell_level)
	let spellOptions = []

	if (bssAbilities.length === 1) {
		let featureBonusSpellSlot = bssAbilities[0].features.find(f => f.bonus_spell_slot).bonus_spell_slot
		if (featureBonusSpellSlot.list_of_available_spells === "klass_specializations"){
			let characterKlassSpecializations = store.getState().character.klass_specializations
			characterKlassSpecializations.forEach(kspec => {
				kspec.klass_specialization_features.forEach(ksFeature => {
					ksFeature.features.forEach(f => {
						f.castable_spells.forEach(cs => {
							if (cs.bonus_spell_slot_option && spellLevels.includes(cs.applicable_spell_level)) {
								spellOptions.push({...cs.spell, spell_level: cs.applicable_spell_level, sourceId: ksFeature.id, sourceAbility: "klass_specialization_feature"})
							}
						})
					})
				})
			})
		}
	}
	return spellOptions
}

export const characterSpells = (spellcasting) => {
	let keyword = spellcasting.prepare_spells ? "prepared_spells" : "character_known_spells"
	const spells = [...store.getState().character[keyword]]

	let data = spells.filter(cks => cks.spellcasting.id === spellcasting.id)
	let sortedData = []
	for(let i = 0; i < 10; i++){
		let thisLvl = data.filter(sp => sp.spell_level === i)
		sortedData.push(thisLvl.sort((a,b) => a.spell.name.localeCompare(b.spell.name)))
	}
	sortedData = sortedData.flat()

	return sortedData
}

export const spellData = (spellData, klassId) => {
	const { character_info } = store.getState()
	let { spell, spell_list_spell: sls, spellcasting } = spellData
	let level = character_info.classes.find(cl => cl.id === klassId).level

	let spellLevel = sls?.spell_level ?? spellData.spell_level
	let action = spellData.cast ? "cannot-cast" : isThisActionAvailable(spell, {spell: true, spellcasting, klassId, spellLevel})
	let name = spell.name
	let range = renderSpellRange(spell, level)
	let duration = renderSpellDuration(spell, level)
	let difficultyClass = renderSpellDC(spellData)
	let hitModifier = ""
	let spellResistance = spell.spell_resistance ? "Y" : "N"
	let spellId = spell.id

	let preparedSpellId
	if (spellcasting.prepare_spells) preparedSpellId = spellData.id
	if (spellData.bonus_spell && !spellData.cast){action = actionClass(spell.action.name)}

	return { spellLevel, action, name, range, duration, difficultyClass, hitModifier, spellResistance, spellId, spellcasting, preparedSpellId }
}

export const renderSpellRange = (spell, level) => {
	let rangeIncrease = spell.spell_range.increase_per_level * level
	if (rangeIncrease % 1 !== 0){
		rangeIncrease -= spell.spell_range.increase_per_level
	}
	if (spell.spell_range.feet + rangeIncrease === 0){
		if (spell.spell_range.name === "Touch"){return "Touch"}
		return "-"
	}
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
	return save + " " + (10 + abilityScoreMod(spellData.spellcasting.ability_score) + spellData.spell_level)
}

export const castSpell = (ksData, spellsPerDay) => {
	if (ksData.action !== "cannot-cast"){
		triggerTurnActionAction(ksData.action)
		if (ksData.spellcasting.infinite_zero_level && ksData.spellLevel === 0){
			console.log("Zero-th level spell cast!")
		} else {
			let spellPerDay = spellsPerDay.find(spd => spd.spell_level === ksData.spellLevel)
			const { character } = store.getState()
			if (spellPerDay.spells > 0 || ksData.castableBonusSpell){
				if (ksData.spellcasting.expend_prepared_spells){
					postFetch(`cast_spells`, {id: ksData.preparedSpellId, expend: true})
						.then(data => {
							let replacePreparedSpells = [...character.prepared_spells]
							replacePreparedSpells = replacePreparedSpells.map(ps => {
								if (ps.id === ksData.preparedSpellId){
									return {...ps, cast: true}
								}
								return ps
							})
							replaceCharacterAction('prepared_spells', replacePreparedSpells)
						})
				} else {
					let body = {
						character_id: character.id,
						feature_spellcasting_id: ksData.spellcasting.id,
						spell_level: ksData.spellLevel
					}
					postFetch("cast_spells", body)
						.then(data => {
							let replaceCastSpells = [...character.cast_spells]
							replaceCastSpells.push(body)
							replaceCharacterAction('cast_spells', replaceCastSpells)
						})
				}

			}
		}
	}
}
