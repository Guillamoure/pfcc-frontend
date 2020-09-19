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
		let klassName = character.uniq_klasses.find(uk => uk.id === akf.klass_id).name
		akf.features.forEach(f => {
			if (f.character_choices.length) {
				let isNew = true
				if (character_choices.find(cc => cc.feature_id === f.id)){isNew = false}
				array.push({
					feature: f,
					klassName,
					featureName: akf.name,
					specifics: f.character_choices[0].column,
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
