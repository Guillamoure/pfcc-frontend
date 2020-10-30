import React from 'react'

const ActiveEncounterInitiative = props => {

	const [activeParticipants, setParticipants] = React.useState([])

	React.useEffect(() => {
		let initCreatures = props.creatures.map(cr => {
			return {...cr, initiative: null}
		})
		setParticipants(initCreatures)
	}, [props.creatures])

	const initiativeOrder = () => {
		let sortedParticipants = []

		let uninitiatedParticipants = activeParticipants.filter(p => p.initiative === null)
		sortedParticipants.push(...uninitiatedParticipants)

		let initiatedParticipants = activeParticipants.filter(p => typeof p.initiative === "number").sort((a, b) => a.initiative > b.initiative)
		sortedParticipants.push(...initiatedParticipants)

		let nodeParticipants = sortedParticipants.map(p => {

			let init = p.initiative !== null ? p.initiative : <input type="number" placeholder="-"/>
			return (
				<li>
					<strong onClick={() => props.seeDetails(p.creature)}>{p.creature.name}</strong> | Init: {init}
				</li>
			)
		})
		return nodeParticipants
	}

	return (
		<ul>
			{initiativeOrder()}
		</ul>
	)
}

export default ActiveEncounterInitiative
