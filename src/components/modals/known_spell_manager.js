import React from 'react'
import { useSelector } from 'react-redux'
import { remainingKnownSpellsArray, knownSpellsArray } from '../../helper_functions/calculations/spellcasting'
import { getFetch } from '../../helper_functions/fetches'

const KnownSpellManager = props => {

	const { character_known_spells } = useSelector(state => state.character)

	const [displayButton, toggleDisplayButton] = React.useState("All")
	const [spells, updateSpells] = React.useState([])
	const [filterInput, updateFilter] = React.useState("")

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
			})
	}, [])

	const renderKnownSpells = () => {
		// render buttons, that flash
		// render known spells, and missing spells
		const { klassFeature, level } = props.spellcastingData
		console.log(props)
		console.log(character_known_spells)
		let knownSpells = knownSpellsArray(klassFeature, level)
		let buttons = knownSpells.map(ks => {
			return <button onClick={() => toggleDisplayButton(ks.spell_level)}>{ks.spell_level}</button>
		})
		let allKnownSpells = []
		knownSpells.forEach(ks => {
			let num = ks.spells
			let thisLevelKnownSpells = character_known_spells.filter(cks => cks.spell_list_spell.spell_level === ks.spell_level)
			num -= thisLevelKnownSpells.length
			thisLevelKnownSpells.forEach(tlks => allKnownSpells.push({spellLevel: ks.spell_level, spellName: tlks.spell.name, spellId: tlks.spell.id}))
			for(let i = 0; i < num; i++){
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
					<td><em>{sp.spellName}</em></td>
				</tr>
			)
		})

		// display all known spells by spell level
		// if there is a spell missing, have a gap
		return (
			<aside>
				{buttons}
				<table>
					<tr>
						<th>Lvl</th>
						<th>Name</th>
					</tr>
					{knownSpellsListItems}
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
			return (
				<tr className={className}>
					<td>{sp.spell_level}</td>
					<td><em>{sp.name}</em></td>
				</tr>
			)
		})
		return (
			<aside>
				<label for="spell-filter">Filter Spells</label>
				<input name="spell-filter" id="spell-filter" type="text" value={filterInput} onChange={e => updateFilter(e.target.value)}/>
				<table>
					<tr>
						<th>Lvl</th>
						<th>Name</th>
					</tr>
					{nodeSpells}
				</table>
			</aside>
		)
	}


	return (
		<section className="container-2">
			{renderKnownSpells()}
			{renderSpellOptions()}
		</section>
	)
}

export default KnownSpellManager
