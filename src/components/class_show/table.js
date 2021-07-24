import React from 'react'
import _ from 'lodash'
import { renderTH } from '../../utils/fuf'
import { tableDescriptionsByLevel } from '../../utils/calculations/class'

const Table = props => {

	const tableDescriptions = tableDescriptionsByLevel(props.klass.klass_features || [], props.activeArchetype || {}, props.chosenArchetypes || [])

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
		// converts class features into an array of the table description with a slug for href
		let levelFeatures = tableDescriptions[lvl] ?? []
		// let klassFeatureIds = []
		//
    // props.klass.klass_features.forEach(kf => {
		//
		// 	let slug = kf.name.toLowerCase().split(" ").join("-")
		//
		// 	kf.feature_levels.forEach(fl => {
		//
		// 		const {table_description, level} = fl
		// 		// filter all the features by their level
		// 		if (level === lvl && (table_description !== "none" && table_description !== "")){
		// 			levelFeatures.push({klassFeatureId: kf.id, slug, featureLevel: fl, color: "black"})
		// 			klassFeatureIds.push(kf.id)
		// 		}
		//
		// 	})
		// })
		//
		// let desc  = tableDescriptionPerLevel(lvl, props.klass.klass_features, props.activeArchetype, props.chosenArchetypes)
		//
		// // if there is an activeArchetype
		// if (props.activeArchetype.id){
		// 	levelFeatures = levelFeatures.map(feat => {
		// 		let newFeature = false
		// 		props.activeArchetype.klass_archetype_features.forEach(archF => {
		// 			archF.replaces_klass_features.forEach(kf => {
		// 				if (kf.klass_feature_id === feat.featureLevel.klass_feature_id){
		// 					if (!kf.affects_specific_level || kf.affects_specific_level === lvl){
		// 						newFeature = true
		// 					}
		// 				}
		// 			})
		// 		})
		// 		if (newFeature){return {...feat, strikethrough: true, color: "darkgrey"}}
		// 		else {return feat}
		// 	})
		// 	props.activeArchetype.klass_archetype_features.forEach(archF => {
		// 		archF.klass_archetype_feature_levels.forEach(archFL => {
		// 			if (archFL.table_description !== "none" && archFL.table_description !== ""){
		// 				if (archFL.level === lvl){
		// 					let slug = archF.name.toLowerCase().split(" ").join("-")
		//
		// 					levelFeatures.push({slug, featureLevel: archFL, color: "forestgreen"})
		// 				}
		// 			}
		// 		})
		// 	})
		// }



		// make dom element of description with slug href
    const nameOfFeatures = levelFeatures.map(feature => {
			// return feature.featureLevel.table_description
			let style = {color: feature.color}
			if (feature.strikethrough){
				style.textDecoration = "line-through"
			}
			return <a className="underline-hover" style={style} href={`#${feature.slug}`}>{feature.tableDescription}</a>
		})

		// join all of them with commas to become a string
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
