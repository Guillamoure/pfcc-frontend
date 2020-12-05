import React from 'react'
import _ from 'lodash'

const ArchetypeFeature = props => {

	const { name, description } = props.feature

	const renderDescription = () => {
		let desc = description.split("\n\n")
		return desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
	}

	let slug = name.toLowerCase().split(" ").join("-")
	return (
		<>
			<li id={slug} className="feature-title"><strong>{name}</strong></li>
			<li>{renderDescription()}</li>
		</>
	)

}

export default ArchetypeFeature
