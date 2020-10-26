import React from 'react'

const EncounterSearch = props => {

	const renderEncounters = () => {
		let inc = 1
		return props.encounters.map((e) => {
			let name = e.name.length > 0 ? e.name : `Encounter ${inc++}`
			return <button className="block-list-btn" onClick={(ev) => props.selectedEncounter(ev, e)}>{name}</button>
		})
	}

	return (
		<aside>
			<button className="block-list-btn" onClick={() => props.toggleEncounterForm(true)}>+ Create Encounter</button>
			{renderEncounters()}
		</aside>
	)
}

export default EncounterSearch
