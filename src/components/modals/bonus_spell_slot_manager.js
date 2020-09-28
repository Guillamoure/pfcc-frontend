import React from 'react'
import { useSelector } from 'react-redux'
import SpellDescription from '../spell_description'
import { bonusSpellSlotOptions, knownSpellsArray } from '../../helper_functions/calculations/spellcasting'


const BonusSpellSlotManager = props => {

	let { prepared_spells, id } = useSelector(state => state.character)

	const [spells, updateSpells] = React.useState([])
	const [filterInput, updateFilter] = React.useState("")
	const [spellId, updateSpellId] = React.useState(0)
	const [dragInfo, updateDragInfo] = React.useState({
		characterKlassSpellId: 0,
		spellId: 0,
		dragging: false
	})
	const [featureSpellcasting, updateFeatureSpellcasting] = React.useState({})


	React.useEffect(() => {
		const { level, spellcasting } = props.spellcastingData
		updateSpells(bonusSpellSlotOptions(spellcasting, level))
	}, [])

	const updateDrag = (spellId) => {
		updateDragInfo({...dragInfo, spellId, dragging: true})
	}

	const updateDrop = e => {
		e.preventDefault()

		let body = {
			spell_list_spell_id: dragInfo.spellListSpellId,
			feature_spellcasting_id: featureSpellcasting.id,
			character_id: id
		}
		if (prepared_spells.find(ks => ks.spell.id === dragInfo.spellId)){
			// if spell is already known
			let spellName = prepared_spells.find(ks => ks.spell.id === dragInfo.spellId).spell.name
			// updateWarning(`You already know ${spellName}`)
		} else {
			// if spell is not known
			// postFetch('known_spells', body)
			// .then(data => {
			// 	if (data.errors) {
			// 		updateWarning(data.errors[0])
			// 	} else {
			// 		let spell = spells.find(sp => sp.id === dragInfo.spellId)
			// 		let spellListSpell = spell.spell_list_spells.find(sls => sls.id === dragInfo.spellListSpellId)
			// 		let characterKnownSpell = {
			// 			id: data.id,
			// 			spell,
			// 			spell_list_spell: spellListSpell,
			// 			spellcasting: featureSpellcasting
			// 		}
			// 		let replaceCharacterKnownSpells = [...character_known_spells]
			// 		replaceCharacterKnownSpells.push(characterKnownSpell)
			// 		character_known_spells.push(characterKnownSpell)
			// 		replaceCharacterAction('character_known_spells', replaceCharacterKnownSpells)
			// 	}
			// })
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


	const removeCharacterKnownSpell = characterKnownSpellId => {
		// deleteFetch(`known_spells/${characterKnownSpellId}`)
		// 	.then(data => {
		// 		let replaceCharacterKnownSpells = [...character_known_spells].filter(ks => ks.id !== characterKnownSpellId)
		// 		character_known_spells = character_known_spells.filter(ks => ks.id !== characterKnownSpellId)
		// 		replaceCharacterAction('character_known_spells', replaceCharacterKnownSpells)
		// 	})
	}

	const renderKnownSpells = () => {
		// render buttons, that flash
		// render known spells, and missing spells
		const { level, spellcasting } = props.spellcastingData

		let knownSpells = knownSpellsArray(spellcasting, level)
		let allKnownSpells = []
		knownSpells.forEach(ks => {
			let num = ks.spells
			let thisLevelKnownSpells = prepared_spells.filter(cks => cks.spell_list_spell.spell_level === ks.spell_level)
			num -= thisLevelKnownSpells.length
			thisLevelKnownSpells.forEach(tlks => allKnownSpells.push({spellLevel: ks.spell_level, spellName: tlks.spell.name, spellId: tlks.spell.id, characterKnownSpellId: tlks.id}))
			for (let i = 0; i < num; i++){
				allKnownSpells.push({spellLevel: ks.spell_level, spellName: "", spellId: 0, characterKnownSpellId: 0})
			}
		})

		let knownSpellsListItems = allKnownSpells.map(sp => {
			return (
				<tr>
					<td>{sp.spellLevel}</td>
					<td><em className='underline-hover' onClick={() => updateSpellId(sp.spellId)}>{sp.spellName}</em></td>
					<td>{!!sp.characterKnownSpellId && <button style={{color: "white", background: "red", fontSize: "0.9rem", border: "1px solid black", textAlign: "right", borderRadius: "6px"}} onClick={() => removeCharacterKnownSpell(sp.characterKnownSpellId)}>Remove</button>}</td>
				</tr>
			)
		})

		// display all known spells by spell level
		// if there is a spell missing, have a gap

		// UI if adding a spell
		let style = {gridArea: "known", overflowY: "scroll", position: "relative", border: "2px solid transparent"}
		let plusIcon = null
		if (dragInfo.dragging){
			style.border = "2px dashed black"
		}

		return (
			<aside style={style} onDrop={updateDrop} onDragOver={e => e.preventDefault()}>
				{plusIcon}
				<table>
					<thead>
						<tr>
							<th>Lvl</th>
							<th>Name</th>
							<th>Remove</th>
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
		const { level } = props.spellcastingData

		let filteredSpells = spells.filter(sp => {
			let input = filterInput.toLowerCase()
			let spellName = sp.name.toLowerCase()
			return spellName.includes(input)
		})

		let knownSpellsIDs = prepared_spells.map(ks => ks.spell.id)


		let nodeSpells = filteredSpells.map(sp => {
			let className = sp.spell_level > level ? "mobile-active-tab" : ""
			if (knownSpellsIDs.includes(sp.id)){className = "mobile-active-tab"}
			return (
				<tr className={className}>
					<td>{sp.spell_level}</td>
					<td draggable="true" onDragStart={() => updateDrag(sp.id)} onDragEnd={resetDrag}><em className='underline-hover' onClick={() => updateSpellId(sp.id)}>{sp.name}</em></td>
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
			{renderKnownSpells()}
			{renderSpellOptions()}
			{renderSpellDescription()}
		</section>
	)
}

export default BonusSpellSlotManager
