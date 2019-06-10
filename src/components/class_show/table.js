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
          <td>{this.props.klass.klass_features &&this.renderLevelFeatures(num)}</td>
        </tr>
      )
    })
  }

  renderClassTable = () => {
    return (
      <table >
        <thead >
          <tr >
            <th >Level</th>
            <th >BAB</th>
            <th >Fortitude Save</th>
            <th >Reflex Save</th>
            <th >Will Save</th>
            <th >Features</th>
          </tr>
        </thead>
        <tbody >
          {this.renderClassTableRow()}
        </tbody>
      </table>
    )
  }

  render () {
    return (
      <span>
        {this.renderClassTable()}
      </span>
    )
  }



}

export default Table
