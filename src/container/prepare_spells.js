import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../localhost'
import { th } from '../fuf'

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
    fetch(`${localhost}/api/v1/known_spells?character=${this.props.character.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({knownSpells: data}, this.availableClasses)
    })
  }
  // CREATES AN ARRAY OF KLASS IDS
  // THESE IDS REPRESENT ALL THE AVAILABLE KLASSES
  // IF THERE IS ONLY ONE OF THESE KLASSES, MAKE IT THE ACTIVE ONE
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

  renderSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.availableSpellLevels)
    let info = {
      spells: this.state.selectedSpells,
      character_id: this.props.character.id,
      is_done_preparing_spells: !!this.state.availableSpellLevels.length ? false : true
    }
    fetch(`${localhost}/api/v1/prepared_spells`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(r => r.json())
    .then(data => {
      this.props.dispatch({type: 'PREPARE SPELLS', spells: data })
      if (!this.state.availableSpellLevels.length){
        this.props.dispatch({type: 'DONE PREPARING'})
      }
      this.props.exitModal()
    })
  }

  // SORT THE SPELLS BY THEIR LEVEL AND ALPHABETICAL
  // THEN, MAKE CARDS FOR EACH OF THEM
  renderKnownSpells = () => {
    let ksSortedSpellLevel = this.state.knownSpells.sort((ks1, ks2) => {
      return ks1.klass_spell.spell_level - ks2.klass_spell.spell_level
    })
    let ksSortedFilteredSpellLevel = ksSortedSpellLevel.filter(ksssl => ksssl.klass.id === this.state.activeClass)

    return ksSortedFilteredSpellLevel.map(kssfsl => <SpellPreparationCard knownSpell={kssfsl} renderClick={this.renderClick} activeSpell={this.state.activeSpell} spellLevel={this.state.spellLevel} renderSpellLevelEdit={this.renderSpellLevelEdit} renderSelectedSpell={this.renderSelectedSpell} availableSpellLevels={this.state.availableSpellLevels} preparedSpells={this.props.character.prepared_spells} goingToBePreparedSpells={this.state.selectedSpells}/>)
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
      // if the prepare button was clicked while a spell level is present
    } else {
      // grab klass spell id by going through all known spells, looking for specific chosen spell
      let selectedSpell = this.state.knownSpells.find(ks => ks.spell.id === this.state.activeSpell)
      let ksi = selectedSpell.klass_spell.id
      let klassId = selectedSpell.klass.id
      let spell = {
        spell_id: this.state.activeSpell,
        level: this.state.spellLevel,
        known_spell_id: ksi,
        klass: klassId
      }
      // add selected spell to state, reset active spell and selected spell level
      this.setState({selectedSpells: [...this.state.selectedSpells, spell], activeSpell: 0, spellLevel: "-"})
    }
  }

  displaySelectedSpells = () => {
    let activeKlass = this.props.character_info.classes.find(cl => cl.id === this.state.activeClass)


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
        if (ps.spell_level === spd.spell_level){
          remainingSpells--
        }
      })

      if (remainingSpells === 0 && this.state.availableSpellLevels.includes(spd.spell_level)){
        this.checkAvailableSpellLevel(spd.spell_level)
      }
      return <span> <strong>|</strong> <i>{th(spd.spell_level)}</i>: <strong>{(remainingSpells || remainingSpells === 0) ? remainingSpells : totalSpellsPerDay}</strong></span>
    })
  }

  remainingSpells = () => {
    let spells = []
    let preparingSpells = 'spells_per_days'
    // for each class that a character has levels in
    this.props.character_info.classes.forEach(klass => {
      //find that class
      const c = this.props.classes.find(k => k.id === klass.id)
      // does this class use spells_per_day for how many spells they can prepare
      // or do they have a separate table for prepared_amount
      let spellcasting = this.props.character_info.classes.find(cl => cl.id === c.id).spellcasting
      if (spellcasting && spellcasting.prepared_amount){
        preparingSpells = 'prepared_amounts'
      }
      // if that class has spells
      if (c && c[preparingSpells].length){
        // go through the list of spells per day,
        // and find the spells they can cast per day at their class level
        let spellsAtThisLevel = c[preparingSpells].filter(spd => {
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

  bonusSPD = (klass_id, spell_level) => {
    let spellcasting = this.props.character_info.classes.find(cl => cl.id === klass_id).spellcasting
    let ab = _.lowerCase(spellcasting.ability_score)
    if (spellcasting.prepared_amount){
      // if the class spellcasting has another table for calculating how many spells you can prepare
      // vs how many spells you can cast on a given day
      // you don't get a bonus to spells per day
      return false
    } else {
      return ((this.props.character_info.ability_scores[ab] - 10) / 2.0) >= spell_level ? true : false
    }
  }

  renderPreparedSpells = () => {
    return this.state.selectedSpells.map(ss => {
      let spell = this.state.knownSpells.find(ks => ks.spell.id === ss.spell_id).spell
      return <PreparedCard spell={spell} level={ss.level} removePreparedSpell={this.removePreparedSpell} alreadyPrepared={false}/>
    })
  }

  renderAlreadyPreparedSpell = () => {
    let klassPreparedSpells = this.props.character.prepared_spells.filter(ps => ps.klass.id === this.state.activeClass)
    return klassPreparedSpells.map(kps => <PreparedCard spell={kps.spell} level={kps.spell_level} alreadyPrepared={true}/>)
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

  removePreparedSpell = (spell_id, level) => {
    let found = false
    let filtered = this.state.selectedSpells.filter(ss => {
      if (ss.spell_id === spell_id && ss.level === level && !found){
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
      <div className="container-65-35">
        <div>
        {this.state.activeClass && this.displayClassOptions()}
        <table className='bordered-table'>
          <tr>
            <th className='bordered-table'>Level</th>
            <th className='bordered-table'>P?</th>
            <th className='bordered-table'>Spell</th>
            <th className='bordered-table'>Prepared Level</th>
          </tr>
          {this.renderKnownSpells()}
        </table>
        </div>
        <div>
          {this.state.spellsPerDay && this.displaySelectedSpells()}
          {!this.state.spellsPerDay && this.remainingSpells()}
          <table className='bordered-table'>
            <tr>
              <th className='bordered-table'>Spell</th>
              <th className='bordered-table'>Level</th>
            </tr>
            {this.state.activeClass && this.renderAlreadyPreparedSpell()}
            {this.renderPreparedSpells()}
          </table>
          {this.state.selectedSpells.length ? <button onClick={this.renderSubmit}>Prepare your spells!</button> : null}
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
