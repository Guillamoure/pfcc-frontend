import React from 'react'
import { useSelector } from 'react-redux'
import { postFetch } from '../../helper_functions/fetches'
import { replaceCharacterAction } from '../../helper_functions/action_creator/character'
import _ from 'lodash'

const CharacterChoice = props => {

	let character = useSelector(state => state.character)
	let { feature, featureName, klassName, specifics } = props.choiceObj

	specifics = _.startCase(specifics)

	const renderOptions = () => {
		return feature.character_choices.map(cc => {
			let name = _.capitalize(cc.option)
			if (character.character_choices.find(ccc => ccc.feature_id === feature.id && ccc.choice === cc.option)){
				name = <strong>{name}</strong>
			}
			return (
				<button onClick={() => renderClick(cc.option)}>{name}</button>
			)
		})
	}

	const renderClick = (choice) => {
		postFetch('character_choice', {
			character_id: character.id,
			feature_id: feature.id,
			choice
		})
			.then(data => {
				let removedCharacterChoicesArray = character.character_choices.filter(cc => cc.id !== data.id)
				removedCharacterChoicesArray.push(data)
				replaceCharacterAction("character_choices", removedCharacterChoicesArray)
				// have to add to character_choices in redux
				props.exitModal()
			})
	}

	return (
		<>
			<h3>{featureName} {specifics}</h3>
			{renderOptions()}
		</>
	)
}

export default CharacterChoice
