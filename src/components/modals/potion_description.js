import React from 'react'
import _ from 'lodash'

import SpellDescription from '../spell_description'


const PotionDescription = props => {

	const { known, caster_level, potion_or_oil, spell } = props.cp

	const renderPotion = () => {
		return (
			<>
				<h3>{_.capitalize(potion_or_oil)} of {spell.name}</h3>
				<div><strong>Caster Level</strong> {caster_level}</div>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
				<SpellDescription spell={spell} />
			</>
		)
	}

	const renderFalseDesc = () => {
		return (
			<>
				<h3>Strange Mysterious Liquid</h3>
			</>
		)
	}

	return (
		<aside>
			{known ? renderPotion() : renderFalseDesc()}
		</aside>
	)

}

export default PotionDescription
