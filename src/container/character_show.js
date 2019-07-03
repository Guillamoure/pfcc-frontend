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
import FeaturesTraits from './features_traits'
import BackgroundForm from '../modals/background_form'



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
      this.setState({character: data.character, modal: false})
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
    return (
      <span className="container-8 character">
        {this.state.character.race && <AbilityScores character={this.state.character}/>}
        {this.state.character.race && <CharacterName character={this.state.character}/>}
        {this.state.character.race && <FeaturesTraits character={this.state.character}/>}
        {this.state.character.race && <Details character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && <Saves character={this.state.character}/>}
        {this.state.character.race && <HP character={this.state.character}/>}
        {this.state.character.race && <AttackBonus character={this.state.character}/>}
        {this.state.character.race && <ArmorClass character={this.state.character}/>}

        {this.state.modal === 'background' && <BackgroundForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}

      </span>
    )
  }
}

// {this.props.currentUser.id === this.state.character.user_id ? <button className='char-edit' >Edit your Character</button> : null}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Character))
