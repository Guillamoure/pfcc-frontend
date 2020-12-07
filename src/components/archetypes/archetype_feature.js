import React from 'react'
import _ from 'lodash'
import { descriptionParser } from '../../utils/fuf'

const ArchetypeFeature = props => {

	const { name, description } = props.feature

	const renderDescription = () => {
		return descriptionParser(description)
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
