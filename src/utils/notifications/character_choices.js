import React from 'react'
import store from '../../store'
import _ from 'lodash'
import { modalAction } from '../action_creator/popups'

export const allCharacterChoices = () => {
	// NEW DATA
	let array = []

	// STORED DATA
	let { character } = store.getState()
	let { applicable_klass_features, character_choices } = {...character}

	// CALCULATED DATA

	applicable_klass_features.forEach(akf => {
		let klassName = character.uniq_klasses.find(uk => {
			if (akf.klass_id){
				return uk.id === akf.klass_id
			} else if (akf.klass_archetype_id){
				let arch = character.archetypes.find(ar => ar.id === akf.klass_archetype_id)
				return uk.id === arch.klass_id

			}
		}).name
		akf.features.forEach(f => {
			if (f.character_choices.length) {
				let isNew = true
				if (character_choices.find(cc => cc.feature_id === f.id)){isNew = false}
				array.push({
					feature: f,
					klassName,
					featureName: akf.name,
					sourceId: akf.id,
					specifics: f.character_choices[0].column,
					sub_feature: f.character_choices[0].sub_feature,
					isNew
				})
			}
		})
	})

	return array
}

export const renderCharacterChoices = () => {
	let characterChoicesArray = allCharacterChoices()
	return characterChoicesArray.map(cc => {
		let specifics = _.startCase(cc.specifics)
		if (_.endsWith(specifics, " Id")){
			specifics = specifics.substring(0, specifics.length-3)
		}

		let verb = cc.isNew ? "Choose" : "Alter"
		let className = cc.isNew ? "attention-button-animation" : ""

		let renderClick = () => {
			modalAction("characterChoice", cc)
		}

		return (
			<button className={className} onClick={renderClick}>
				{cc.klassName} - {cc.featureName}: {verb} {specifics}
			</button>
		)
	})
}

export const allKlassSpecializations = () => {
	// NEW DATA
	let array = []

	// STORED DATA
	let { character } = store.getState()
	let { applicable_klass_features, klass_specializations } = {...character}

	// CALCULATED DATA

	applicable_klass_features.forEach(akf => {
		if (akf.specialization){
			let klassName = character.uniq_klasses.find(uk => uk.id === akf.klass_id).name
			let hasSpecialization = akf.choice_amount
			klass_specializations.forEach(kspec => {
				if (kspec.klass_feature.id === akf.id){hasSpecialization--}
			})
			// by setting hasSpecialization to a number of choices
			// if the akf needs you to pick multiple features (i.e. cleric get 2 domains)
			// it deducts one if a specialization is found
			// and then if the number is greater than 0, there are some specializations to be taken
			// greater than 0 is FALSE, is 0 is TRUE
			// at least a truthy value for "should a red button be displayed?"
			hasSpecialization = !hasSpecialization > 0
			array.push({
				klassFeature: akf,
				klassName,
				hasSpecialization
			})
		}
	})

	return array
}


export const renderKlassSpecializations = () => {
	let klassSpecializationArray = allKlassSpecializations()
	return klassSpecializationArray.map(kspec => {
	// 	let specifics = _.startCase(kspec.specifics)
	// 	if (_.endsWith(specifics, " Id")){
	// 		specifics = specifics.substring(0, specifics.length-3)
	// 	}
	//
		let verb = !kspec.hasSpecialization ? "Choose" : "Alter"
		let className = !kspec.hasSpecialization ? "attention-button-animation" : ""

		let renderClick = () => {
			modalAction("klassSpecialization", kspec)
		}

		return (
			<button className={className} onClick={renderClick}>
				{kspec.klassName}: {verb} {kspec.klassFeature.name}
			</button>
		)
	})
}
