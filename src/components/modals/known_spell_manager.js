import React from 'react'
import { useSelector } from 'react-redux'
import SpellDescription from '../spell_description'
import { remainingKnownSpellsArray, knownSpellsArray } from '../../helper_functions/calculations/spellcasting'
import { getFetch, postFetch } from '../../helper_functions/fetches'
import { replaceCharacterAction } from '../../helper_functions/action_creator/character'

const KnownSpellManager = props => {

	const { character_known_spells, id } = useSelector(state => state.character)

	const [displayButton, toggleDisplayButton] = React.useState("All")
	const [spells, updateSpells] = React.useState([])
	const [filterInput, updateFilter] = React.useState("")
	const [spellId, updateSpellId] = React.useState(0)
	const [dragInfo, updateDragInfo] = React.useState({
		spellListSpellId: 0,
		spellId: 0,
		dragging: false
	})
	const [spellListId, updateSpellListId] = React.useState(0)
	const [featureSpellcasting, updateFeatureSpellcasting] = React.useState({})
	const [warning, updateWarning] = React.useState(null)

	React.useEffect(() => {
		let spellcasting
		props.spellcastingData.klassFeature.features.forEach(f => spellcasting = f.spellcasting || spellcasting)

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
				updateSpells(sortedData)
				updateSpellListId(spellcasting.spell_list.id)
				updateFeatureSpellcasting(spellcasting)
			})
	}, [])

	const updateDrag = (spellListSpellId, spellId) => {
		updateDragInfo({...dragInfo, spellListSpellId, spellId, dragging: true})
	}

	const updateDrop = e => {
		e.preventDefault()
		console.log("first")
		let body = {
			spell_list_spell_id: dragInfo.spellListSpellId,
			feature_spellcasting_id: featureSpellcasting.id,
			character_id: id
		}
		if (character_known_spells.find(ks => ks.spell.id === dragInfo.spellId)){
			// if spell is already known
			let spellName = character_known_spells.find(ks => ks.spell.id === dragInfo.spellId).spell.name
			updateWarning(`You already know ${spellName}`)
		} else {
			// if spell is not known
			postFetch('known_spells', body)
			.then(data => {
				let spell = spells.find(sp => sp.id === dragInfo.spellId)
				let spellListSpell = spell.spell_list_spells.find(sls => sls.id === dragInfo.spellListSpellId)
				let characterKnownSpell = {
					id: null,
					spell,
					spell_list_spell: spellListSpell,
					spellcasting: featureSpellcasting
				}
				let replaceCharacterKnownSpells = [...character_known_spells]
				replaceCharacterKnownSpells.push(characterKnownSpell)
				character_known_spells.push(characterKnownSpell)
				replaceCharacterAction('character_known_spells', replaceCharacterKnownSpells)
			})
		}
		updateDragInfo({
			spellListSpellId: 0,
			spellId: 0,
			dragging: false
		})
	}

	const resetDrag = e => {
		e.preventDefault()
		updateDragInfo({
			spellListSpellId: 0,
			spellId: 0,
			dragging: false
		})
	}


	const renderKnownSpells = () => {
		// render buttons, that flash
		// render known spells, and missing spells
		const { klassFeature, level } = props.spellcastingData

		let knownSpells = knownSpellsArray(klassFeature, level)
		let remainingKnownSpells = remainingKnownSpellsArray(klassFeature, level)
		let buttons = remainingKnownSpells.map(ks => {
			let className = ""
			if (ks.spells > 0){className='attention-button-animation'}

			return <button className={className} onClick={() => toggleDisplayButton(ks.spell_level)}>{ks.spell_level}</button>
		})
		let allKnownSpells = []
		knownSpells.forEach(ks => {
			let num = ks.spells
			let thisLevelKnownSpells = character_known_spells.filter(cks => cks.spell_list_spell.spell_level === ks.spell_level)
			num -= thisLevelKnownSpells.length
			thisLevelKnownSpells.forEach(tlks => allKnownSpells.push({spellLevel: ks.spell_level, spellName: tlks.spell.name, spellId: tlks.spell.id}))
			for (let i = 0; i < num; i++){
				allKnownSpells.push({spellLevel: ks.spell_level, spellName: "", spellId: 0})
			}
		})
		buttons.unshift(<button onClick={() => toggleDisplayButton("All")}>All</button>)

		if (displayButton !== "All"){
			allKnownSpells = allKnownSpells.filter(ks => parseInt(displayButton) === ks.spellLevel)
		}
		let knownSpellsListItems = allKnownSpells.map(sp => {
			return (
				<tr>
					<td>{sp.spellLevel}</td>
					<td><em className='underline-hover' onClick={() => updateSpellId(sp.spellId)}>{sp.spellName}</em></td>
				</tr>
			)
		})

		// display all known spells by spell level
		// if there is a spell missing, have a gap
		let style = {gridArea: "known", overflowY: "scroll"}
		if (dragInfo.dragging){
			style.border = "1px dashed black"
		}
		return (
			<aside style={style} onDrop={updateDrop} onDragOver={e => e.preventDefault()}>
				{buttons}
				<table>
					<thead>
						<tr>
							<th>Lvl</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{knownSpellsListItems}
					</tbody>
				</table>
			</aside>
		)
	}

	const renderSpellOptions = () => {
		const { klassFeature, level } = props.spellcastingData

		let filteredSpells = spells.filter(sp => {
			let input = filterInput.toLowerCase()
			let spellName = sp.name.toLowerCase()
			return spellName.includes(input)
		})

		let knownSpellsIDs = character_known_spells.map(ks => ks.spell.id)


		let nodeSpells = filteredSpells.map(sp => {
			let className = sp.spell_level > level ? "mobile-active-tab" : ""
			if (knownSpellsIDs.includes(sp.id)){className = "mobile-active-tab"}
			let spellListSpellId = sp.spell_list_spells.find(sls => sls.spell_list.id === spellListId)?.id
			return (
				<tr className={className}>
					<td>{sp.spell_level}</td>
					<td draggable="true" onDragStart={() => updateDrag(spellListSpellId, sp.id)} onDragEnd={resetDrag}><em className='underline-hover' onClick={() => updateSpellId(sp.id)}>{sp.name}</em></td>
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

	const renderWarning = () => {
		if (warning){
			setTimeout(() => {
				updateWarning(null)
			}, 3000)
			return (
				<div style={{position: "fixed", zIndex: "1001", top: "45%", left: "40%", color: "white", background: "black", padding: "20px", width: "20%"}}>
				{warning}
				</div>
			)
		} else {return null}
	}


	return (
		<section id="known-spells-popup">
			{renderKnownSpells()}
			{renderSpellOptions()}
			{renderSpellDescription()}
			{renderWarning()}
		</section>
	)
}

export default KnownSpellManager
