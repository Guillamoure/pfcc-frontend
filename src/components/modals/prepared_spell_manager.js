import React from 'react'
import { useSelector } from 'react-redux'
import SpellDescription from '../spell_description'
import { remainingPreparedSpellsArray, spellsPerDayArray } from '../../helper_functions/calculations/spellcasting'
import { abilityScoreMod } from '../../helper_functions/calculations/ability_scores'
import { getFetch, postFetch, deleteFetch } from '../../helper_functions/fetches'
import { replaceCharacterAction } from '../../helper_functions/action_creator/character'

const PreparedSpellManager = props => {

	let { prepared_spells: preparedSpells, id } = useSelector(state => state.character)

	const [displayButton, toggleDisplayButton] = React.useState("All")
	const [filterInput, updateFilter] = React.useState("")
	const [spells, updateSpells] = React.useState([])
	const [spellId, updateSpellId] = React.useState(0)
	const [spellListId, updateSpellListId] = React.useState(0)
	const [featureSpellcasting, updateFeatureSpellcasting] = React.useState({})
	const [dragInfo, updateDragInfo] = React.useState({
		preparedSpellId: 0,
		spellListSpellId: 0,
		spellId: 0,
		spellLevel: null,
		dragging: false
	})



	React.useEffect(() => {
		const { spellcasting } = props.spellcastingData

		if (!spellcasting.known_spell_list){
			getFetch(`spells?spell_list_id=${spellcasting.spell_list.id}`)
			.then(data => {
				let mutatedData = data.map(spell => {
					return {...spell, spell_level: spell.spell_list_spells.find(sls => sls.spell_list.id === spellcasting.spell_list.id).spell_level}
				})
				let sortedData = []
				for(let i = 0; i < 10; i++){
					let thisLvl = mutatedData.filter(sp => sp.spell_level === i)
					sortedData.push(thisLvl.sort((a,b) => a.name.localeCompare(b.name)))
				}
				sortedData = sortedData.flat()
				console.log(sortedData)
				updateSpells(sortedData)
				updateSpellListId(spellcasting.spell_list.id)
				updateFeatureSpellcasting(spellcasting)
			})
		}
	}, [])

	const updateDrag = (spellListSpellId, spellId, spellLevel) => {
		updateDragInfo({...dragInfo, spellListSpellId, spellId, spellLevel, dragging: true})
	}

	const resetDrag = e => {
		e.preventDefault()
		updateDragInfo({
			spellListSpellId: 0,
			spellId: 0,
			spellLevel: null,
			dragging: false
		})
	}

	const updateDrop = e => {
		e.preventDefault()

		console.log(dragInfo)
		let body = {
			spell_list_spell_id: dragInfo.spellListSpellId,
			feature_spellcasting_id: featureSpellcasting.id,
			character_id: id,
			spell_level: dragInfo.spellLevel
		}
		// if (character_known_spells.find(ks => ks.spell.id === dragInfo.spellId)){
		// 	// if spell is already known
		// 	let spellName = character_known_spells.find(ks => ks.spell.id === dragInfo.spellId).spell.name
		// 	updateWarning(`You already know ${spellName}`)
		// } else {
		// 	// if spell is not known
		postFetch('prepared_spells', body)
		.then(data => {
			if (data.errors) {
				// updateWarning(data.errors[0])
			} else {
				let spell = spells.find(sp => sp.id === dragInfo.spellId)
				let spellListSpell = spell.spell_list_spells.find(sls => sls.id === dragInfo.spellListSpellId)
				let characterPreparedSpell = {
					id: data.id,
					spell,
					spell_list_spell: spellListSpell,
					feature_spellcasting_id: featureSpellcasting.id,
					spell_level: dragInfo.spellLevel,
					cast: false
				}
				let replacePreparedSpells = [...preparedSpells]
				replacePreparedSpells.push(characterPreparedSpell)
				preparedSpells.push(characterPreparedSpell)
				replaceCharacterAction('prepared_spells', replacePreparedSpells)
			}
		})
		updateDragInfo({
			spellListSpellId: 0,
			spellId: 0,
			spellLevel: null,
			dragging: false
		})
	}

	const removeCharacterPreparedSpell = preparedSpellId => {
		deleteFetch(`prepared_spells/${preparedSpellId}`)
			.then(data => {
				let replacePreparedSpells = [...preparedSpells].filter(ps => ps.id !== preparedSpellId)
				preparedSpells = preparedSpells.filter(ps => ps.id !== preparedSpellId)
				replaceCharacterAction('prepared_spells', replacePreparedSpells)
			})
	}

	const renderPreparedSpells = () => {
		// render buttons, that flash
		// render known spells, and missing spells
		const { level, spellcasting } = props.spellcastingData

		let preparedSpellsPerDay = spellsPerDayArray(spellcasting, level)
		let remainingPreparedSpells = remainingPreparedSpellsArray(spellcasting, level)
		let buttons = remainingPreparedSpells.map(ks => {
			let className = ""
			if (ks.spells > 0){className='attention-button-animation'}

			return <button className={className} onClick={() => toggleDisplayButton(ks.spell_level)}>{ks.spell_level}</button>
		})
		buttons.unshift(<button onClick={() => toggleDisplayButton("All")}>All</button>)

		preparedSpellsPerDay = preparedSpellsPerDay.map(pspd => {
			let abilityScoreModifier = abilityScoreMod(spellcasting.ability_score)
			let increase = 0
			if (pspd.spell_level <= abilityScoreModifier){increase = 1}
			return {...pspd, spells: pspd.spells + increase}
		})

		let allPreparedSpells = []
		preparedSpellsPerDay.forEach(ps => {
			let num = ps.spells
			let thisLevelPreparedSpells = preparedSpells.filter(cps => cps.spell_level === ps.spell_level)
			num -= thisLevelPreparedSpells.length
			thisLevelPreparedSpells.forEach(tlps => allPreparedSpells.push({spellLevel: ps.spell_level, spellName: tlps.spell.name, spellId: tlps.spell.id, preparedSpellId: tlps.id}))

			for (let i = 0; i < num; i++){
				allPreparedSpells.push({spellLevel: ps.spell_level, spellName: "", spellId: 0, preparedSpellId: 0})
			}
		})

		if (displayButton !== "All"){
			allPreparedSpells = allPreparedSpells.filter(ps => parseInt(displayButton) === ps.spellLevel)
		}
		let preparedSpellsListItems = allPreparedSpells.map(sp => {
			return (
				<tr>
					<td>{sp.spellLevel}</td>
					<td><em className='underline-hover' onClick={() => updateSpellId(sp.spellId)}>{sp.spellName}</em></td>
					<td>{!!sp.preparedSpellId && <button style={{color: "white", background: "red", fontSize: "0.9rem", border: "1px solid black", textAlign: "right", borderRadius: "6px"}} onClick={() => removeCharacterPreparedSpell(sp.preparedSpellId)}>Remove</button>}</td>
				</tr>
			)
		})

		let style = {gridArea: "known", overflowY: "scroll", position: "relative", border: "2px solid transparent"}
		if (dragInfo.dragging){
			style.border = "2px dashed black"
		}

		return (
			<aside style={style} onDrop={updateDrop} onDragOver={e => e.preventDefault()}>
				{buttons}
				<table>
					<thead>
						<tr>
							<th>Lvl</th>
							<th>Name</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						{preparedSpellsListItems}
					</tbody>
				</table>
			</aside>
		)
	}

	const renderSpellOptions = () => {
		const { level } = props.spellcastingData

		let filteredSpells = spells.filter(sp => {
			let input = filterInput.toLowerCase()
			let spellName = sp.name.toLowerCase()
			return spellName.includes(input)
		})

		let preparedSpellsIDs = preparedSpells.map(ps => ps.spell.id)


		let nodeSpells = filteredSpells.map(sp => {
			let className = sp.spell_level > level ? "mobile-active-tab" : ""
			if (preparedSpellsIDs.includes(sp.id)){className = "mobile-active-tab"}
			let spellListSpellId = sp.spell_list_spells.find(sls => sls.spell_list.id === spellListId)?.id
			return (
				<tr className={className}>
					<td>{sp.spell_level}</td>
					<td draggable="true" onDragStart={() => updateDrag(spellListSpellId, sp.id, sp.spell_level)} onDragEnd={resetDrag}><em className='underline-hover' onClick={() => updateSpellId(sp.id)}>{sp.name}</em></td>
				</tr>
			)
		})
		return (
			<aside style={{gridArea: "all-spells", maxHeight: '100%', overflowY: 'scroll', margin: "5px"}}>
				<label htmlFor="spell-filter">Filter Spells</label>
				<input name="spell-filter" id="spell-filter" type="text" value={filterInput} onChange={e => updateFilter(e.target.value)}/>
				<table>
					<thead>
						<tr>
							<th>Lvl</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{nodeSpells}
					</tbody>
				</table>
			</aside>
		)
	}

	const renderSpellDescription = () => {
		if (!spellId || !spells.length){
			return <aside style={{gridArea: "spell-description", display: "flex", justifyContent: "center", margin: "auto"}}><strong>Click on a spell to see details</strong></aside>
		}
		let spell = spells.find(sp => sp.id === spellId)

		return (
			<aside style={{gridArea: "spell-description", textAlign: "left", overflowY: "scroll"}}>
				<SpellDescription spell={spell} />
			</aside>
		)
	}

	return (
		<section id="known-spells-popup">
			{renderPreparedSpells()}
			{renderSpellOptions()}
			{renderSpellDescription()}
		</section>
	)
}

export default PreparedSpellManager
