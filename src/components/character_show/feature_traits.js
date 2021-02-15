import React from 'react'
import Features from './features'
import Traits from './racial_traits'

const FeaturesTraits = (props) => {

	return (
		<>
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Class Features</h4>
			<Features editModal={props.editModal}/>
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Ancestral Traits</h4>
			<Traits />
		</>
	)
}

export default FeaturesTraits
