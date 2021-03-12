import React from 'react'

const PoisonDescription = props => {

	const renderPoison = () => {
		const { affliction_type, cure, effect, fortitude_dc, frequency, name, onset, price_in_gp } = props.item
		//
		//
		return (
			<>
				<h3 style={{display: 'inline-block'}}>{name}</h3>
				<div><strong>Price</strong> {price_in_gp} gp; <strong>Type</strong> {affliction_type}; <strong>Fortitude DC</strong> {fortitude_dc}</div>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
				<br/>
				<div><strong>Onset</strong> {onset}; <strong>Frequency</strong> {frequency}; <strong>Cure</strong> {cure}</div>
				<div><strong>Effect</strong> {effect}</div>
			</>
		)
	}


	return (
		<section>
			{renderPoison()}
		</section>
	)
}

export default PoisonDescription
