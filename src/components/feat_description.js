import React from 'react'

const FeatDescription = props => {

	const { name, description, benefit, normal, special, source } = props.feat

	return (
		<>
			<h3>{name}</h3>
			<p><em>{description}</em></p>
			{benefit && <p><strong>Benefit:</strong> {benefit}</p>}
			{normal && <p><strong>Normal:</strong> {normal}</p>}
			{special && <p><strong>Special:</strong> {special}</p>}
		</>
	)

}

export default FeatDescription
