import React from 'react'
import * as SpellcastingCalculations from '../../utils/calculations/spellcasting'
import { modalAction, tooltipAction } from '../../utils/action_creator/popups'
import { renderTH } from '../../utils/fuf'
import { useSelector } from 'react-redux'

const Spellcasting = props => {

	const { character } = useSelector(store => store)

	const renderAllSpellcasting = () => {
		let spellcastingData = SpellcastingCalculations.allRemainingSpellsPerDay()
		let spellcastingArray = []
		spellcastingArray.push(spellcastingData.map((scData, i) => {
			return (
				<>
					{renderSPD(scData.spellsPerDay, scData.klassName, scData.level, i)}
					<br/>
					{renderAddionalSpellcastingStats(scData.level, scData.abilityScoreModifier)}
					{SpellcastingCalculations.areAllKnownSpellsFilled(scData.spellcasting, scData.level) && renderManageKnownSpells(scData)}
					{SpellcastingCalculations.areAllPreparedSpellsFilled(scData.spellcasting, scData.level) && renderManagePreparedSpells(scData)}
					{SpellcastingCalculations.areAllBonusSpellSlotsFilled(scData.spellcasting, scData.level) && renderManageBonusSpellSlots(scData)}
					{renderSpellTable(scData, i)}
				</>
			)
		}))
		let castAtWill = SpellcastingCalculations.spellsCastAtWill()
		let castAtWillSpells = castAtWill.map((el) => {
			return renderSpell(el.spellInfo, {spellcasting: el.spellcasting, klassFeature: el.klassFeature, abilityName: el.abilityName})
		})
		if (castAtWill.length){
			spellcastingArray.push(
				<>
				{renderSpellTable({}, 0, castAtWillSpells)}
				</>
			)
		}
		return spellcastingArray.flat()
	}

	const renderSPD = (spds, klassName, level, i) => {
		let interpolatedSPD = spds.map((spd, ind) => {
			let bonusSpell = null
			if (spd.bonusSpell === true){bonusSpell = "+1"}
			return (
				<React.Fragment key={ind*3+1}>
					<strong> | </strong>
					<i>{renderTH(spd.spell_level)}</i>
					: <strong>{spd.spells}{bonusSpell}</strong>
				</React.Fragment>
			)
		})

		return (
			<span key={i*3-1}>
				{klassName} Lvl <strong>{level}</strong>
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

	const renderSpellTable = (scData, index, spells) => {
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
						<th>Source</th>
          </tr>
        </thead>
        <tbody>
					{spells || renderSpellTableRows(scData)}
        </tbody>
      </table>
    )
	}

	const renderSpellTableRows = (scData) => {
		let spells = SpellcastingCalculations.characterSpells(scData.spellcasting)

		return spells.map((spell) => renderSpell(spell, scData))
	}

	const renderSpell = (spell, scData) => {
		let source = scData.abilityName ? `${scData.abilityName}` : `${scData.klassName} - ${scData.klassFeature.name}`

		let spellData = SpellcastingCalculations.spellData({...spell, spellcasting: scData.spellcasting, source}, scData.klassFeature.klass_id, character.character_klasses.length)
		spellData.castableBonusSpell = !!spell.bonus_spell === true
		let buttonName = spell.cast ? "Spent" : "Cast"
		let isBonus = spell.bonus_spell ? renderBonusSpellSlotTooltip(spell) : null
		return (
			<tr>
				<td>{spellData.spellLevel}{isBonus}</td>
				<td><button className={spellData.action} onClick={() => SpellcastingCalculations.castSpell(spellData, scData.spellsPerDay)}><strong>{buttonName}</strong></button></td>
				<td><em className='underline-hover' onClick={() => modalAction("spellDescription", spell.spell)}>{spellData.name}</em></td>
				<td>{spellData.range}</td>
				<td>{spellData.duration}</td>
				<td>{spellData.difficultyClass}</td>
				<td>{spellData.spellResistance}</td>
				<td>{spellData.source}</td>
			</tr>
		)
	}

	const renderBonusSpellSlotTooltip = (spell) => {
		let message
		if (spell.alternate_source.klass_specialization_id){
			let kSpec = character.klass_specializations.find(kspec => kspec.id === spell.alternate_source.klass_specialization_id)
			message = kSpec.name + " Bonus Spell Slot"
		}
		let callback = (e) => tooltipAction(message, e.target)
		return <sup onMouseOver={callback} onMouseOut={callback}><em>B</em></sup>
	}

	return (
		<>
			{renderAllSpellcasting()}
		</>
	)
}

export default Spellcasting
