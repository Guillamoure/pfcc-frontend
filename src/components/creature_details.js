import React from 'react'
import * as CreatureCalc from '../helper_functions/calculations/creatures'
import * as SizeCalc from '../helper_functions/calculations/size'
import * as CreatureFeaturesCalc from '../helper_functions/calculations/creature_features'

const CreatureDetails = props => {

	const [creature, setCreature] = React.useState(null)

	React.useEffect(() => {
		if (props.creature){
			let parsedCreature = CreatureFeaturesCalc.calculateCreatureInfo(props.creature)
			setCreature(parsedCreature)
		}
	}, [])

	const renderCreature = () => {
		if (creature){
			console.log(creature)
			let hitDice = creature.hit_dice
			let fortitude = CreatureCalc.savingThrow(creature.creature_type.fortitude, creature.constitution, hitDice)
			let reflex = CreatureCalc.savingThrow(creature.creature_type.reflex, creature.dexterity, hitDice)
			let will = CreatureCalc.savingThrow(creature.creature_type.will, creature.wisdom, hitDice)
			let armorClass = CreatureCalc.armorClassTotal(creature)
			let armorClassModsString = CreatureCalc.acModsString(creature)
			return (
				<article id="creature-details">
					<h3><span>{creature.name}</span>CR {CreatureCalc.crCalc(creature.challenge_rating)}</h3>
					<h4>XP {CreatureCalc.crXPCalc(creature.challenge_rating)}</h4>
					<p>{creature.alignment[0].toUpperCase()} {creature.size} {creature.creature_type.name}</p>
					<p><strong>Init:</strong> {CreatureCalc.renderInitiative(creature)}; <strong>Senses</strong> INSERT SENSES; Perception INSERT PERCEPTION</p>

					<p className="creature-header"><strong>DEFENSE</strong></p>

					<p><strong>AC</strong> {armorClass.armorClass}, touch {armorClass.touch}, flat-footed {armorClass.flatFooted} {armorClassModsString}</p>
					<p><strong>hp</strong> {CreatureCalc.averageHP(hitDice, creature.creature_type.hit_die, creature.constitution)}</p>
					<p><strong>Fort</strong> {fortitude}, <strong>Ref</strong> {reflex}, <strong>Will</strong> {will}</p>

					<p className="creature-header"><strong>OFFENSE</strong></p>

					<p>INSERT SPEED</p>
					{CreatureCalc.renderAttacks(creature, "Melee")}
					<p>INSERT RANGED</p>
					<p><strong>Space</strong> {SizeCalc.sizeSpaceReach(creature.size)[0]}; <strong>Reach</strong> {SizeCalc.sizeSpaceReach(creature.size)[1]}</p>

					<p className="creature-header"><strong>OFFENSE</strong></p>

					<p><strong>Str</strong> {creature.strength}, <strong>Dex</strong> {creature.dexterity}, <strong>Con</strong> {creature.constitution}, <strong>Int</strong> {creature.intelligence}, <strong>Wis</strong> {creature.wisdom}, <strong>Cha</strong> {creature.charisma}</p>
					<p><strong>Base Atk</strong> {CreatureCalc.babString(hitDice, creature.creature_type.hit_die)}; <strong>CMB</strong> {CreatureCalc.cmbString(creature)}; <strong>CMD</strong> {CreatureCalc.cmd(creature)}</p>
					<p><strong>Feats</strong> {CreatureCalc.renderFeats(creature.feats)}</p>
					<p><strong>Skills</strong> INSERT SKILLS; <strong>Racial Modifiers</strong> INSERT RACIAL MODIFIERS</p>

					<p className="creature-header"><strong>OFFENSE</strong></p>

					<p><strong>Environment</strong> INSERT ENVIRONMENT</p>
					<p><strong>Organization</strong> INSERT ORGANIZATION</p>
					<p><strong>Treasure</strong> INSERT TREASURE</p>
					<br/>
					<p>{creature.description}</p>
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
