import React from 'react'

const ActiveEncounter = props => {

	return (
		<>
			<p>I'm your active encounter</p>
			<button onClick={props.endEncounter}>End</button>
			<button>Delete</button>
		</>
	)
}

export default ActiveEncounter
