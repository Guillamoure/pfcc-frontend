import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AbilityScores from '../components/character_show/ability_scores'
import CharacterName from '../components/character_show/character_name'
import Saves from '../components/character_show/saves'
import HP from '../components/character_show/hp'
import Details from '../components/character_show/details'
import FeaturesTraits from './features_traits'


class Character extends React.Component {

  state = {
    character: {}
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


  render() {
    console.log(this.state.classFeatures)
    return (
      <span className="container-8 character">
        {this.state.character.race && <AbilityScores character={this.state.character}/>}
        {this.state.character.race && <CharacterName character={this.state.character}/>}
        {this.state.character.race && <FeaturesTraits character={this.state.character}/>}
        {this.state.character.race && <Details character={this.state.character}/>}
        {this.state.character.race && <Saves character={this.state.character}/>}
        {this.state.character.race && <HP character={this.state.character}/>}


      </span>
    )
  }

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Character))
