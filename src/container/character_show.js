import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
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

import BackgroundForm from '../modals/background_form'
import CharacterForm from '../modals/character_form'
import AbilityForm from '../modals/ability_form'
import Notifications from '../modals/notifications'



class Character extends React.Component {

  state = {
    character: {},
    modal: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1${this.props.location.pathname}`)
    .then(r => r.json())
    .then(data => {
      // IF YOU WANT THE PAGE TO BE PRIVATE
      // if (this.props.currentUser.id === data.character.user.id){
        this.props.dispatch({type: 'CHARACTER', character: data.character })
        this.renderAbilityScoreCalc("Strength")
        this.renderAbilityScoreCalc("Dexterity")
        this.renderAbilityScoreCalc("Constitution")
        this.renderAbilityScoreCalc("Intelligence")
        this.renderAbilityScoreCalc("Wisdom")
        this.renderAbilityScoreCalc("Charisma")
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
    if (this.props.character.anyBonus === ability){
      score +=2
    }
    this.props.dispatch({type: 'ABILITY SCORE', ability: downcaseAbility, score: score })
  }

  renderReduxAbilityScores = () => {
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
      this.setState({character: data.character, modal: false}, this.renderReduxAbilityScores())
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


  render() {
    console.log("redux character adding", this.props.character_info)
    return (
      <span className="container-8 character">
        {this.state.character.race && <AbilityScores character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && <CharacterName character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && <FeaturesTraits character={this.state.character}/>}
        {this.state.character.race && <Details character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && <Saves character={this.state.character}/>}
        {this.state.character.race && <HP character={this.state.character}/>}
        {this.state.character.race && <AttackBonus character={this.state.character}/>}
        {this.state.character.race && <ArmorClass character={this.state.character}/>}
        {this.state.character.race && <Skills character={this.state.character}/>}

        {this.state.modal === 'background' && <BackgroundForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'character' && <CharacterForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'ability' && <AbilityForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'notifications' && <Notifications editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}

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
