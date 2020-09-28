import React from 'react'
import * as SpellcastingCalculations from '../../helper_functions/calculations/spellcasting'
import { modalAction } from '../../helper_functions/action_creator/popups'
import { renderTH } from '../../helper_functions/fuf'
import { useSelector } from 'react-redux'

const Spellcasting = props => {

	const renderAllSpellcasting = () => {
		let spellcastingData = SpellcastingCalculations.allRemainingSpellsPerDay()
		return spellcastingData.map((scData, i) => {
			return (
				<>
					{renderSPD(scData.spellsPerDay, scData.klassName, i)}
					<br/>
					{renderAddionalSpellcastingStats(scData.level, scData.abilityScoreModifier)}
					{SpellcastingCalculations.areAllKnownSpellsFilled(scData.spellcasting, scData.level) && renderManageKnownSpells(scData)}
					{SpellcastingCalculations.areAllPreparedSpellsFilled(scData.spellcasting, scData.level) && renderManagePreparedSpells(scData)}
					{SpellcastingCalculations.areAllBonusSpellSlotsFilled(scData.spellcasting, scData.level) && renderManageBonusSpellSlots(scData)}
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

	const renderAddionalSpellcastingStats = (level, abilityScoreModifier) => {
		const { casterLevel, concentration } = SpellcastingCalculations.additionalSpellStats(level, abilityScoreModifier)
		return <span> SR check: <strong>+{casterLevel} |</strong> Concentration: <strong>+{concentration}</strong></span>
	}

	const renderManageKnownSpells = (spellcastingData) => {
		const renderClick = () => {
			modalAction("manageKnownSpells", spellcastingData)
		}

		return <button className="attention-button-animation" onClick={renderClick}>Learn New Spells</button>
	}

	const renderManagePreparedSpells = spellcastingData => {
		const renderClick = () => {
			modalAction("managePreparedSpells", spellcastingData)
		}

		return <button className="attention-button-animation" onClick={renderClick}>Prepare Spells</button>
	}

	const renderManageBonusSpellSlots = spellcastingData => {
		const renderClick = () => {
			modalAction("manageBonusSpellSlots", spellcastingData)
		}

		return <button className="attention-button-animation" onClick={renderClick}>Prepare Bonus Spells</button>
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
		let spells = SpellcastingCalculations.characterSpells(scData.spellcasting)

		return spells.map((spell, i) => {
			let spellData = SpellcastingCalculations.spellData({...spell, spellcasting: scData.spellcasting}, scData.klassFeature.klass_id)
			let buttonName = spell.cast ? "Spent" : "Cast"
			return (
				<tr>
					<td>{spellData.spellLevel}</td>
					<td><button className={spellData.action} onClick={() => SpellcastingCalculations.castSpell(spellData, scData.spellsPerDay)}><strong>{buttonName}</strong></button></td>
					<td><em className='underline-hover' onClick={() => modalAction("spellDescription", spell.spell)}>{spellData.name}</em></td>
					<td>{spellData.range}</td>
					<td>{spellData.duration}</td>
					<td>{spellData.difficultyClass}</td>
					<td>{spellData.spellResistance}</td>
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
