import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AbilityScores from '../components/character_show/ability_scores'
import CharacterName from '../components/character_show/character_name'
import Saves from '../components/character_show/saves'
import HP from '../components/character_show/hp'
import ArmorClass from '../components/character_show/ac'
import AttackBonus from '../components/character_show/attack_bonus'
import Details from '../components/character_show/details'
import Skills from '../components/character_show/skills'
import FeaturesTraits from './features_traits'
import Actions from './actions'
import Initiative from '../components/character_show/initiative'

import BackgroundForm from '../modals/background_form'
import CharacterForm from '../modals/character_form'
import AbilityForm from '../modals/ability_form'
import Notifications from '../modals/notifications'
import HPChanges from '../modals/hp_changes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'




class Character extends React.Component {

  state = {
    character: {},
    modal: false,
    display: "Adventure"
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1${this.props.location.pathname}`)
    .then(r => r.json())
    .then(data => {
      // IF YOU WANT THE PAGE TO BE PRIVATE
      // if (this.props.currentUser.id === data.character.user.id){
        this.props.dispatch({type: 'CHARACTER', character: data.character })
        this.dispatchAbilityScores()
        this.dispatchClassLevels()
        this.setState({character: data.character})
      // } else {
      //   this.props.history.push('/')
      // }
    })
  }

  //
  // getCharacterClassFeatures = (klasses) => {
  //   let klass_features = []
  //   let klass_ids = klasses.map(klass => klass.id)
  //   debugger
  //   klasses.forEach(klass => {
  //     fetch(`http://localhost:3000/api/v1/klass_features/${klass.id}`)
  //     .then(r => r.json())
  //     .then(data => {
  //       klass_features.push(data)
  //     })
  //   })
  //   debugger
  //   this.setState({classFeatures: _.flatten(klass_features)})
  // }

  renderAbilityScoreCalc = (ability) => {
    const downcaseAbility = _.lowerCase(ability)
    let score = this.props.character[downcaseAbility]
    this.props.character.race.race_ability_score_modifiers.forEach(mod => {
      if (ability === mod.ability_score){
        score += mod.bonus
      }
    })
    if (this.props.character.any_bonus === ability){
      score +=2
    }
    this.props.dispatch({type: 'ABILITY SCORE', ability: downcaseAbility, score: score })
  }

  dispatchClassLevels = () => {
    // let charKlassesLevels = {}
    // this.props.character.character_klasses.forEach(charKlass => {
    //   if (charKlassesLevels[charKlass.klass_id]) {
    //     charKlassesLevels[charKlass.klass_id]++
    //   } else {
    //     charKlassesLevels[charKlass.klass_id] = 1
    //   }
    // })
    let cKArray = []
    let completedClasses = []
    this.props.character.character_klasses.forEach(cK => {
      const id = cK.klass_id
      if (!completedClasses.includes(id)){
        const level = this.props.character.character_klasses.filter(ck => ck.klass_id === id).length
        completedClasses.push(id)
        const classInfo = {id, level}
        // look to see if there are any cast spells for the given class
        const castSpellsForThisClass = this.props.character.cast_spells.filter(cs => cs.klass_id === id)
        // if (castSpellsForThisClass[0]){
        const castSpells = {}
        const transformedCastSpellsToLevelCast = castSpellsForThisClass.map(cs => cs.spell_level)
        transformedCastSpellsToLevelCast.forEach(lvl => {
          castSpells[lvl] ? castSpells[lvl] = castSpells[lvl] + 1 : castSpells[lvl] = 1
        })
        classInfo.castSpells = castSpells
        // }
        cKArray.push(classInfo)
      }
    })
    // debugger
    this.props.dispatch({type: 'CHARACTER_CLASSES', classes: cKArray})
  }

  dispatchAbilityScores = () => {
    // this.props.dispatch({type: 'CHARACTER', character: this.state.character })
    this.renderAbilityScoreCalc("Strength")
    this.renderAbilityScoreCalc("Dexterity")
    this.renderAbilityScoreCalc("Constitution")
    this.renderAbilityScoreCalc("Intelligence")
    this.renderAbilityScoreCalc("Wisdom")
    this.renderAbilityScoreCalc("Charisma")
  }

  renderEdit = (info, details) => {
    fetch(`http://localhost:3000/api/v1/${details}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.props.dispatch({type: 'CHARACTER', character: data.character })
      this.setState({character: data.character, modal: false}, this.dispatchAbilityScores(), this.dispatchClassLevels())
    })
  }

  editModal = (section) => {
    this.setState({modal: section})
  }

  clickOut = (e) => {
    if(e.target.classList[0] === "page-dimmer"){
      this.setState({modal: false})
    }
  }
  exitModal = () => {
    this.setState({modal: false})
  }

  rightArrow = () => {
    switch(this.state.display){
      case "Adventure":
        return "Character";
      case "Combat":
        return "Adventure";
      case "Character":
        return "Combat";
      default:
        return "Character"
    }
  }

  leftArrow = () => {
    switch(this.state.display){
      case "Adventure":
        return "Combat";
      case "Combat":
        return "Character";
      case "Character":
        return "Adventure";
      default:
        return "Combat"
    }
  }


  render() {
    //
    console.log("redux character adding", this.props)
    //
    return (
      <span className="container-8 character">
        {this.state.character.race && <CharacterName character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && this.state.display === "Adventure" && <AbilityScores character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && this.state.display === "Adventure" && <FeaturesTraits character={this.state.character}/>}
        {this.state.character.race && this.state.display === "Character" && <Details character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && (this.state.display === "Adventure" || this.state.display === "Combat") && <Saves character={this.state.character} display={this.state.display}/>}
        {this.state.character.race && (this.state.display === "Adventure" || this.state.display === "Combat") && <HP character={this.state.character} editModal={this.editModal} display={this.state.display}/>}
        {this.state.character.race && this.state.display === "Combat" && <AttackBonus character={this.state.character}/>}
        {this.state.character.race && this.state.display === "Combat" && <ArmorClass character={this.state.character}/>}
        {this.state.character.race && this.state.display === "Adventure" && <Skills character={this.state.character}/>}
        {this.state.character.race && this.state.display === "Combat" && <Actions character={this.state.character}/>}
        {this.state.character.race && this.state.display === "Combat" && <Initiative character={this.state.character}/>}


        {this.state.modal === 'background' && <BackgroundForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'character' && <CharacterForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'ability' && <AbilityForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'notifications' && <Notifications exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'hitPoints' && <HPChanges exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}

        <div id='right' onClick={() => this.setState({display: this.rightArrow()})}><FontAwesomeIcon icon={faCaretRight} size='9x'/><div>{this.rightArrow()}</div></div>
        <div id='left' onClick={() => this.setState({display: this.leftArrow()})}><FontAwesomeIcon icon={faCaretLeft} size='9x'/><div>{this.leftArrow()}</div></div>

      </span>
    )
  }
}

// {this.props.currentUser.id === this.state.character.user_id ? <button className='char-edit' >Edit your Character</button> : null}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default withRouter(connect(mapStatetoProps)(Character))
