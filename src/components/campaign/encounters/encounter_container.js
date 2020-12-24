import React from 'react'

import EncounterSearch from './encounter_search'
import NewEncounter from './new_encounter'
import EncounterDetails from './encounter_details'

const EncounterContainer = props => {

	const [encounterForm, toggleEncounterForm] = React.useState(false)
	const [chosenEncounter, setChosenEncounter] = React.useState({})
	const [editingEncounter, setEditingEncounter] = React.useState(null)

	const selectedEncounter = (e, encounter) => {
		e.preventDefault()

		if (chosenEncounter.id !== encounter.id){
			setChosenEncounter(encounter)
			toggleEncounterForm(false)
		} else {
			setChosenEncounter({})
		}
	}

	const renderNewForm = (value) => {
		setChosenEncounter({})
		toggleEncounterForm(value)
	}

	const editEncounter = (encounter) => {
		setEditingEncounter(encounter)
		setChosenEncounter({})
		toggleEncounterForm(true)
	}

	const resolveEditEncounter = (encounter) => {
		setEditingEncounter(null)
		setChosenEncounter(encounter)
		toggleEncounterForm(false)
	}

	return (
		<main id="campaign-show-encounters">
			<EncounterSearch toggleEncounterForm={renderNewForm} encounters={props.encounters} selectedEncounter={selectedEncounter}/>
			{encounterForm && <NewEncounter toggleEncounterForm={toggleEncounterForm} editingEncounter={editingEncounter} resolveEditEncounter={resolveEditEncounter}/>}
			{chosenEncounter.id && <EncounterDetails encounter={chosenEncounter} editEncounter={editEncounter} startEncounter={props.startEncounter}/>}
		</main>
	)
}

export default EncounterContainer
