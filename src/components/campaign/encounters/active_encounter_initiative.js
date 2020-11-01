import React from 'react'
import { averageHP } from '../../../utils/calculations/creatures'

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

		let nodeParticipants = []
		sortedParticipants.forEach(p => {
			let init = p.initiative !== null ? p.initiative : <input type="number" placeholder="-"/>
			for (let i = 0; i < p.count; i++){
				let hp = averageHP(p.creature.hit_dice, p.creature.creature_type.hit_die, p.creature.constitution)
				nodeParticipants.push(
					<li>
						<strong onClick={() => props.seeDetails(p.creature)}>{p.creature.name}</strong> | Init: {init} | HP: {hp}
					</li>
				)
			}
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
