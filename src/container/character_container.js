import React from 'react'
import DetailsBrief from '../components/character_details/details_brief'

import Character1 from '../dummy_data/character1'
import { settingsAction } from '../utils/action_creator/character'

const CharacterDetails = props => {

	const [character, setCharacter] = React.useState({})
	const [settings, setSettings] = React.useState({})

	React.useEffect(() => {
		setCharacter(Character1.character)
		let updateSettings = {
			layout: Character1.character.layout || "detailed",
			colorTheme: Character1.character.colorTheme || "noir"
		}
		settingsAction(updateSettings)
		setSettings(updateSettings)
	}, [])

	// THREE DIFFERENT CHARACTER DISPLAYS
	// 1) DETAILED CHARACTER SHEET
	// 2) ABBREVIATED CHARACTER SHEET (without stat/mod breakdown)
	// 3) STAT BLOCK (mostly for npcs, monsters, but can be for characters)

	const renderDetails = () => {
		if (!Object.keys(character).length){return null}

		return (
			<>
				<DetailsBrief character={character}/>
			</>
		)
	}

	let className = `${settings.layout}-layout`

	return (
		<main id="character-details-container" className={className}>
			{renderDetails()}
		</main>
	)
}

export default CharacterDetails
