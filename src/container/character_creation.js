import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AbilityForm from '../components/character_forms/ability_scores'
import Race from '../components/character_forms/race'
import Class from '../components/character_forms/class'

class CharacterCreation extends React.Component{

  state = {
    activeField: "",
    class: 0
  }

  renderButtonClick = (field) => {
    if (this.state.activeField === field){
      this.setState({activeField: ""})
    } else {
      this.setState({activeField: field})
    }
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }



  render () {
    return (
      <span>
        <p>Bild a Bear</p>
        <button onClick={() => this.renderButtonClick("abilityScores")}>{this.state.activeField === "abilityScores" ? "Hide Ability Score Form": "Create Your Ability Scores"}</button>
        <br/>
        {this.state.activeField === "abilityScores" ? <AbilityForm /> : null}
        <br /><br />
        <button onClick={() => this.renderButtonClick("race")}>{this.state.activeField === "race" ? "Hide Race Form": "Choose Your Fantasy Race"}</button>
        <br/>
        {this.state.activeField === "race" ? <Race /> : null}
        <br /><br />
        <button onClick={() => this.renderButtonClick("class")}>{this.state.activeField === "class" ? "Hide Class Form": "Choose Your Class"}</button>
        <br/>
        {this.state.activeField === "class" ? <Class renderChange={this.renderChange} chosenClassId={this.state.class}/> : null}
        <br /><br /></
      span>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStateToProps)(CharacterCreation))
