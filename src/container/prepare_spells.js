import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SpellPreparationCard from '../components/spell_preparation_card'
import PreparedCard from '../components/prepared_card'

class PrepareSpells extends React.Component {

  state = {
    knownSpells: [],
    selectedSpells: [],
    activeClass: 0,
    allAvailableClasses: [],
    activeSpell: 0,
    spellLevel: "-",
    spellsPerDay: null,
    availableSpellLevels: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/known_spells?character=${this.props.character.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({knownSpells: data}, this.availableClasses)
    })
  }

  renderKnownSpells = () => {
    let ksSortedSpellLevel = this.state.knownSpells.sort((ks1, ks2) => {
      return ks1.klass_spell.spell_level - ks2.klass_spell.spell_level
    })
    let ksSortedFilteredSpellLevel = ksSortedSpellLevel.filter(ksssl => ksssl.klass.id === this.state.activeClass)
    return ksSortedFilteredSpellLevel.map(kssfsl => <SpellPreparationCard knownSpell={kssfsl} renderClick={this.renderClick} activeSpell={this.state.activeSpell} spellLevel={this.state.spellLevel} renderSpellLevelEdit={this.renderSpellLevelEdit} renderSelectedSpell={this.renderSelectedSpell} availableSpellLevels={this.state.availableSpellLevels}/>)
  }

  availableClasses = () => {
    let classes = []
    this.state.knownSpells.forEach(ks => {
      if (!classes.includes(ks.klass.id)){
        classes.push(ks.klass.id)
      }
    })
    if (classes.length === 1){
      this.setState({activeClass: classes[0]})
    } else {
      this.setState({activeClass: classes[0], allAvailableClasses: classes})
    }
  }

  displayClassOptions = () => {
    if (!this.state.allAvailableClasses.length){
      return <p>{this.props.classes.find(cl => cl.id === this.state.activeClass).name} Spells</p>
    } else {
      // create a tab system (like for actions or the settings modal)
      // activeClass is already in state
      // use it to show only specific class spell options
    }
  }

  renderClick = (spell_id) => {
    this.setState({activeSpell: spell_id, spellLevel: "-"})
  }

  renderSpellLevelEdit = (e) => {
    this.setState({spellLevel: parseInt(e.target.value)})
  }

  renderSelectedSpell = (e) => {
    e.preventDefault()
    if (this.state.spellLevel === "-"){
      return null
    } else {
      let spell = {
        id: this.state.activeSpell,
        level: this.state.spellLevel
      }
      this.setState({selectedSpells: [...this.state.selectedSpells, spell], activeSpell: 0, spellLevel: "-"})
    }
  }

  displaySelectedSpells = () => {
    return this.state.spellsPerDay.map(spd => {
      let totalSpellsPerDay = spd.spells
      // can't get bonus spells per day for cantrips
      if (this.bonusSPD(spd.klass_id, spd.spell_level) && spd.spell_level !== 0){
        totalSpellsPerDay += 1
      }
      let prepared = this.state.selectedSpells.filter(ss => ss.level === spd.spell_level).length
      let remainingSpells = totalSpellsPerDay - prepared

      // checking for cast spells from prepared spells
      this.props.character.prepared_spells.forEach(ps => {
        if (ps.spell_level === spd.spell_level && ps.cast){
          remainingSpells--
        }
      })

      // check from character_info for cantrips too!
      let klassInfo = this.props.character_info.classes.find(cl => cl.id === spd.klass_id)
      if (klassInfo.castSpells[spd.spell_level]){
        remainingSpells -= klassInfo.castSpells[spd.spell_level]
      }

      if (remainingSpells === 0 && this.state.availableSpellLevels.includes(spd.spell_level)){
        this.checkAvailableSpellLevel(spd.spell_level)
      }
      return <span> <strong>|</strong> <i>{this.renderTH(spd.spell_level)}</i>: <strong>{(remainingSpells || remainingSpells === 0) ? remainingSpells : totalSpellsPerDay}</strong></span>
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
        spells.push({spd: spellsAtThisLevel})
      }
    })
    let availableSpellLevels = []
    spells[0].spd.forEach(spd => {
      if (!availableSpellLevels.includes(spd.spell_level)){
        availableSpellLevels.push(spd.spell_level)
      }
    })
    // set state
    this.setState({spellsPerDay: spells[0].spd, availableSpellLevels})
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

  bonusSPD = (klass_id, spell_level) => {
    let klass = this.props.classes.find(cl => cl.id === klass_id)
    let spellcasting = klass.klass_features.find(kf => kf.name === "Spells")
    let ab = _.lowerCase(spellcasting.spellcasting.ability_score)
    return ((this.props.character_info.ability_scores[ab] - 10) / 2.0) >= spell_level ? true : false
  }

  renderPreparedSpells = () => {
    return this.state.selectedSpells.map(ss => {
      let spell = this.state.knownSpells.find(ks => ks.id === ss.id).spell
      return <PreparedCard spell={spell} level={ss.level} removePreparedSpell={this.removePreparedSpell}/>
    })
  }

  checkAvailableSpellLevel = (lvl) => {
    let changedAvailable = [...this.state.availableSpellLevels]
    let filtered = changedAvailable.filter(casl => {
      if (casl === lvl){
        return false
      } else {
        return true
      }
    })
    this.setState({availableSpellLevels: filtered})
  }

  removePreparedSpell = (spell_id) => {
    let found = false
    let filtered = this.state.selectedSpells.filter(ss => {
      if (ss.id === spell_id && !found){
        found = true
        // prevent duplicates from being filtered out
        return false
      } else {
        return true
      }
    })
    this.setState({selectedSpells: filtered})
  }

  render(){
    return (
      <div className="container-2">
        <div>
        {this.state.activeClass && this.displayClassOptions()}
        {this.renderKnownSpells()}
        </div>
        <div>
          {this.state.spellsPerDay && this.displaySelectedSpells()}
          {!this.state.spellsPerDay && this.remainingSpells()}
          {this.renderPreparedSpells()}
        </div>
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

export default connect(mapStatetoProps)(PrepareSpells)
