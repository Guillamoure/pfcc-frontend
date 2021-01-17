import React from 'react'
import Character1 from '../dummy_data/character1'
import { settingsAction } from '../utils/action_creator/character'

const CharacterDetails = props => {

	const [character, setCharacter] = React.useState({})

	React.useEffect(() => {
		setCharacter(Character1)
		let settings = {
			layout: Character1.character.layout || "detailed",
			colorTheme: Character1.character.colorTheme || "noir"
		}
		settingsAction(settings)
	}, [])

	// THREE DIFFERENT CHARACTER DISPLAYS
	// 1) DETAILED CHARACTER SHEET
	// 2) ABBREVIATED CHARACTER SHEET (without stat/mod breakdown)
	// 3) STAT BLOCK (mostly for npcs, monsters, but can be for characters)

	const renderDetails = () => {

	}

	return (
		<main id="character-details-container">
			{renderDetails()}
		</main>
	)
}

export default CharacterDetails
