import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

class Spells extends React.Component {

  state = {
    spellsPerDay: [],
    spells: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/prepared_spells/${this.props.character.id}`)
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
    const level = this.props.character_info.classes[sp.klass.id]

    return(
      <tr>
        <td><button onClick={() => this.props.renderEdit({id: 1}, "cast_spell")}>Cast</button></td>
        <td>{sp.spell.name}</td>
        <td>{this.renderRange(level, sp.spell_range)}</td>
        <td>5 min</td>
        <td>{this.renderDC(sp.spell_level, sp.klass.id)}</td>
        <td>{sp.spell.spell_resistance ? "Y" : "N"}</td>
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

  renderDC = (sp_lvl, klass_id) => {
    const spellcasting = this.props.character.klass_features.find(kf => kf.spellcasting && kf.klass_id === klass_id)
    const score = spellcasting.spellcasting.ability_score
    const mod = Math.floor((this.props.character_info.ability_scores[_.lowerCase(score)] - 10) / 2)
    return (10 + sp_lvl + mod)
  }

  renderRange = (level, spell_range) => {
    let newLevel = level
    if (level%2 === 1){
      newLevel -= 1
    }
    const distance = (spell_range.feet + (newLevel * spell_range.increase_per_level))
    return distance !== 0 ? distance + " ft" : "Self"
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

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Spells)
