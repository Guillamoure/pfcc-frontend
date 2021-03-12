import React from 'react'
import Features from './features'
import Traits from './racial_traits'
import Feats from './feats'

const FeaturesTraits = (props) => {

	return (
		<>
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Class Features</h4>
			<Features editModal={props.editModal}/>
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Ancestral Traits</h4>
			<Traits />
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Feats</h4>
			<Feats />
		</>
	)
}

export default FeaturesTraits
