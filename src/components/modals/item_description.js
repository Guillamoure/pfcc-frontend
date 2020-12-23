import React from 'react'
import _ from 'lodash'
import { descriptionParser } from '../../utils/fuf'

const ItemDescription = props => {

	const renderItem = () => {
		return (
			<>
				<h3 style={{display: 'inline-block'}}>{props.item.name}</h3>

				<div>{_.startCase(props.item.category)} <strong>Price</strong> {props.item.price_in_gp} gp; <strong>Weight</strong> {props.item.weight} lb;</div>

				<br/>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>

				{descriptionParser(props.item.description)}

			</>
		)
	}

	return (
		<section>
			{renderItem()}
		</section>
	)
}

export default ItemDescription
