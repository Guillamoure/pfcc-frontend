import React from 'react'
import ActiveEncounterInitiative from './active_encounter_initiative'
import CreatureStatBlock from '../../creature_stat_block'

const ActiveEncounter = props => {

	const [participant, setParticipant] = React.useState({})

	const seeDetails = (creature) => {
		if (participant.id === creature.id){
			setParticipant({})
		} else {
			setParticipant(creature)
		}
	}

	return (
		<main id="campaign-show-active-encounter">
			<ActiveEncounterInitiative creatures={props.encounter.creatures} seeDetails={seeDetails}/>
			{participant.id && <aside><CreatureStatBlock creature={participant} /></aside>}
			<p>I'm your active encounter</p>
			<button onClick={props.endEncounter}>End</button>
			<button>Delete</button>
		</main>
	)
}

export default ActiveEncounter
