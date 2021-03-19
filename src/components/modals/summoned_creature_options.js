import React from 'react'
import { useSelector } from 'react-redux'
import { crCalc } from '../../utils/calculations/creatures'
import { modalAction } from '../../utils/action_creator/popups'
import { replaceCharacterInfoAction } from '../../utils/action_creator/character'

const SummonedCreatureOptions = props => {

	const { character, character_info } = useSelector(state => state)

	const renderDescription = () => {
		return <p>All summoned creatures are conjured with a template that reflect your alignment. Please summon a creature with a Celestial (Good), Fiendish (Evil), Entropic (Chaotic), or Resolute (Lawful) template.</p>
	}

	const displayCreatures = () => {
		let sortedCreaturesByStep = props.featureAnimal.summoned_creature_list.sort((a, b) => a.step - b.step)
		let tableElementsCreatures = sortedCreaturesByStep.map(c => {
			let creature = c.creature
			return (
				<tr>
					<td className="underline-hover" onClick={() => modalAction("statBlock", creature, {name: creature.name})}>{creature.name}</td>
					<td>{crCalc(creature.challenge_rating)}</td>
					<td>{c.step}</td>
					<td><button onClick={() => renderSummon(creature, "celestial")}>Summon</button></td>
					<td><button onClick={() => renderSummon(creature, "fiendish")}>Summon</button></td>
					<td><button onClick={() => renderSummon(creature, "entropic")}>Summon</button></td>
					<td><button onClick={() => renderSummon(creature, "resolute")}>Summon</button></td>
				</tr>
			)
		})

		return (
			<table>
				<thead>
					<tr>
						<th>Creature</th>
						<th>CR</th>
						<th><em>summon monster</em></th>
						<th className="underline-hover" onClick={() => modalDetails("celestial")}>Celestial</th>
						<th className="underline-hover" onClick={() => modalDetails("fiendish")}>Fiendish</th>
						<th className="underline-hover" onClick={() => modalDetails("entropic")}>Entropic</th>
						<th className="underline-hover" onClick={() => modalDetails("resolute")}>Resolute</th>
					</tr>
				</thead>
				<tbody>
					{tableElementsCreatures}
				</tbody>
			</table>
		)
	}

	const renderSummon = (creature, template) => {
		let augmentSummoning = false
		if (character.name === "Ildre"){
			augmentSummoning = true
		}
		let duplicateArr = [...character_info.summonedAllies]
		duplicateArr.push({creature, augmentSummoning, template})

		replaceCharacterInfoAction("summonedAllies", duplicateArr)
	}

	const modalDetails = (template) => {
		let obj = {}
		obj.description = templateDescriptions[template]
		switch (template){
			case "celestial":
				obj.name = "Celestial Template"
				break
			case "fiendish":
				obj.name = "Fiendish Template"
				break
			case "entropic":
				obj.name = "Entropic Template"
				break
			case "resolute":
				obj.name = "Resolute Template"
				break
			default:
				obj.name = ""
		}
		modalAction("templateDescription", obj)
	}

	let templateDescriptions = {
		celestial: "Celestial creatures dwell in the higher planes, but can be summoned using spells such as summon monster and planar ally.\n\nA celestial creature’s CR increases by +1 only if the base creature has 5 or more HD.\n\nRebuild Rules\n\nSenses: The creature gains darkvision 60 ft.\n\nDefensive Abilities: The creature gains damage reduction and energy resistance as noted on the below table.\n\nSR: The creature gains spell resistance equal to its new CR +5.\n\nSpecial Attacks: The creature may smite evil 1/day as a swift action (it adds its Cha bonus to attack rolls, and a damage bonus equal to its HD against evil foes; smite persists until the target is dead or the creature rests).\n\n<table><thead><tr><th>Hit Dice</th><th>Resist Cold, Acid, and Electricity</th><th>DR</th></tr></thead></tbody><tr><td>1-4</td><td>5</td><td>-</td></tr><tr><td>5-10</td><td>10</td><td>5/evil</td></tr><tr><td>11+</td><td>15</td><td>10/evil</td></tr></tbody></table>",
		fiendish: "Creatures with the fiendish template live in the Lower Planes, such as the Abyss and Hell, but can be summoned using spells such as summon monster and planar ally. A fiendish creature’s CR increases by +1 only if the base creature has 5 or more HD.\n\nRebuild Rules\n\nSenses: The creature gains darkvision 60 ft.\n\nDefensive Abilities: The creature gains damage reduction and energy resistance as noted on the below table.\n\nSR: The creature gains spell resistance equal to its new CR +5.\n\nSpecial Attacks: The creature may smite good 1/day as a swift action (it adds its Cha bonus to attack rolls, and a damage bonus equal to its HD against good foes; smite persists until the target is dead or the creature rests).\n\n<table><thead><tr><th>Hit Dice</th><th>Resist Cold and Fire</th><th>DR</th></tr></thead></tbody><tr><td>1-4</td><td>5</td><td>-</td></tr><tr><td>5-10</td><td>10</td><td>5/good</td></tr><tr><td>11+</td><td>15</td><td>10/good</td></tr></tbody></table>",
		entropic: "Creatures with the entropic template live in planes where chaos is paramount. They can be summoned using spells such as summon monster and planar ally. An entropic creature’s CR increases by +1 only if the base creature has 5 or more HD.\n\nRebuild Rules\n\nSenses: The creature gains darkvision 60 ft.\n\nDefensive Abilities: The creature gains damage reduction and energy resistance as noted on the below table.\n\nSR: The creature gains spell resistance equal to its new CR +5.\n\nSpecial Attacks: The creature may smite law 1/day as a swift action (it adds its Cha bonus to attack rolls, and a damage bonus equal to its HD against law foes; smite persists until the target is dead or the creature rests).\n\n<table><thead><tr><th>Hit Dice</th><th>Resist Acid and Fire</th><th>DR</th></tr></thead></tbody><tr><td>1-4</td><td>5</td><td>-</td></tr><tr><td>5-10</td><td>10</td><td>5/lawful</td></tr><tr><td>11+</td><td>15</td><td>10/lawful</td></tr></tbody></table>",
		resolute: "Creatures with the resolute template live in planes where law is paramount. They can be summoned using spells such as summon monster and planar ally. A resolute Creature’s CR increases by +1 only if the base Creature has 5 or more HD.\n\nRebuild Rules\n\nSenses: The creature gains darkvision 60 ft.\n\nDefensive Abilities: The creature gains damage reduction and energy resistance as noted on the below table.\n\nSR: The creature gains spell resistance equal to its new CR +5.\n\nSpecial Attacks: The creature may smite chaos 1/day as a swift action (it adds its Cha bonus to attack rolls, and a damage bonus equal to its HD against chaotic foes; smite persists until the target is dead or the creature rests).\n\n<table><thead><tr><th>Hit Dice</th><th>Resist Acid and Fire</th><th>DR</th></tr></thead></tbody><tr><td>1-4</td><td>5</td><td>-</td></tr><tr><td>5-10</td><td>10</td><td>5/chaotic</td></tr><tr><td>11+</td><td>15</td><td>10/chaotic</td></tr></tbody></table>",
	}

	return (
		<section>
			{renderDescription()}
			{displayCreatures()}
		</section>
	)
}

export default SummonedCreatureOptions
