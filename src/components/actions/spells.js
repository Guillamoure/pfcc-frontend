import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SpellSummary from '../spell_summary'

class Spells extends React.Component {

  state = {
    spellsPerDay: [],
    spells: []
  }

  componentDidMount(){
    this.remainingSpells()
  }

  renderCast = (preparedSpell) => {
    const info = {
      id: preparedSpell.id,
      prepared: this.isThisCasterPrepared(preparedSpell.klass.id),
      character_id: preparedSpell.character_id,
      spell_level: preparedSpell.spell_level,
      klass_id: preparedSpell.klass.id
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
      if (data.cast){
        this.props.dispatch({type: 'CAST PREPARED NONCANTRIP SPELL', spell: data})
      } else {
        this.props.dispatch({type: 'CAST CANTRIP SPA OR SPONTANEOUS SPELL', spell: data})
      }
      // if (this.isThisCasterPrepared(klassId)){
      //   let id = klassSpellId
      //   fetch(`http://localhost:3000/api/v1/prepared_spells/${id}`, {
      //     method: 'DELETE'
      //   })
      //   .then(r => r.json())
      //   .then(data => {
      //     if (data.response){
      //       let newPreparedSpells = this.props.character.prepared_spells.filter(ps => ps.id !== id)
      //       this.props.dispatch({type: 'REMOVE PREPARED SPELL', newPreparedSpells: newPreparedSpells})
      //     }
      //   })
      // }
    })
  }

  isThisCasterPrepared = (klassId) => {
    // REFACTOR
    // Doesn't check to see if spells can be cast at their current level
    // Just at all levels
    // Paladin/Ranger at lvl 4/3, etc.
    const klass = this.props.classes.find(cl => cl.id === klassId)
    let spellcasting = klass.klass_features.find(kf => kf.spellcasting).spellcasting
    return spellcasting.prepared
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
    let totalSpellsPerDay = spd.spells
    if (this.bonusSPD(spd.klass_id, spd.spell_level)){
      totalSpellsPerDay += 1
    }
    let casted = 0
    if (specificClass.castSpells) {
      casted = specificClass.castSpells[spd.spell_level]
    }
    // this resets casted if it found no spells of the applicable level in the redux castSpells object
    // because itll return undefined
    // refactor when you get to it
    if (casted === undefined){
      casted = 0
    }
    this.props.character.prepared_spells.forEach(pSp => {
      if (pSp.spell_level == spd.spell_level && pSp.cast){
        casted += 1
      }
    })
    const remainingSpells = totalSpellsPerDay - casted
    return <span> <strong>|</strong> <i>{this.renderTH(spd.spell_level)}</i>: <strong>{(remainingSpells || remainingSpells === 0) ? remainingSpells : totalSpellsPerDay}</strong></span>
  }

  bonusSPD = (klass_id, spell_level) => {
    let klass = this.props.classes.find(cl => cl.id === klass_id)
    let spellcasting = klass.klass_features.find(kf => kf.name === "Spells")
    let ab = _.lowerCase(spellcasting.spellcasting.ability_score)
    return ((this.props.character_info.ability_scores[ab] - 10) / 2.0) >= spell_level ? true : false
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
          {this.castableSpells().map(sp => <SpellSummary spell={sp} renderCast={this.renderCast} spellsPerDay={this.state.spellsPerDay}/>)}
        </tbody>
      </table>
    )
  }

  castableSpells = () => {
    let castablePreparedSpells = this.props.character.prepared_spells.filter(pSp => {
      return pSp.cast === false
    })
    return castablePreparedSpells
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
