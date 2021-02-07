import React from 'react'
import { useSelector } from 'react-redux'
import { mod, pluser } from '../../utils/fuf'

const AbilityScores = props => {

	const { layout, colorTheme } = useSelector(state => state.settings)

	const renderScores = () => {
		const { strength, dexterity, constitution, intelligence, wisdom, charisma } = props.character
		let arr = [{name: "Strength", score: strength}, {name: "Dexterity", score: dexterity}, {name: "Constitution", score: constitution}, {name: "Intelligence", score: intelligence}, {name: "Wisdom", score: wisdom}, {name: "Charisma", score: charisma}]

		return (
			<>
				<>
					<span>Ability Name</span>
					<span>Ability Score</span>
					<span>Ability Modifier</span>
					<span>Temp Adjustment</span>
					<span>Temp Modifier</span>
				</>
				{arr.map(renderAbilityScore)}
			</>
		)
	}

	const renderAbilityScore = (obj) => {
		const { name, score } = obj
		let abbrev = name.substring(0, 3).toUpperCase()
		let modifier = pluser(mod(score))
		let tempAdjustment = 0
		let tempModifier = pluser(mod(score + tempAdjustment)) !== modifier ? pluser(mod(score + tempAdjustment)) : ""
		return (
			<>
				<span>{abbrev}</span>
				<span>{score}</span>
				<span>{modifier}</span>
				<span>{tempAdjustment !== 0 ? tempAdjustment : ""}</span>
				<span>{tempModifier}</span>
			</>
		)
	}

	return (
		<section id="character-details-ability-scores" className="section-background">
			{renderScores()}
		</section>
	)
}

export default AbilityScores
