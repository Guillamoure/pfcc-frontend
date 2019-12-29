import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../../localhost'

import SpellSummary from '../spell_summary'
import HardcodeSpells from '../hardcode_spells'

class Spells extends React.Component {

  state = {
    spellsPerDay: [],
    spells: []
  }

  componentDidMount(){
    this.remainingSpells()
  }

  spellcasting = (klass) => {
    // HARDCODE
    let spellcasting
    if (klass.name === 'Vigilante'){
      spellcasting = {ability_score: 'Charisma', klass_feature_id: 2000300, prepared: false, limited: true, expendable: false, infinite_zero_level: true, bonus_spells: true}
    } else {
      spellcasting = klass.klass_features.find(kf => kf.name === 'Spells').spellcasting
    }
    return spellcasting
    // HARDCODE ENDS
  }

  renderCast = (spell) => {
    let action = _.lowerCase(spell.action.name.split(" ")[0])
    if (action === "full round"){
      action = "full"
    }
    let klass = this.props.classes.find(cl => cl.id === spell.klass.id)
    let spellcasting = this.spellcasting(klass)
    const info = {
      id: spell.id,
      expendable: this.isThisCasterExpendable(spell.klass.id),
      character_id: spell.character_id,
      spell_level: spell.spell_level,
      klass_id: spell.klass.id
    }
    fetch(`${localhost}/api/v1/cast_spells`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(r => r.json())
    .then(data => {
      this.props.dispatch({type: 'TRIGGER ACTION', action})
      if (info.spell_level === 0 || !spellcasting.expendable){
        this.props.dispatch({type: 'CAST CANTRIP SPA OR SPONTANEOUS SPELL', spell: data, infinite_zero_level: spellcasting.infinite_zero_level})
      } else if (spellcasting.expendable){
        this.props.dispatch({type: 'CAST PREPARED NONCANTRIP SPELL', spell: data})
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
    let spellcasting = this.spellcasting(klass)
    return spellcasting.prepared
  }

  isThisCasterExpendable = (klassId) => {
    const klass = this.props.classes.find(cl => cl.id === klassId)
    let spellcasting = this.spellcasting(klass)
    return spellcasting.expendable
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
        spells.push({spd: spellsAtThisLevel, name: c.name, id: c.id})
      }
    })
    // set state
    console.log('spd', spells)
    // HARDCODE
    let magicalChild = {
      name: 'Magical Child',
      id: 7,
      spd: [
        {id: 1001, spell_level: 1, klass_level: 2, spells: 2, klass_id: 7}
      ]
    }
    if (this.props.character.name === 'Persephone'){
      spells.push(magicalChild)
    }
    // HARDCODE ENDS
    this.setState({spellsPerDay: spells})
  }

  renderSpellsPerDay = () => {
    return this.state.spellsPerDay.map(spd => {
      return (
        <div key={spd.id*3-2}>
          <span>{spd.name}</span>
          {spd.spd.map(this.extrapolateSPD)}
          {this.additionalSpellStats(spd.name)}
          {this.availableSpellsToCastTable(spd.id)}
        </div>
      )
    })
  }

  extrapolateSPD = (spd) => {
    let specificClass = this.props.character_info.classes.find(cl => cl.id === spd.klass_id)
    let spdCopy = {...spd}
    let totalSpellsPerDay = spdCopy.spells
    let klass = this.props.classes.find(cl => cl.id === spd.klass_id)
    let spellcasting = this.spellcasting(klass)

    // can't get bonus spells per day for cantrips
    // only if spellcasting ability bonus is greater than or equal to spell level
    // not all classes allow bonus spells
    let bonus = 0
    if (this.bonusSPD(spd.klass_id, spd.spell_level) && spd.spell_level !== 0 && spellcasting.bonus_spells){
      bonus = 1
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
      if (pSp.spell_level === spd.spell_level && pSp.cast){
        casted += 1
      }
    })
    const remainingSpells = totalSpellsPerDay - casted + bonus
    return <span key={spd.id*3-1}> <strong>|</strong> <i>{this.renderTH(spd.spell_level)}</i>: <strong>{(remainingSpells || remainingSpells === 0) ? remainingSpells : totalSpellsPerDay}</strong></span>
  }

  bonusSPD = (klass_id, spell_level) => {
    // let klass = this.props.classes.find(cl => cl.id === klass_id)
    // let spellcasting = klass.klass_features.find(kf => kf.name === "Spells")
    // let ab = _.lowerCase(spellcasting.spellcasting.ability_score)
    let ab = this.props.character_info.classes.find(cl => cl.id === klass_id).spellcastingAbility
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

  availableSpellsToCastTable = (klassId) => {
    return (
      <table key={klassId*3-1}>
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
          {this.castableSpells(klassId).map((sp, idx) => <tr className={this.renderTableStyling(idx)} key={sp.id*3-1}><SpellSummary spell={sp} renderCast={this.renderCast} spellsPerDay={this.state.spellsPerDay} editModal={this.props.editModal} clickOut={this.props.clickOut}/></tr>)}
        </tbody>
      </table>
    )
  }

  renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-general" : "odd-row-general"
  }

  castableSpells = (klassId) => {
    let castableSpells = []

    let klass = this.props.classes.find(cl => cl.id === klassId)
    let spellcasting = this.spellcasting(klass)

    if (!this.isThisCasterPrepared(klassId)){
      let klassSpells = this.props.character.known_spells.filter(ks => ks.klass.id === klassId)
      castableSpells = klassSpells.map(ks => {
        return {
          character_id: this.props.character.id,
          spell: ks.spell,
          klass_spell_id: ks.klass_spell.id,
          spell_level: ks.klass_spell.spell_level,
          action: ks.spell.action,
          spell_range: ks.spell.spell_range,
          magic_school: ks.spell.magic_school,
          klass: ks.klass
        }
      })
    } else {
      castableSpells = this.props.character.prepared_spells.filter(pSp => {
        // if spells are expended when they are cast, filter out cast spells
        if (spellcasting.expendable){
          return pSp.cast === false
          // if they are not expended
        } else {
          return true
        }
      })
    }
    let sortedCastableSpells = this.sorted(castableSpells)
    return sortedCastableSpells
  }

  sorted = (spells) => {
    let array = []
    for (let i = 0; i < 10; i++) {
      let onlySpecificSpellLevel = spells.filter(sp => sp.spell_level === i)
      array.push(this.alphabetize(onlySpecificSpellLevel))
    }
    return _.flatten(array)
  }

  alphabetize = (spells) => {
    let sortedSpells = [...spells].sort((sp1, sp2) => {
      if (sp1.name > sp2.name){
        return 1
      } else if (sp1.name < sp2.name){
        return -1
      } else {
        return 0
      }
    })
    return sortedSpells
  }

  hardcodedSpells = () => {
    let condor = this.props.character_info.hardcode.minor === 'Condor - Minor'
    let cedrick = this.props.character.name === 'Cedrick'
    let pepper = this.props.character.name === 'Persephone'
    let maddox = this.props.character.name === 'Maddox'
    let robby = this.props.character.name === 'Robby'
    if (condor || cedrick || pepper || maddox || robby){
      return <HardcodeSpells editModal={this.props.editModal}/>
    }
  }

  additionalSpellStats = (name) => {
    // caster level
    // concentration
    let cl = 0
    let concentration = 0
    let klass = this.props.classes.find(cl => cl.name === name)
    let level
    if (name === 'Magical Child'){
      level = 2
    } else {
      level = this.props.character_info.classes.find(cl => cl.id === klass.id).level
    }
    cl += level
    concentration += level
    if (this.props.character.name === 'Maddox'){
      cl +=4
      // spell penetration
      // greater spell penetration
      concentration += 5
      // intelligence
    }
    concentration += this.props.character.name === 'Persephone' && name === 'Witch' ? 5 : 0
    concentration += this.props.character.name === 'Persephone' && name === 'Magical Child' ? 3 : 0
    concentration += this.props.character.name === 'Nettie' && name === 'Bard' ? 3 : 0
    return <span> | <strong>SR check</strong>: +{cl} | <strong>Concentration</strong>: +{concentration}</span>
  }

  render(){
    return(
      <div style={{padding: '1em'}}>
        {this.hardcodedSpells()}
        {!!this.state.spellsPerDay.length && this.renderSpellsPerDay()}
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
