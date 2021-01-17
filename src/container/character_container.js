import React from 'react'
import Character1 from '../dummy_data/character1'

const CharacterDetails = props => {

	console.log(Character1)
	return (
		<>
			{Character1.character.name}
		</>
	)
}

export default CharacterDetails
