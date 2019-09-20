import React from 'react'
import _ from 'lodash'

class Spells extends React.Component {

  state = {
    spellsPerDay: [],
    spells: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/spells`)
    .then(r => r.json())
    .then(data => {
      this.setState({spells: data})
    })
  }

  remainingSpells = () => {
    let spells = []
    let klass_ids = {}
    this.props.character.character_klasses.forEach(klass => {
      if(klass_ids[klass.klass_id]){
        klass_ids[klass.klass_id] += 1
      } else {
        klass_ids[klass.klass_id] = 1
      }
    })
    for (var id in klass_ids){
      let klass = this.props.character.klasses.find(klass => klass.id === parseInt(id))
      if (klass && klass.spells_per_days.length){
        // if the class has spells
        // find the spells they can cast for that given level (klass_ids[id])
        let spellsAtThisLevel = klass.spells_per_days.filter(spd => {
          return spd.klass_level === klass_ids[id]
        })
        spells.push({spd: spellsAtThisLevel, name: klass.name})
      }
    }

    this.setState({spellsPerDay: spells})
  }

  renderSpellsPerDay = () => {
    return this.state.spellsPerDay.map(spd => {
      return (
        <div>
          <span>{spd.name}</span>
          {spd.spd.map(this.extrapolateSPD)}
        </div>
      )
    })
  }

  extrapolateSPD = (spd) => {
    return <span> <strong>|</strong> <i>{this.renderTH(spd.spell_level)}</i>: <strong>{spd.spells}</strong></span>
  }

  renderTH = (num) => {
    switch (parseInt(num)){
      case 1:
        return "1st"
      case 2:
        return "2nd"
      case 3:
        return "3rd"
      default:
        return `${num}th`
    }
  }

  renderSpell = (sp) => {
    debugger
    return(
      <tr>
        <td><button onClick={() => this.props.renderEdit({id: 1}, "cast_spell")}>Cast</button></td>
        <td>{sp.name}</td>
        <td>35 ft</td>
        <td>3 min</td>
        <td>14</td>
        <td>{sp.spell_resistance ? "Y" : "N"}</td>
      </tr>
    )
  }

  availableSpellsToCastTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Range</th>
            <th>Duration</th>
            <th>Hit / DC</th>
            <th>SR</th>
          </tr>
        </thead>
        <tbody>
          {this.state.spells.map(sp => this.renderSpell(sp))}
        </tbody>
      </table>
    )
  }

  render(){
    return(
      <div style={{padding: '1em'}}>
        {!this.state.spellsPerDay.length && this.remainingSpells()}
        {!!this.state.spellsPerDay.length && this.renderSpellsPerDay()}
        {this.availableSpellsToCastTable()}
      </div>
    )
  }
}

export default Spells
