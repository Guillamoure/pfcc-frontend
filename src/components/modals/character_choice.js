import React from 'react'
import { useSelector } from 'react-redux'
import { postFetch, getFetch } from '../../helper_functions/fetches'
import { replaceCharacterAction } from '../../helper_functions/action_creator/character'
import { replaceCharacterInfo } from '../../helper_functions/distributers/character_info'
import _ from 'lodash'

const CharacterChoice = props => {

	const [options, setOptions] = React.useState(null)
	const [filteredOptions, setFilteredOptions] = React.useState(null)
	const [searchTerm, setSearchTerm] = React.useState("")

	React.useEffect(() => {
		let url = null
		if (props.choiceObj.specifics === "weapon_id"){url = "weapons"}

		if (url){
			getFetch(url)
				.then(data => {
					let alphabetizedData = data.sort((a,b) => a.name.localeCompare(b.name))
					setOptions(alphabetizedData)
					setFilteredOptions(alphabetizedData)
				})
		}
	}, [props.choiceObj.specifics])

	React.useEffect(() => {
		if (options){
			let filtered = options.filter(op => op.name.toLowerCase().includes(searchTerm.toLowerCase()))
			setFilteredOptions(filtered)
		}
	}, [searchTerm])

	let character = useSelector(state => state.character)
	let { feature, featureName, klassName, specifics } = props.choiceObj

	specifics = _.startCase(specifics)
	if (_.endsWith(specifics, " Id")){
		specifics = specifics.substring(0, specifics.length-3)
	}

	const renderOptions = () => {
		if (filteredOptions){
			return filteredOptions.map(op => {
				let name = op.name
				if (character.character_choices.find(ccc => ccc.feature_id === feature.id && parseInt(ccc.choice) === op.id)){
					name = <strong>{name}</strong>
				}
				return <button onClick={() => renderClick(op.id)}>{name}</button>
			})
		}

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
				replaceCharacterInfo(props.choiceObj, data)
				props.exitModal()
			})
	}

	const searchBar = () => {
		if (!options){return null}
		return (
			<>
				<label htmlFor="search-term">Filter:</label>
				<input type="text" name="search-term" id="search-term" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/><br/>
			</>
		)
	}

	return (
		<>
			<h3>{featureName} {specifics}</h3>
			{searchBar()}
			{renderOptions()}
		</>
	)
}

export default CharacterChoice
