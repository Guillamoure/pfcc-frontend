import React from 'react'
import * as SpellcastingCalculations from '../../helper_functions/calculations/spellcasting'
import { renderTH } from '../../helper_functions/fuf'
import { useSelector } from 'react-redux'

const Spellcasting = props => {


	const renderAllSpellcasting = () => {
		const allSpellsPerDays = SpellcastingCalculations.allRemainingSpellsPerDay()
		return allSpellsPerDays.map(spds => {
			return (
				<>
					{renderSPD(spds)}
					{renderSpellTable(spds)}
				</>
			)
		})
	}

	const renderSPD = (spds) => {
		let interpolatedSPD = spds.map(spd => {
			return (
				<>
					<strong> | </strong>
					<i>{renderTH(spd.spell_level)}</i>
					: <strong>{spd.spells}</strong>
				</>
			)
		})

		return (
			<span key={spds[0].id*3-1}>
				{spds[0].klassName}
				{interpolatedSPD}
			</span>
		)
	}

	const renderSpellTable = (spds) => {
		return (
      <table key={spds[0].id*3+1}>
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
