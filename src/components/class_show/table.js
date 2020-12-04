import React from 'react'
import _ from 'lodash'
import { renderTH } from '../../utils/fuf'

const Table = props => {

  const renderBAB = () => {
    switch (props.klass.hit_die){
      case 6:
        return 0.5;
      case 8:
        return 0.75;
      case 10:
        return 1;
      case 12:
        return 1;
      default:
        return 1;
    }
  }

  const renderSave = (num, save) => {
    if (save === 0.5){
      return _.floor(num * save) + 2
    } else if (save === 0.34){
      return _.floor(num * save)
    }
  }

  const renderLevelFeatures = (lvl) => {
    let onlyFeatures = _.flatten(props.klass.klass_features.map(kf => {
			let slug = kf.name.toLowerCase().split(" ").join("-")
			return kf.feature_levels.map(fl => {
				return {slug, featureLevel: fl}
			})
		}))
    const levelFeatures = onlyFeatures.filter(feature => {
			const {table_description, level} = feature.featureLevel
      return level === lvl && (table_description !== "none" && table_description !== "")
    })
    const nameOfFeatures = levelFeatures.map(feature => {
			// return feature.featureLevel.table_description
			return <a className="underline-hover" style={{color: "black"}} href={`#${feature.slug}`}>{feature.featureLevel.table_description}</a>
		})
		const domFeatures = []
		for (let i = 0; i < nameOfFeatures.length; i++){
			domFeatures.push(nameOfFeatures[i])
			if (i < nameOfFeatures.length -1){
				domFeatures.push(", ")
			}
		}
    return domFeatures
  }

  const renderClassTableRow = () => {
    let level = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    return level.map(num => {
      return (
        <tr key={_.random(1, 2000000)} className={renderTableStyling(num)}>
          <td style={{textAlign: 'left'}}>{renderTH(num)}</td>
          <td style={{textAlign: 'left'}}>{renderAttackBonus(num)}</td>
          <td>+{renderSave(num, props.klass.fortitude)}</td>
          <td>+{renderSave(num, props.klass.reflex)}</td>
          <td>+{renderSave(num, props.klass.will)}</td>
          <td style={{textAlign: 'left'}}>{props.klass.klass_features && renderLevelFeatures(num)}</td>
          {spellsPerDay(num)}
        </tr>
      )
    })
  }

	const renderAttackBonus = (level) => {
		let bab = _.floor(level * renderBAB())
		let string = ""
		for (let i = bab; i > 0; i-=5){
			if (string.length){
				string += "/"
			}
			string += `+${i}`
		}
		if (!string.length){string = "+0"}
		return string
	}

  const renderTableStyling = (level) => {
    return level%2 === 0 ? "even" : "odd"
  }

  const renderClassTable = () => {
    return (
      <table id="class-table" className='show'>
        <thead >
          <tr >
            <th id="class-table-level">Lvl</th>
            <th id="class-table-bab">BAB</th>
            <th id="class-table-fort">Fort Save</th>
            <th id="class-table-ref">Reflex Save</th>
            <th id="class-table-will">Will Save</th>
            <th id="class-table-features">Features</th>
            {spells()}
          </tr>
        </thead>
        <tbody >
          {renderClassTableRow()}
        </tbody>
      </table>
    )
  }

	const findSpellcasting = klassFeatures => {
		let spellcasting = null
		klassFeatures.forEach(kf => {
			kf.features.forEach(f => {
				spellcasting = f.spellcasting ?? spellcasting
			})
		})
		return spellcasting
	}

	const availableSpellLevels = spdpl => {
		let arr = []
		for (let i = 0; i < spdpl.length; i++){
			if (!arr.includes(spdpl[i].spell_level)){
				arr.push(spdpl[i].spell_level)
			}
		}
		return arr
	}

  const spells = () => {
		let spellcasting = findSpellcasting(props.klass.klass_features ?? [])
    if (spellcasting){
      console.log("Has spells per day!")
			let levels = availableSpellLevels(spellcasting.spells_per_day_per_level)
      return (
        <React.Fragment>
          {levels.map(lvl => <th>{lvl}</th>)}
        </React.Fragment>
      )
    }
  }

  const spellsPerDay = (lvl) => {
		let spellcasting = findSpellcasting(props.klass.klass_features ?? [])
    if (spellcasting){
			let levels = availableSpellLevels(spellcasting.spells_per_day_per_level)
      return (
        <React.Fragment>
					{levels.map(level => <td>{renderSpellsPerDayPerLevel(lvl, level)}</td>)}
        </React.Fragment>
      )
    }
  }

  const renderSpellsPerDayPerLevel = (lvl, sp_lvl) => {
		let spellcasting = findSpellcasting(props.klass.klass_features ?? [])
    const spd = spellcasting.spells_per_day_per_level.find(spd => {
      return spd.klass_level === lvl && spd.spell_level === sp_lvl
    })
    return spd ? spd.spells : "-"
  }

  return (
    <span className='show'>
      {renderClassTable()}
    </span>
  )
}

export default Table
