import React from 'react'
import * as SpellcastingCalculations from '../../helper_functions/calculations/spellcasting'
import { modalAction } from '../../helper_functions/action_creator/popups'
import { renderTH } from '../../helper_functions/fuf'
import { useSelector } from 'react-redux'

const Spellcasting = props => {

	const [, updateSpellcastingData] = React.useState([])

	React.useEffect(() => {
		updateSpellcastingData()
	}, [])


	const renderAllSpellcasting = () => {
		let spellcastingData = SpellcastingCalculations.allRemainingSpellsPerDay()
		return spellcastingData.map((scData, i) => {
			return (
				<>
					{renderSPD(scData.spellsPerDay, scData.klassName, i)}
					<br/>
					{renderAddionalSpellcastingStats(scData.klassFeature, scData.abilityScoreModifier)}
					{SpellcastingCalculations.areAllKnownSpellsFilled(scData.klassFeature, scData.level) && renderManageKnownSpells(scData)}
					{renderSpellTable(scData, i)}
				</>
			)
		})
	}

	const renderSPD = (spds, klassName, i) => {
		let interpolatedSPD = spds.map((spd, ind) => {
			return (
				<React.Fragment key={ind*3+1}>
					<strong> | </strong>
					<i>{renderTH(spd.spell_level)}</i>
					: <strong>{spd.spells}</strong>
				</React.Fragment>
			)
		})

		return (
			<span key={i*3-1}>
				{klassName}
				{interpolatedSPD}
			</span>
		)
	}

	const renderAddionalSpellcastingStats = (klassFeature, abilityScoreModifier) => {
		const { casterLevel, concentration } = SpellcastingCalculations.additionalSpellStats(klassFeature, abilityScoreModifier)
		return <span> SR check: <strong>+{casterLevel} |</strong> Concentration: <strong>+{concentration}</strong></span>
	}

	const renderManageKnownSpells = (spellcastingData) => {
		const renderClick = () => {
			modalAction("manageKnownSpells", spellcastingData)
		}

		return <button className="attention-button-animation" onClick={renderClick}>Learn New Spells</button>
	}

	const renderSpellTable = (scData, index) => {
		return (
      <table key={index*3+1}>
        <thead>
          <tr>
            <th>Lvl</th>
            <th>Action</th>
            <th>Name</th>
            <th>Range</th>
            <th>Duration</th>
            <th>Hit / DC</th>
            <th>SR</th>
          </tr>
        </thead>
        <tbody>
					{renderSpellTableRows(scData)}
        </tbody>
      </table>
    )
	}

	const renderSpellTableRows = (scData) => {
		let knownSpells = SpellcastingCalculations.characterKnownSpells(scData.klassFeature)

		return knownSpells.map((ks, i) => {
			let ksData = SpellcastingCalculations.spellData({...ks, spellcasting: scData.spellcasting}, scData.klassFeature.klass_id)
			return (
				<tr>
					<td>{ksData.spellLevel}</td>
					<td><button className={ksData.action} onClick={() => SpellcastingCalculations.castSpell(ksData, scData.spellsPerDay)}><strong>Cast</strong></button></td>
					<td><em className='underline-hover' onClick={() => modalAction("spellDescription", ks.spell)}>{ksData.name}</em></td>
					<td>{ksData.range}</td>
					<td>{ksData.duration}</td>
					<td>{ksData.difficultyClass}</td>
					<td>{ksData.spellResistance}</td>
				</tr>
			)
		})
	}

	return (
		<>
			{renderAllSpellcasting()}
		</>
	)
}

export default Spellcasting
