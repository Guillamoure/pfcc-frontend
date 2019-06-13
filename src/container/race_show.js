import React from 'react'
// import _ from 'lodash'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


import Introduction from '../components/race_show/introduction'
import Traits from '../components/race_show/trait_list'
import TraitForm from '../components/race_show/trait_form'
import RaceForm from  '../components/race_form'

class Race extends React.Component {

  state ={
    race : {},
    toggleTraitForm: false,
    toggleRaceForm: false
  }

  renderURL = () => {
    let url = window.location.href
    let urlArray = url.split("/")
    return urlArray[urlArray.length - 1]
  }

  componentDidMount() {
    const race = this.renderURL()
    fetch(`http://localhost:3000/api/v1/races/${race}`)
    .then(r => r.json())
    .then(data => this.setState({race: data}))
  }





  changeAddTraitToggle = () => {
    this.setState({toggleTraitForm: !this.state.toggleTraitForm})
  }
  toggleRaceForm = () => {
    this.setState({toggleRaceForm: !this.state.toggleRaceForm})
  }

  renderSubmit = (e, trait) => {
    e.preventDefault()

    fetch('http://localhost:3000/api/v1/racial_traits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        race_id: this.state.race.id,
        traits: trait
      })
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        this.renderRacialTrait(data)
      } else {
        console.log(data.error)
      }
    })
  }

  renderRaceEdit = (e, race_updates) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/races/${this.state.race.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        race_id: this.state.race.id,
        updates: race_updates
      })
    })
    .then(r => r.json())
    .then(data => {
      if(!data.error){
        this.setState({race: data.race, toggleRaceForm: false})
      } else {
        console.log(data.error)
      }
    })
  }

  renderRacialTrait = (newData) => {
    let remappedTraits
    if (Number.isInteger(newData)) {
      remappedTraits = this.state.race.racial_traits.filter(trait => {
        return trait.id !== newData
      })
    } else if (!this.state.race.racial_traits.find(el => el.id === newData.id)){
      remappedTraits = this.state.race.racial_traits
      remappedTraits.push(newData.racial_trait)
    } else if (typeof newData === 'object'){
      remappedTraits = this.state.race.racial_traits.map(trait => {
        return trait.id === newData.id ? newData : trait
      })
    }
    // console.log("this is the remapped traits", remappedTraits)
    // debugger
    return this.setState({
      race: {
        ...this.state.race,
        racial_traits: remappedTraits
      },
      toggleTraitForm: false
    })
  }


  render() {
    console.log("This is the race state", this.state.race.race_ability_score_modifiers)
    return (
      <span>
        <Introduction race={this.state.race}/>
        {this.props.admin ? <button onClick={this.toggleRaceForm}>{this.state.toggleRaceForm ? "Hide Edit Race" : "Edit Race"}</button> : null}
        < br />
        {this.state.toggleRaceForm ? <RaceForm toggleRaceForm={this.state.toggleRaceForm} race={this.state.race} renderRaceEdit={this.renderRaceEdit} history={this.props.history} /> : null }
        <Traits race={this.state.race} renderRacialTrait={this.renderRacialTrait} />

        {this.props.admin ? <button onClick={this.changeAddTraitToggle}>{this.state.toggleTraitForm ? "Hide new Trait Form" : "Add a new Race Feature"}</button> : null}
        < br />
        < br />
        <TraitForm toggleTraitForm={this.state.toggleTraitForm} renderSubmit={this.renderSubmit}/>

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

export default connect(mapStatetoProps)(Race)
