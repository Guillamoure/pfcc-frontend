import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AbilityScores from '../components/character_show/ability_scores'


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


  render() {
    console.log(this.state.character)
    return (
      <span className="container-8">
        {this.state.character.race && <AbilityScores character={this.state.character}/>}
        <div>{this.state.character.name}</div>
        <div>{this.state.character.race ? this.state.character.race.name : null}</div>
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
