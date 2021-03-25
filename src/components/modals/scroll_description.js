import React from 'react'
import _ from 'lodash'

import SpellDescription from '../spell_description'


const ScrollDescription = props => {

	const { known, spell_level, scroll_type, spell } = props.cs

	const renderScroll = () => {
		return (
			<>
				<h3>Scroll of {spell.name}</h3>
				<div><strong>Spell Level</strong> {spell_level} | <strong>Scroll Type</strong> {scroll_type}</div>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
				<SpellDescription spell={spell} />
			</>
		)
	}

	const renderFalseDesc = () => {
		let description = "Unknown scroll of mysterious equations and formulae..."
		if (scroll_type === "divine"){
			description = "Unknown scroll with esoteric words and mantras..."
		} else if (scroll_type === "psychic"){
			description = "Unknown scroll of memories forgotten and beliefs fading..."
		}
		return (
			<>
				<h3>{description}</h3>
			</>
		)
	}

	return (
		<aside>
			{known ? renderScroll() : renderFalseDesc()}
		</aside>
	)

}

export default ScrollDescription
