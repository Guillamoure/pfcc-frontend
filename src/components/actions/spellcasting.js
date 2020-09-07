import React from 'react'
import * as SpellcastingCalculations from '../../helper_functions/calculations/spellcasting'
import { modalAction } from '../../helper_functions/action_creator/popups'
import { renderTH } from '../../helper_functions/fuf'
import { useSelector } from 'react-redux'

const Spellcasting = props => {

	const [spellcastingData, updateSpellcastingData] = React.useState([])

	React.useEffect(() => {
		updateSpellcastingData(SpellcastingCalculations.allRemainingSpellsPerDay())
	}, [])


	const renderAllSpellcasting = () => {
		return spellcastingData.map((scData, i) => {
			return (
				<>
					{renderSPD(scData.spellsPerDay, scData.klassName, i)}
					<br/>
					{renderAddionalSpellcastingStats(scData.klassFeature, scData.abilityScoreModifier)}
					{SpellcastingCalculations.areAllKnownSpellsFilled(scData.klassFeature, scData.level) && renderManageKnownSpells(scData)}
					{renderSpellTable(i)}
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

	const renderSpellTable = (index) => {
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

        </tbody>
      </table>
    )
	}

	return (
		<>
			{renderAllSpellcasting()}
		</>
	)
}

export default Spellcasting
