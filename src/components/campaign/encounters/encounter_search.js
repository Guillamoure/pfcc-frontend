import React from 'react'

const EncounterSearch = props => {

	return (
		<aside>
			<button className="block-list-btn" onClick={() => props.toggleEncounterForm(true)}>+ Create Encounter</button>
		</aside>
	)
}

export default EncounterSearch
