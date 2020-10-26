import React from 'react'

import EncounterSearch from './encounter_search'
import NewEncounter from './new_encounter'
import EncounterDetails from './encounter_details'

const EncounterContainer = props => {

	const [encounterForm, toggleEncounterForm] = React.useState(false)
	const [chosenEncounter, setChosenEncounter] = React.useState({})

	const selectedEncounter = (e, encounter) => {
		e.preventDefault()

		if (chosenEncounter.id !== encounter.id){
			setChosenEncounter(encounter)
		} else {
			setChosenEncounter({})
		}
	}

	return (
		<main id="campaign-show-encounters">
			<EncounterSearch toggleEncounterForm={toggleEncounterForm} encounters={props.encounters} selectedEncounter={selectedEncounter}/>
			{encounterForm && <NewEncounter toggleEncounterForm={toggleEncounterForm}/>}
			{chosenEncounter.id && <EncounterDetails encounter={chosenEncounter}/>}
		</main>
	)
}

export default EncounterContainer
