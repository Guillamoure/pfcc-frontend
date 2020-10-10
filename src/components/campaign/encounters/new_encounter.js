import React from 'react'


const NewEncounter = props => {

	const [form, updateForm] = React.useState({
		name: "",
		notes: ""
	})

	const editForm = (e) => {
		let updatedForm = {...form, [e.target.name]: e.target.value}
		updateForm(updatedForm)
	}

	const renderForm = () => {
		return (
			<form id="campaign-new-encounter">
				<span style={{display: "flex", justifyContent: "space-between"}}>
					<label forhtml="campaign-new-encounter-name">
						<strong>Encounter Name </strong>
						<input type="text" id="campaign-new-encounter-name" name="name" value={form.name} onChange={editForm}/>
					</label>
					<button onClick={() => props.toggleEncounterForm(false)}>X</button>
				</span>
				<br/>
				<label forhtml="campaign-new-encounter-notes">Notes</label>
				<textarea type="text" id="campaign-new-encounter-notes" name="notes" rows="10" cols="120" value={form.notes} onChange={editForm}/>
			</form>
		)
	}

	return (
		<main>
			{renderForm()}
		</main>
	)
}

export default NewEncounter
