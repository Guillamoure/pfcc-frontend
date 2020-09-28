import React from 'react'
import { useSelector } from 'react-redux'
import SpellDescription from '../spell_description'
import { bonusSpellSlotOptions, knownSpellsArray, spellsPerDayArray } from '../../helper_functions/calculations/spellcasting'
import { postFetch, deleteFetch, patchFetch } from '../../helper_functions/fetches'
import { replaceCharacterAction } from '../../helper_functions/action_creator/character'


const BonusSpellSlotManager = props => {

	let { prepared_spells, id } = useSelector(state => state.character)

	const [spells, updateSpells] = React.useState([])
	const [filterInput, updateFilter] = React.useState("")
	const [spellId, updateSpellId] = React.useState(0)
	const [dragInfo, updateDragInfo] = React.useState({
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
		let spell = spells.find(sp => sp.id === dragInfo.spellId)
		let body = {
			feature_spellcasting_id: props.spellcastingData.spellcasting.id,
			character_id: id,
			spell_level: spell.spell_level,
			direct_spell_id: spell.id,
			bonus_spell: true,
			alternate_source_id: spell.sourceId,
			alternate_source_ability: spell.sourceAbility
		}
		postFetch('prepared_spells', body)
		.then(data => {
			if (data.errors) {
				// updateWarning(data.errors[0])
			} else {
				let preparedSpell = {
					id: data.id,
					spell,
					spell_list_spell: null,
					spellcasting: props.spellcastingData.spellcasting,
					bonus_spell: true,
					spell_level: spell.spell_level,
					character_id: id,
					alternate_source: data.alternate_source
				}
				let replacePreparedSpells = [...prepared_spells]
				replacePreparedSpells.push(preparedSpell)
				prepared_spells.push(preparedSpell)
				replaceCharacterAction('prepared_spells', replacePreparedSpells)
			}
		})
		updateDragInfo({
			spellId: 0,
			dragging: false
		})
	}

	const resetDrag = e => {
		e.preventDefault()
		updateDragInfo({
			spellId: 0,
			dragging: false
		})
	}


	const removePreparedSpell = preparedSpellId => {
		deleteFetch(`prepared_spells/${preparedSpellId}`)
			.then(data => {
				let replacePreparedSpells = [...prepared_spells].filter(psp => psp.id !== preparedSpellId)
				prepared_spells = prepared_spells.filter(ks => ks.id !== preparedSpellId)
				replaceCharacterAction('prepared_spells', replacePreparedSpells)
			})
	}

	const togglePreparedSpellCastStatus = (preparedSpellId, cast) => {
		patchFetch(`cast_spells/toggle_cast/${preparedSpellId}`, {cast: !cast})
			.then(data => {
				let replacePreparedSpells = [...prepared_spells]
				replacePreparedSpells = replacePreparedSpells.map(ps => {
					if (ps.id === preparedSpellId){
						return {...ps, cast: !cast}
					}
					return ps
				})
				replaceCharacterAction('prepared_spells', replacePreparedSpells)
			})
	}

	const renderPreparedBonusSpells = () => {
		// render buttons, that flash
		// render known spells, and missing spells
		const { level, spellcasting } = props.spellcastingData

		let spellLevels = spellsPerDayArray(spellcasting, level).map(spd => spd.spell_level)
		const index = spellLevels.indexOf(0)
		if (index !== -1){spellLevels.splice(index, 1)}

		let allPreparedBonusSpellSlotSpells = []
		spellLevels.forEach(spLvl => {
			let preparedSpellThisLevel = prepared_spells.find(psp => psp.spell_level === spLvl && psp.bonus_spell)
			if (preparedSpellThisLevel){
				allPreparedBonusSpellSlotSpells.push({spellLevel: spLvl, spellName: preparedSpellThisLevel.spell.name, spellId: preparedSpellThisLevel.spell.id, preparedSpellId: preparedSpellThisLevel.id, cast: preparedSpellThisLevel.cast})
			} else {
				allPreparedBonusSpellSlotSpells.push({spellLevel: spLvl, spellName: "", preparedSpellId: 0, spellId: 0})
			}
			// let num = ks.spells
			// let thisLevelKnownSpells = prepared_spells.filter(cks => cks.spell_list_spell.spell_level === ks.spell_level)
			// num -= thisLevelKnownSpells.length
			// thisLevelKnownSpells.forEach(tlks => allKnownSpells.push({spellLevel: ks.spell_level, spellName: tlks.spell.name, spellId: tlks.spell.id, characterKnownSpellId: tlks.id}))
			// for (let i = 0; i < num; i++){
			// 	allKnownSpells.push({spellLevel: ks.spell_level, spellName: "", spellId: 0, characterKnownSpellId: 0})
			// }
		})

		let knownSpellsListItems = allPreparedBonusSpellSlotSpells.map(sp => {
			return (
				<tr>
					<td>{sp.spellLevel}</td>
					<td><em className='underline-hover' onClick={() => updateSpellId(sp.spellId)}>{sp.spellName}</em></td>
					<td>{!!sp.preparedSpellId && <button style={{color: "white", background: "red", fontSize: "0.9rem", border: "1px solid black", textAlign: "right", borderRadius: "6px"}} onClick={() => removePreparedSpell(sp.preparedSpellId)}>Remove</button>}</td>
					<td>{sp.cast && <button onClick={() => togglePreparedSpellCastStatus(sp.preparedSpellId, sp.cast)}>Restore</button>}</td>

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
							<th>Forget Prepared Spell</th>
							<th>UnCast</th>
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
			{renderPreparedBonusSpells()}
			{renderSpellOptions()}
			{renderSpellDescription()}
		</section>
	)
}

export default BonusSpellSlotManager
