import React from 'react'
import { connect } from 'react-redux'

import SpellSummary from '../spell_summary'

class Spells extends React.Component {

  state = {
    spellsPerDay: [],
    spells: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/prepared_spells/${this.props.character.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({spells: data}, this.remainingSpells)
    })
  }

  remainingSpells = () => {
    let spells = []
    for (var id in this.props.character_info.classes){
      let klass = this.props.character.klasses.find(klass => klass.id === parseInt(id))
      if (klass && klass.spells_per_days.length){
        // if the class has spells
        // find the spells they can cast for that given level (klassIds[id])
        let spellsAtThisLevel = klass.spells_per_days.filter(spd => {
          return spd.klass_level === this.props.character_info.classes[id]
        })
        spells.push({spd: spellsAtThisLevel, name: klass.name, id: klass.name})
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
          {this.state.spells.map(sp => <SpellSummary spell={sp}/>)}
        </tbody>
      </table>
    )
  }


  render(){
    return(
      <div style={{padding: '1em'}}>
        {!!this.state.spellsPerDay.length && this.renderSpellsPerDay()}
        {this.availableSpellsToCastTable()}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Spells)
