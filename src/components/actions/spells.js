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

  renderCast = (level, klass_id) => {
    const info = {
      spell_level: level,
      klass_id: klass_id,
      character_id: this.props.currentUser.id
    }
    fetch('http://localhost:3000/api/v1/cast_spells', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(r => r.json())
    .then(data => {
      this.props.dispatch({type: 'CAST SPELL', spell: data})
    })
  }

  remainingSpells = () => {
    let spells = []
    // for each class that a character has levels in
    this.props.character_info.classes.forEach(klass => {
      //find that class
      const c = this.props.classes.find(k => k.id === klass.id)
      // if that class has spells
      if (c && c.spells_per_days.length){
        // go through the list of spells per day,
        // and find the spells they can cast per day at their class level
        let spellsAtThisLevel = c.spells_per_days.filter(spd => {
          return spd.klass_level === klass.level
        })
        // push into an array
        // an object of each spell per day and the class name and id
        spells.push({spd: spellsAtThisLevel, name: c.name, id: c.name})
      }
    })
    // set state
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
    let specificClass = this.props.character_info.classes.find(cl => cl.id === spd.klass_id)
    let casted = 0
    if (specificClass.castSpells) {
      casted = specificClass.castSpells[spd.spell_level]
    }
    const remainingSpells = spd.spells - casted
    return <span> <strong>|</strong> <i>{this.renderTH(spd.spell_level)}</i>: <strong>{(remainingSpells || remainingSpells === 0) ? remainingSpells : spd.spells}</strong></span>
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
          {this.state.spells.map(sp => <SpellSummary spell={sp} renderCast={this.renderCast} spellsPerDay={this.state.spellsPerDay}/>)}
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
    character_info: state.character_info,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(Spells)
