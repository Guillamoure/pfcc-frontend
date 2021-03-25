import React from 'react'
import _ from 'lodash'

import SpellDescription from '../spell_description'


const WandDescription = props => {

	const { known, caster_level, charges, spell, name, description } = props.cw

	const renderWand = () => {
		let displayName = `Wand of ${spell.name}`
		if (name){
			displayName = <span>{name}<em> ({displayName})</em></span>
		}
		return (
			<>
				<h3>{displayName}</h3>
				<div><strong>Caster Level</strong> {caster_level} | <strong>Charges</strong> {charges}/50</div>
				<div>{description}</div>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
				<SpellDescription spell={spell} />
			</>
		)
	}

	const renderFalseDesc = () => {
		return (
			<>
				<h3>Unknown Mystical Wand</h3>
			</>
		)
	}

	return (
		<aside>
			{known ? renderWand() : renderFalseDesc()}
		</aside>
	)

}

export default WandDescription
