import React from 'react'
// import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from '../localhost'
import { getFetch } from '../helper_functions/fetches'

import Race from '../components/character_forms/race'
import Class from '../components/character_forms/class'
import Details from '../components/character_forms/details'
import Skills from '../components/character_forms/skills'

import CreationTabs from './creation_tabs'

class CharacterCreation extends React.Component{

  state = {
    activeField: "",
    classes: [0],
    race: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    name: "",
    description: "",
    background: "",
    homeland: "",
    age: 0,
    gender: "",
    hair: "",
    eyes: "",
    height: "",
    weight: "",
    alignment: "",
    anyBonus: "",
    doesRacehaveAnyBonus: false,
    activeSkillset: 2,
    activeTab: "Details",
		campaign_id: null,
		campaignDetails: null
  }

  componentDidMount() {
    // COMMENTED OUT FOR TESTING PURPOSES
    // if (!this.props.currentUser){
    //   this.props.history.push("/signup")
    // } else {
    //   this.setState({activeSkillset: this.props.currentUser.skillset_id})
    // }
    // COMMENTED OUT FOR TESTING PURPOSES
  }

	componentWillUpdate() {
		if ((this.state.campaignDetails === null && !!this.state.campaign_id) || parseInt(this.state.campaign_id) !== this.state.campaignDetails?.id && !!this.state.campaign_id){
			getFetch(`campaigns/${this.state.campaign_id}`)
				.then(data => {
					this.setState({campaignDetails: data})
				})
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
		console.log(e.target.name)
		console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value})
		if (e.target.name === "campaign_id"){
			this.setState({campaignDetails: null})
		}
  }

	renderAncestryChange = (id) => {
		this.setState({race: id})
	}

	renderClassChange = (id) => {
		this.setState({classes: [id]})
	}

  renderTabClick = (choice) => {
    this.setState({activeTab: choice})
  }

  renderSubmit = () => {
    if (this.state.name && this.state.strength && this.state.dexterity && this.state.constitution && this.state.intelligence && this.state.wisdom && this.state.charisma && this.validClasses() && this.state.race && (this.state.doesRacehaveAnyBonus ? this.state.anyBonus : true)) {
      return <button className='create-btn' onClick={this.createCharacter}>Create Character!</button>
    }
  }

  renderDynamicChanges = (e, index) => {
    let classes = [...this.state.classes]

    classes[index] = e.target.value
    this.setState({ classes })
  }

  addClassField = (e, change, index) => {
    e.preventDefault()
    if (change === "plus") {
      this.setState( { classes: [...this.state.classes, this.state.classes[index]] } )
    } else if (change === "minus") {
      let removedClasses = [...this.state.classes]
      removedClasses.pop()
      this.setState({classes: removedClasses})
    }
  }

  validClasses = () => {
    let valid = true
    // this.state.classes.forEach(klass => {
    //   if (klass.level > 20 || klass.level < 1){
    //     valid = false
    //   }
    //   if (klass.classId === 0){
    //     valid = false
    //   }
    // })
    if (this.state.classes[this.state.classes.length - 1] === 0 || this.state.classes[this.state.classes.length - 1] === ""){
      valid = false
    }
    return valid
  }

  createCharacter = () => {
    fetch(`${localhost}/api/v1/characters`, {
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
    fetch(`${localhost}/api/v1/character_klasses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        character_id: characterId,
        classes: this.state.classes
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.props.history.push('/characters/'+ characterId)
    })
  }

  renderdoesHaveAnyBonus = () => {
    this.setState({doesRacehaveAnyBonus: true})
  }

  mapAbilityScores = (array) => {
    this.setState({
      strength: array[0],
      dexterity: array[1],
      constitution: array[2],
      intelligence: array[3],
      wisdom: array[4],
      charisma: array[5]
    })
  }


  // {this.state.strength && this.state.dexterity && this.state.constitution && this.state.intelligence && this.state.wisdom && this.state.charisma && this.state.activeField !== "abilityScores" ? <div><strong>Ability Scores Picked!</strong></div> : null}
  // {this.state.race && (this.state.activeField !== "race") && (this.state.doesRacehaveAnyBonus ? this.state.anyBonus : true) ? <div><strong>Race Picked!</strong></div> : null}
  // {this.validClasses() && this.state.activeField !== "class" ? <div><strong>Class Picked!</strong></div> : null}
  // <div className='header' style={{marginLeft: '2em'}}>Character Form</div>

  // campaign tab?
  // deity selected (way in the future)
  // equipment
  // spell selection?
  // familiar selection?
  // help/how to section?

  displayForm = () => {
    switch(this.state.activeTab){
      case "Details":
        return (
          <>
            <Details renderChange={this.renderChange} name={this.state.name} description={this.state.description} alignment={this.state.alignment} background={this.state.background} age={this.state.age} gender={this.state.gender} hair={this.state.hair} eyes={this.state.eyes} height={this.state.height} weight={this.state.weight} homeland={this.state.homeland} deity={this.state.deity} strength={this.state.strength}  dexterity={this.state.dexterity} constitution={this.state.constitution} intelligence={this.state.intelligence} wisdom={this.state.wisdom} charisma={this.state.charisma} mapAbilityScores={this.mapAbilityScores} campaign_id={this.state.campaign_id} campaignDetails={this.state.campaignDetails}/>
          </>
        )
      case "Ancestry":
        return (
          <>
            <Race renderAncestryChange={this.renderAncestryChange} chosenRaceId={this.state.race} anyBonus={this.state.anyBonus} doesRacehaveAnyBonus={this.state.doesRacehaveAnyBonus} renderdoesHaveAnyBonus={this.renderdoesHaveAnyBonus} campaignDetails={this.state.campaignDetails}/>
          </>
        )
      case "Class":
        return (
          <>
            <Class renderChange={this.renderChange} renderDynamicChanges={this.renderDynamicChanges} addClassField={this.addClassField} chosenClasses={this.state.classes} renderClassChange={this.renderClassChange} campaignDetails={this.state.campaignDetails}/>
          </>
        )
      case "Skills":
        return (
          <>
            <Skills activeSkillset={this.state.activeSkillset} renderChange={this.renderChange} classes={this.state.classes}/>
          </>
        )
      default:
        return <>Ya</>
    }
  }

  render () {
		console.log("character creation state", this.state)
    return (
      <>

        <CreationTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
        <span id='creation-form'>

          {this.displayForm()}
          {/*<button onClick={() => this.renderButtonClick("abilityScores")}>{this.state.activeField === "abilityScores" ? "Hide Ability Score Form": "Create Your Ability Scores"}</button>*/}
          {/*<button onClick={() => this.renderButtonClick("race")}>{this.state.activeField === "race" ? "Hide Race Form": "Choose Your Fantasy Race"}</button>*/}
          {/*<button onClick={() => this.renderButtonClick("class")}>{this.state.activeField === "class" ? "Hide Class Form": "Choose Your Class"}</button>*/}
        </span>
        <div id="new-character-validation-bubbles" className='centered'>
          {(this.state.strength && this.state.constitution && this.state.dexterity && this.state.intelligence && this.state.wisdom && this.state.charisma) ? <span className='complete'>Ability Scores</span> : <span className='incomplete'>Ability Scores</span>}
          {(this.state.name) ? <span className='complete'>Character Name</span> : <span className='incomplete' >Character Name</span>}
          {(this.validClasses()) ? <span className='complete' >Character Class(es)</span> : <span className='incomplete' >Character Class(es)</span>}
          {(this.state.race) ? <span className='complete' >Character Ancestry</span> : <span className='incomplete' >Character Ancestry</span>}
        </div>
        <div className='confirmation centered'>
          {this.renderSubmit()}
        </div>
      </>
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
