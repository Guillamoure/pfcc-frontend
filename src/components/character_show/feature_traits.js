import React from 'react'
import Features from './features'
import RacialTraits from './racial_traits'
import Feats from './feats'
import Traits from './traits'

const FeaturesTraits = (props) => {

	return (
		<>
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Class Features</h4>
			<Features editModal={props.editModal}/>
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Ancestral Traits</h4>
			<RacialTraits />
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Feats</h4>
			<Feats />
			<h4 style={{marginTop: "0.7em", marginBottom: "0.5em"}}>Character Traits</h4>
			<Traits />
		</>
	)
}

export default FeaturesTraits
