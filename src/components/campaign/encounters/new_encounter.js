import React from 'react'
import { modalAction } from '../../../helper_functions/action_creator/popups'
import { postFetch } from '../../../helper_functions/fetches'

import CreatureSearch from '../creatures/creature_search'

const NewEncounter = props => {

	const [form, updateForm] = React.useState({
		name: "",
		notes: ""
	})
	const [creatures, updateCreatures] = React.useState([])

	const editForm = (e) => {
		let updatedForm = {...form, [e.target.name]: e.target.value}
		updateForm(updatedForm)
	}

	const addCreature = (creature) => {
		let existingCreature = creatures.find(cr => cr.creature.id === creature.id)
		let creaturesDupe = [...creatures]
		if (existingCreature){
			creaturesDupe = creaturesDupe.map(cr => {
				if (cr.creature.id === creature.id){
					return {creature: cr.creature, count: cr.count+1}
				} else {
					return cr
				}
			})
		} else {
			creaturesDupe.push({creature, count: 1})
		}
		updateCreatures(creaturesDupe)
	}

	const subtractCreature = (e, creature, count) => {
		e.preventDefault()
		let creaturesDupe = [...creatures]
		if (count > 1){
			creaturesDupe = creaturesDupe.map(cr => {
				if (cr.creature.id === creature.id){
					return {creature: cr.creature, count: cr.count-1}
				} else {
					return cr
				}
			})
		} else {
			creaturesDupe = creaturesDupe.filter(cr => cr.creature.id !== creature.id)
		}
		updateCreatures(creaturesDupe)
	}

	const renderCreatures = () => {
		let creatureNodes = creatures.map(cr => {
			let challengeRating = cr.creature.challenge_rating
			if (challengeRating < 1){challengeRating = `1/${Math.ceil(1/challengeRating)}`}
			let subtractBtn = <button onClick={(e) => subtractCreature(e, cr.creature, cr.count)}>Subtract</button>
			return (
				<>
					<li onClick={() => modalAction("statBlock", cr.creature)}>
						CR {challengeRating} | <strong>{cr.creature.name}</strong> | {cr.creature.size} {cr.creature.creature_type.name} {cr.count > 1 ? <strong>x{cr.count}</strong> : null}
					</li>
					{subtractBtn}
				</>
			)
		})
		return <ul style={{gridArea: "creatures"}}>{creatureNodes}</ul>
	}

	const renderForm = () => {
		let submitButton = creatures.length ? <button>Create Encounter</button> : null
		return (
			<form id="campaign-new-encounter" onSubmit={createEncounter}>
				<label style={{gridArea: "name"}}>
					<strong>Encounter Name </strong>
					<input type="text" name="name" value={form.name} onChange={editForm}/>
				</label>
				<button style={{gridArea: "close"}} onClick={() => props.toggleEncounterForm(false)}>X</button>
				<label style={{gridArea: "notes"}}>Notes
					<textarea type="text" name="notes" rows="10" cols="60" value={form.notes} onChange={editForm}/>
				</label>
				{renderCreatures()}
				{submitButton}
			</form>
		)
	}

	const createEncounter = (e) => {
		e.preventDefault()
		let campaignId = window.location.href.split("campaigns/")[1]
		let body = {
			...form,
			creatures,
			campaign_id: campaignId
		}

		postFetch("encounters", body)
			.then(data => {
				if (data.response){
					debugger
				} else {
					console.log("Unable to create encounter")
				}
			})
	}

	return (
		<>
			<main>
				{renderForm()}
			</main>
			<aside>
				<CreatureSearch displayCreature={(creature) => modalAction("statBlock", creature)} addCreature={addCreature}/>
			</aside>
		</>
	)
}

export default NewEncounter
