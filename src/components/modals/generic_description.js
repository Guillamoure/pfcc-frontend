import React from 'react'
import { descriptionParser } from '../../utils/fuf'

const GenericDescription = props => {


	const renderDescription = () => {
		return (
			<>
				<h3 style={{display: 'inline-block'}}>{props.name}</h3>
				<br/>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>

				{descriptionParser(props.description)}

			</>
		)
	}

	return (
		<section>
			{renderDescription()}
		</section>
	)
}

export default GenericDescription
