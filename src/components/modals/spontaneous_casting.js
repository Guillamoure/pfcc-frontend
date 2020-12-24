import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { getFetch, postFetch } from '../../helper_functions/fetches'
import { availableCastableSpellLevelsThroughKlassId } from '../../helper_functions/calculations/spellcasting'
import { renderTH } from '../../helper_functions/fuf'
import { replaceCharacterAction, triggerTurnActionAction } from '../../helper_functions/action_creator/character'
import { isThisActionAvailable, actionClass } from '../../helper_functions/calculations/round_actions'
import SpellDescription from '../spell_description'

const SpontaneousCasting = props => {

	const { character } = useSelector(state => state)
	const [spells, setSpells] = React.useState([])
	const [chosenStatus, updateChosenStatus] = React.useState(true)
	const [lostPreparedSpellId, setLostPreparedSpellId] = React.useState(0)
	const [spontaneousSpellId, setSpontaneousSpellId] = React.useState(0)

	React.useEffect(() => {
		if (chosenStatus){
			let characterChoice = null
			if (props.feature.spontaneous_castings[0].player_choice){

				characterChoice = character.character_choices.find(ccc => ccc.feature_id === props.feature.id)
				let options = _.uniqBy(props.feature.spontaneous_castings, 'keyword').map(sc => sc.keyword)

				if (!characterChoice || !options.includes(characterChoice.choice)){
					updateChosenStatus(false)
					return
				}
			}
			let spd = availableCastableSpellLevelsThroughKlassId(props.feature.klassId)
			props.feature.spontaneous_castings.forEach(sp => {
				if (characterChoice && characterChoice?.choice !== sp.keyword){return null}
				if (spd.includes(sp.spell_level)){
					getFetch(`spells/${sp.spell_id}`)
						.then(data => {
							let spellsCopy = [...spells]
							spellsCopy.push({...data.spell, spell_level: sp.spell_level})
							setSpells(spellsCopy)
						})
				}
			})

		}

	}, [props.feature, chosenStatus])

	const renderClick = (isThisSpellSpontaneous, id) => {
		if (isThisSpellSpontaneous){
			let newID = spontaneousSpellId === id ? 0 : id
			setSpontaneousSpellId(newID)
		} else if (!isThisSpellSpontaneous){
			let newID = lostPreparedSpellId === id ? 0 : id
			setLostPreparedSpellId(newID)
		}
	}

	const renderSpells = (array, spontaneousSpells) => {
		let spellNodes = array.map(sp => {
			let name = sp.name.toLowerCase()
			if ((spontaneousSpells && spontaneousSpellId === sp.id) || (!spontaneousSpells && lostPreparedSpellId === sp.preparedSpellId)){
				name = <strong>{name}</strong>
			}
			let id = spontaneousSpells ? sp.id : sp.preparedSpellId
			return (
				<tr>
					<td>{sp.spell_level}</td>
					<td className={isThisActionAvailable(sp)}>{sp.action.name}</td>
					<td><button onClick={() => renderClick(spontaneousSpells, id)}><em>{name}</em></button></td>
				</tr>
			)
		})
		if (!spellNodes.length) {
			return <p>You have no available prepared spells that you can expend.</p>
		}
		let header = spontaneousSpells ? "Available Spontaneous Spells" : "Prepared Spells"
		return (
			<table style={{width: "48%", margin: "1%"}}>
				<thead>
					<tr><th colspan="2">{header}</th></tr>
					<tr>
						<th>Lvl</th>
						<th>Action</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{spellNodes}
				</tbody>
			</table>
		)
	}

	const renderSpontaneousSpellSummary = () => {
		if (spontaneousSpellId){
			let spell = spells.find(sp => spontaneousSpellId === sp.id)
			return <SpellDescription spell={spell} />
		}
	}

	const castSpell = () => {
		postFetch(`cast_spells`, {id: lostPreparedSpellId, expend: true})
			.then(data => {
				let replacePreparedSpells = [...character.prepared_spells]
				replacePreparedSpells = replacePreparedSpells.map(ps => {
					if (ps.id === lostPreparedSpellId){
						return {...ps, cast: true}
					}
					return ps
				})
				let spontaneousSpell = spells.find(sp => spontaneousSpellId === sp.id)
				setLostPreparedSpellId(0)
				replaceCharacterAction('prepared_spells', replacePreparedSpells)
				triggerTurnActionAction(actionClass(spontaneousSpell.action.name))
				props.exitModal()
			})
	}

	const formattedPreparedSpells = character.prepared_spells.filter(sp => !sp.cast && sp.spell_level > 0).map(sp => ({...sp.spell, spell_level: sp.spell_level, preparedSpellId: sp.id}))

	const renderSpellSelection = () => {
		if (!lostPreparedSpellId || !spontaneousSpellId){return null}

		let spontaneous = spells.find(sp => spontaneousSpellId === sp.id)
		let prepared = formattedPreparedSpells.find(sp => lostPreparedSpellId === sp.preparedSpellId)
		if (isThisActionAvailable(spontaneous) === "cannot-cast") {return <p>You cannot cast this spell because you don't can't use a <strong>{spontaneous.action.name}</strong> right now.</p>}
		return (
			<>
				<p>You are casting <em><strong>{spontaneous.name}</strong></em> at {renderTH(spontaneous.spell_level)} level by expending <em><strong>{prepared.name}</strong></em></p>
				<p>You must expend a prepared spell of the same or higher level to cast this spell. {prepared.name} is a <strong>{renderTH(prepared.spell_level)}-level</strong> spell.</p>
				<button onClick={castSpell}>Cast {spontaneous.name}</button>
			</>
		)
	}

	return (
		<>
			<h3>Spontaneous Casting</h3>
			{!chosenStatus && <h3>You have not chosen a category of Spontaneous Casting. Please go to the menu and choose, and try again.</h3>}
			<section style={{display: "flex"}}>
				{chosenStatus && renderSpells(spells, true)}
				{chosenStatus && renderSpells(formattedPreparedSpells, false)}
			</section>
			{renderSpontaneousSpellSummary()}
			{renderSpellSelection()}
		</>
	)
}

export default SpontaneousCasting
