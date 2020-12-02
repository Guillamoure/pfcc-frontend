import React from 'react'
// import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from '../localhost'
import { getFetch } from '../utils/fetches'

import CharacterHome from '../components/character_forms/home'
import Race from '../components/character_forms/race'
import Class from '../components/character_forms/class'
import Details from '../components/character_forms/details'
import Skills from '../components/character_forms/skills'

import CreationTabs from './creation_tabs'
import Navbar from '../components/character_forms/navbar'

const CharacterCreation = props => {

	const [ characterInfo, setCharacterInfo ] = React.useState({
		activeField: "",
		classes: [],
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
		activeTab: "Home",
		campaign_id: null,
		campaignDetails: null
	})

  // componentDidMount() {
    // COMMENTED OUT FOR TESTING PURPOSES
    // if (!props.currentUser){
    //   this.props.history.push("/signup")
    // } else {
    //   this.setState({activeSkillset: this.props.currentUser.skillset_id})
    // }
    // COMMENTED OUT FOR TESTING PURPOSES
  // }

	React.useEffect(() => {
		if (!!characterInfo.campaign_id){
			getFetch(`campaigns/${characterInfo.campaign_id}`)
				.then(data => {
					if (!data.error){
						setCharacterInfo({...characterInfo, campaignDetails: data})
					} else {
						// debugger
						if (data.status === 404 && data.error === "Not Found"){
							setCharacterInfo({...characterInfo, campaignDetails: {name: "Campaign Does Not Exist"}})
						}
					}
				})
				.catch(err => {
					console.log("Error with fetching campaign", err.status, err.exception)
				})
		}
	}, [characterInfo.campaign_id])

	// componentWillUpdate() {
	// 	if ((characterInfo.campaignDetails === null && !!characterInfo.campaign_id) || parseInt(characterInfo.campaign_id) !== characterInfo.campaignDetails?.id && !!characterInfo.campaign_id){
	// 		getFetch(`campaigns/${characterInfo.campaign_id}`)
	// 			.then(data => {
	// 				// debugger
	// 				this.setState({campaignDetails: data})
	// 			})
	// 			.catch(err => {
	// 				console.log("Error with fetching campaign", err.status, err.exception)
	// 			})
	// 	}
	// }

  // const renderButtonClick = (field) => {
  //   if (state.activeField === field){
  //     this.setState({activeField: ""})
  //   } else {
  //     this.setState({activeField: field})
  //   }
  // }

  const renderChange = (e) => {
		console.log(e.target.name)
		console.log(e.target.value)
		setCharacterInfo({...characterInfo, [e.target.name]: e.target.value})
		// if (e.target.name === "campaign_id"){
		// 	setCharacterInfo({...characterInfo, campaignDetails: null})
		// }
  }

	const renderAncestryChange = (id) => {
		let data = characterInfo.race === id ? 0 : id
		setCharacterInfo({...characterInfo, race: data})
	}

	const renderClassChange = (id) => {
		setCharacterInfo({...characterInfo, classes: [...characterInfo.classes, id]})
	}

	const removeLatestClass = () => {
		let classesDuplicate =  [...characterInfo.classes]
		classesDuplicate.splice(classesDuplicate.length - 1, 1)
		setCharacterInfo({...characterInfo, classes: classesDuplicate})
	}

  const renderTabClick = (choice) => {
    setCharacterInfo({...characterInfo, activeTab: choice})
  }

  const renderSubmit = () => {
		const {name, strength, dexterity, constitution, intelligence, wisdom, charisma, race, doesRacehaveAnyBonus, anyBonus} = characterInfo
    if (name && strength && dexterity && constitution && intelligence && wisdom && charisma && validClasses() && race && (doesRacehaveAnyBonus ? anyBonus : true)) {
      return <button className='create-btn' onClick={createCharacter}>Create Character!</button>
    }
  }

  const renderDynamicChanges = (e, index) => {
    let classes = [...characterInfo.classes]

    classes[index] = e.target.value
    setCharacterInfo({ ...characterInfo, classes })
  }

  const addClassField = (e, change, index) => {
    e.preventDefault()
    if (change === "plus") {
      setCharacterInfo( { ...characterInfo, classes: [...characterInfo.classes, characterInfo.classes[index]] } )
    } else if (change === "minus") {
      let removedClasses = [...characterInfo.classes]
      removedClasses.pop()
      setCharacterInfo({...characterInfo, classes: removedClasses})
    }
  }

  const validClasses = () => {
    let valid = true
    // characterInfo.classes.forEach(klass => {
    //   if (klass.level > 20 || klass.level < 1){
    //     valid = false
    //   }
    //   if (klass.classId === 0){
    //     valid = false
    //   }
    // })
    if (characterInfo.classes[characterInfo.classes.length - 1] === 0 || characterInfo.classes[characterInfo.classes.length - 1] === ""){
      valid = false
    }
    return valid
  }

  const createCharacter = () => {
    fetch(`${localhost}/api/v1/characters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        character: characterInfo,
        user_id: props.currentUser.id
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      createCharacterClass(data.character.id)
    })
  }

  const createCharacterClass = (characterId) => {
    fetch(`${localhost}/api/v1/character_klasses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        character_id: characterId,
        classes: characterInfo.classes
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      props.history.push('/characters/'+ characterId)
    })
  }

  const renderdoesHaveAnyBonus = () => {
    setCharacterInfo({...characterInfo, doesRacehaveAnyBonus: true})
  }

  const mapAbilityScores = (array) => {
    setCharacterInfo({
			...characterInfo,
      strength: array[0],
      dexterity: array[1],
      constitution: array[2],
      intelligence: array[3],
      wisdom: array[4],
      charisma: array[5]
    })
  }


  // {characterInfo.strength && characterInfo.dexterity && characterInfo.constitution && characterInfo.intelligence && characterInfo.wisdom && characterInfo.charisma && characterInfo.activeField !== "abilityScores" ? <div><strong>Ability Scores Picked!</strong></div> : null}
  // {characterInfo.race && (characterInfo.activeField !== "race") && (characterInfo.doesRacehaveAnyBonus ? characterInfo.anyBonus : true) ? <div><strong>Race Picked!</strong></div> : null}
  // {this.validClasses() && characterInfo.activeField !== "class" ? <div><strong>Class Picked!</strong></div> : null}
  // <div className='header' style={{marginLeft: '2em'}}>Character Form</div>

  // campaign tab?
  // deity selected (way in the future)
  // equipment
  // spell selection?
  // familiar selection?
  // help/how to section?

	const displayValidation = () => {
		const {strength, dexterity, constitution, intelligence, wisdom, charisma, name, race} = characterInfo
		return (
			<div id="new-character-validation-bubbles" className='centered'>
				{(strength && constitution && dexterity && intelligence && wisdom && charisma) ? <span className='complete'>Ability Scores</span> : <span className='incomplete'>Ability Scores</span>}
				{(name) ? <span className='complete'>Character Name</span> : <span className='incomplete' >Character Name</span>}
				{(this.validClasses()) ? <span className='complete' >Character Class(es)</span> : <span className='incomplete' >Character Class(es)</span>}
				{(race) ? <span className='complete' >Character Ancestry</span> : <span className='incomplete' >Character Ancestry</span>}
			</div>
		)
	}

  const displayForm = () => {
    switch(characterInfo.activeTab){
			case "Home":
				return (
					<CharacterHome renderChange={renderChange} name={characterInfo.name} campaign_id={characterInfo.campaign_id} campaignDetails={characterInfo.campaignDetails}/>
				)
      case "Details":
        return (
            <Details renderChange={renderChange} name={characterInfo.name} description={characterInfo.description} alignment={characterInfo.alignment} background={characterInfo.background} age={characterInfo.age} gender={characterInfo.gender} hair={characterInfo.hair} eyes={characterInfo.eyes} height={characterInfo.height} weight={characterInfo.weight} homeland={characterInfo.homeland} deity={characterInfo.deity} strength={characterInfo.strength}  dexterity={characterInfo.dexterity} constitution={characterInfo.constitution} intelligence={characterInfo.intelligence} wisdom={characterInfo.wisdom} charisma={characterInfo.charisma} mapAbilityScores={mapAbilityScores} campaign_id={characterInfo.campaign_id} campaignDetails={characterInfo.campaignDetails}/>
        )
      case "Ancestry":
        return (
            <Race renderAncestryChange={renderAncestryChange} chosenRaceId={characterInfo.race} anyBonus={characterInfo.anyBonus} doesRacehaveAnyBonus={characterInfo.doesRacehaveAnyBonus} renderdoesHaveAnyBonus={renderdoesHaveAnyBonus} campaignDetails={characterInfo.campaignDetails}/>
        )
      case "Class":
        return (
            <Class renderChange={renderChange} renderDynamicChanges={renderDynamicChanges} addClassField={addClassField} chosenClasses={characterInfo.classes} renderClassChange={renderClassChange} campaignDetails={characterInfo.campaignDetails} removeLatestClass={removeLatestClass}/>
        )
      case "Skills":
        return (
            <Skills activeSkillset={characterInfo.activeSkillset} renderChange={renderChange} classes={characterInfo.classes}/>
        )
      default:
        return <>Ya</>
    }
  }

	console.log("character creation state", characterInfo)
	// <CreationTabs renderTabClick={renderTabClick} activeTab={characterInfo.activeTab}/>
  return (
    <main id="character-creation-page">
			<Navbar renderTabClick={renderTabClick} activeTab={characterInfo.activeTab}/>
      <section id='creation-form'>
        {displayForm()}
        {/*<button onClick={() => renderButtonClick("abilityScores")}>{characterInfo.activeField === "abilityScores" ? "Hide Ability Score Form": "Create Your Ability Scores"}</button>*/}
        {/*<button onClick={() => renderButtonClick("race")}>{characterInfo.activeField === "race" ? "Hide Race Form": "Choose Your Fantasy Race"}</button>*/}
        {/*<button onClick={() => renderButtonClick("class")}>{characterInfo.activeField === "class" ? "Hide Class Form": "Choose Your Class"}</button>*/}
      </section>

      <div className='confirmation centered'>
        {renderSubmit()}
      </div>
    </main>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStateToProps)(CharacterCreation))
