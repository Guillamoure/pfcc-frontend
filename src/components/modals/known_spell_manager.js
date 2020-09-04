import React from 'react'
import { useSelector } from 'react-redux'
import { remainingKnownSpellsArray, knownSpellsArray } from '../../helper_functions/calculations/spellcasting'
import { getFetch } from '../../helper_functions/fetches'

const KnownSpellManager = props => {

	const { character_known_spells } = useSelector(state => state.character)

	const [displayButton, toggleDisplayButton] = React.useState("All")
	const [spells, updateSpells] = React.useState([])

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
		let remainingKnownSpells = remainingKnownSpellsArray(klassFeature, level)
		let buttons = remainingKnownSpells.map(ks => {
			return <button>{ks.spell_level}</button>
		})
		buttons.unshift(<button>All</button>)
		return (
			<aside>
				{buttons}
			</aside>
		)
	}

	const renderSpellOptions = () => {
		const { level } = props.spellcastingData
		console.log(spells)
		let nodeSpells = spells.map(sp => {
			let className = sp.spell_level > level ? "mobile-active-tab" : ""
			return (
				<tr className={className}>
					<td>{sp.spell_level}</td>
					<td><em>{sp.name}</em></td>
				</tr>
			)
		})
		return (
			<table>
				<tr>
					<th>Lvl</th>
					<th>Name</th>
				</tr>
				{nodeSpells}
			</table>
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
