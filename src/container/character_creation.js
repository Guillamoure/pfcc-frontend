import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AbilityForm from '../components/character_forms/ability_scores'
import Race from '../components/character_forms/race'
import Class from '../components/character_forms/class'
import Details from '../components/character_forms/details'

class CharacterCreation extends React.Component{

  state = {
    activeField: "",
    class: 0,
    race: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    name: "",
    description: ""
  }

  componentDidMount() {
    if (!this.props.currentUser){
      this.props.history.push("/signup")
    }
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

  renderSubmit = () => {
    if (this.state.name && this.state.strength && this.state.dexterity && this.state.constitution && this.state.intelligence && this.state.wisdom && this.state.charisma && this.state.class && this.state.race) {
      return <button onClick={this.createCharacter}>Create Character!</button>
    }
  }

  createCharacter = () => {
    fetch('http://localhost:3000/api/v1/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        character: this.state,
        user_id: this.props.currentUser.id
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.createCharacterClass(data.character.id)
    })
  }

  createCharacterClass = (characterId) => {
    fetch('http://localhost:3000/api/v1/character_klasses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        character_id: characterId,
        klass_id: this.state.class
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      debugger
      this.props.history.push('/')
    })
  }



  render () {
    return (
      <span>
        <p>Bild a Bear</p>
        <Details renderChange={this.renderChange} name={this.state.name} description={this.state.description} />
        <button onClick={() => this.renderButtonClick("abilityScores")}>{this.state.activeField === "abilityScores" ? "Hide Ability Score Form": "Create Your Ability Scores"}</button>
        {this.state.strength && this.state.dexterity && this.state.constitution && this.state.intelligence && this.state.wisdom && this.state.charisma && this.state.activeField !== "abilityScores" ? <span><strong>Ability Scores Picked!</strong></span> : null}
        <br/>
        {this.state.activeField === "abilityScores" ? <AbilityForm  renderChange={this.renderChange} strength={this.state.strength}  dexterity={this.state.dexterity} constitution={this.state.constitution} intelligence={this.state.intelligence} wisdom={this.state.wisdom} charisma={this.state.charisma} /> : null}
        <br /><br />
        <button onClick={() => this.renderButtonClick("race")}>{this.state.activeField === "race" ? "Hide Race Form": "Choose Your Fantasy Race"}</button>
        {this.state.race && this.state.activeField !== "race" ? <span><strong>Race Picked!</strong></span> : null}

        <br/>
        {this.state.activeField === "race" ? <Race renderChange={this.renderChange} chosenRaceId={this.state.race}/> : null}
        <br /><br />
        <button onClick={() => this.renderButtonClick("class")}>{this.state.activeField === "class" ? "Hide Class Form": "Choose Your Class"}</button>
        {this.state.class && this.state.activeField !== "class" ? <span><strong>Class Picked!</strong></span> : null}
        <br/>
        {this.state.activeField === "class" ? <Class renderChange={this.renderChange} chosenClassId={this.state.class}/> : null}
        <br /><br />
        {this.renderSubmit()}
      </span>
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
