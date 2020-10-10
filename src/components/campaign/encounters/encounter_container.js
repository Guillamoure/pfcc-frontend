import React from 'react'

import EncounterSearch from './encounter_search'
import NewEncounter from './new_encounter'

const EncounterContainer = props => {

	const [encounterForm, toggleEncounterForm] = React.useState(false)

	return (
		<main id="campaign-show-encounters">
			<EncounterSearch toggleEncounterForm={toggleEncounterForm}/>
			{encounterForm && <NewEncounter toggleEncounterForm={toggleEncounterForm}/>}
		</main>
	)
}

export default EncounterContainer
