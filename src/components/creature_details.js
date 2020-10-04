import React from 'react'
import * as CreatureCalc from '../helper_functions/calculations/creatures'

const CreatureDetails = props => {

	const [creature, setCreature] = React.useState(null)

	React.useEffect(() => {
		if (props.creature){setCreature(props.creature)}
	}, [])

	const renderCreature = () => {
		if (creature){
			console.log(creature)
			return (
				<article id="creature-details">
					<h3><span>{creature.name}</span>CR {CreatureCalc.crCalc(creature.challenge_rating)}</h3>
					<h4>XP {CreatureCalc.crXPCalc(creature.challenge_rating)}</h4>
					<p>{creature.alignment[0].toUpperCase()} {creature.size} {creature.creature_type.name}</p>
					<p>INSERT INITIATIVE AND SENSES</p>

					<p className="creature-header"><strong>DEFENSE</strong></p>

					<p><strong>AC</strong></p>
					<p><strong>hp</strong> {CreatureCalc.averageHP(creature.hit_dice, creature.creature_type.hit_die, creature.constitution)}</p>
				</article>
			)
		}
	}

	return (
		<>
			{renderCreature()}
		</>
	)
}

export default CreatureDetails
