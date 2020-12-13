import React from 'react'
import localhost from '../../localhost'
import { withRouter } from 'react-router-dom'


const Confirmation = props => {

	const { name } = props.characterInfo

	const createCharacter = () => {
		fetch(`${localhost}/api/v1/characters`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				character: props.characterInfo,
				user_id: props.user_id
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			createCharacterClass(data.character.id)
		})
	}

	const createCharacterClass = (characterId) => {
		fetch(`${localhost}/api/v1/character_klasses`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				character_id: characterId,
				classes: props.characterInfo.classes
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			props.history.push('/characters/'+ characterId)
		})
	}

	const displayCharacterDetails = () => {

	}

	const renderButton = () => {
		return <button onClick={createCharacter}>Create {name}</button>
	}

	return (
		<>
			{displayCharacterDetails()}
			{renderButton()}
		</>
	)
}

export default withRouter(Confirmation)
