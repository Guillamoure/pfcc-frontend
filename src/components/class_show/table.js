import React from 'react'
import _ from 'lodash'

class Table extends React.Component {

  renderBAB = () => {
    switch (this.props.klass.hit_die){
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

  renderSave = (num, save) => {
    if (save === 0.5){
      return _.floor(num * save) + 2
    } else if (save === 0.34){
      return _.floor(num * save)
    }
  }

  renderLevelFeatures = (num) => {
    const levelFeatures = this.props.klass.klass_features.filter(feature => {
      return feature.level_learned === num
    })
    const nameOfFeatures = levelFeatures.map(feature => feature.name)
    return nameOfFeatures.join(", ")
  }

  renderClassTableRow = () => {
    let level = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    return level.map(num => {
      return (
        <tr key={_.random(1, 2000000)}>
          <td>{num}</td>
          <td>+{_.floor(num * this.renderBAB())}</td>
          <td>+{this.renderSave(num, this.props.klass.fortitude)}</td>
          <td>+{this.renderSave(num, this.props.klass.reflex)}</td>
          <td>+{this.renderSave(num, this.props.klass.will)}</td>
          <td style={{textAlign: 'left'}}>{this.props.klass.klass_features &&this.renderLevelFeatures(num)}</td>
          {this.spellsPerDay(num)}
        </tr>
      )
    })
  }

  renderClassTable = () => {
    return (
      <table className='show'>
        <thead >
          <tr >
            <th >Level</th>
            <th >BAB</th>
            <th >Fortitude Save</th>
            <th >Reflex Save</th>
            <th >Will Save</th>
            <th >Features</th>
            {this.spells()}
          </tr>
        </thead>
        <tbody >
          {this.renderClassTableRow()}
        </tbody>
      </table>
    )
  }

  spells = () => {
    if (this.props.klass.spells_per_days){
      return (
        <React.Fragment>
          <th >0</th>
          <th >1</th>
          <th >2</th>
          <th >3</th>
          <th >4</th>
          <th >5</th>
          <th >6</th>
          <th >7</th>
          <th >8</th>
          <th >9</th>
        </React.Fragment>
      )
    }
  }

  spellsPerDay = (lvl) => {
    if (this.props.klass.spells_per_days){
      return (
        <React.Fragment>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 0)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 1)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 2)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 3)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 4)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 5)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 6)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 7)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 8)}</th>
          <th >{this.renderSpellsPerDayPerLevel(lvl, 9)}</th>
        </React.Fragment>
      )
    }
  }

  renderSpellsPerDayPerLevel = (lvl, sp_lvl) => {
    const spd =  this.props.klass.spells_per_days.find(spd => {
      return spd.klass_level === lvl && spd.spell_level === sp_lvl
    })
    return spd ? spd.spells : ""
  }

  render () {
    return (
      <span className='show'>
        {this.renderClassTable()}
      </span>
    )
  }



}

export default Table
