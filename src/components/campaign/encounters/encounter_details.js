import React from 'react'
import { modalAction } from '../../../helper_functions/action_creator/popups'
import { removeEncounter } from '../../../helper_functions/action_creator/current_user'
import { deleteFetch } from '../../../helper_functions/fetches'

const EncounterDetails = props => {

	const deleteEncounter = (e) => {
		e.preventDefault()

		deleteFetch(`encounters/${props.encounter.id}`)
			.then(data => {
				const url = window.location.pathname
				const campaignId = parseInt(url.substring(url.lastIndexOf('/') + 1))
				removeEncounter(campaignId, props.encounter.id)
			})
	}

	const renderEncounter = () => {

		const { name, notes, description, creatures } = props.encounter

		const domCreatures = []
		creatures.forEach(cr => {
			let { name, size, creature_type: creatureType, challenge_rating } = cr.creature
			let challengeRating = challenge_rating
			if (challengeRating < 1){challengeRating = `1/${Math.ceil(1/challengeRating)}`}
			let node = (
				<li onClick={() => modalAction("statBlock", cr.creature)}>
					CR {challengeRating} | <strong>{name}</strong> | {size} {creatureType.name}
				</li>
			)
			for (let i = 1; i <= cr.count; i++){
				domCreatures.push(node)
			}
		})

		return (
			<>
				<h1 style={{gridArea: "name"}}>{name || "Untited Encounter"}</h1>
				<div style={{gridArea: "buttons"}}>
					<button onClick={(e) => props.startEncounter(e, props.encounter)}>Start Encounter</button>
					<button onClick={() => props.editEncounter(props.encounter)}>Edit</button>
					<button onClick={deleteEncounter}>Delete</button>
				</div>
				<div style={{gridArea: "creatures"}}>
					{domCreatures}
				</div>
			</>
		)
	}

	return (
		<>
			<main id="campaign-show-encounter">
				{renderEncounter()}
			</main>
		</>
	)
}

export default EncounterDetails
