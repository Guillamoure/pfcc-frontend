import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Race extends React.Component{

  state = {
    races: {},
    raceAnyModifier: false
  }


  componentDidMount() {
    fetch('http://localhost:3000/api/v1/races')
    .then(r => r.json())
    .then(data => {
      this.setState({races: data})
    })
  }

  // componentWillUpdate() {
  //   if (mod.ability_score !== 'Any' && this.state.raceAnyModifier) {
  //     this.setState({raceAnyModifier: false})
  //   }
  // }

  renderAnyChoiceField = () => {
    if (!this.props.doesRacehaveAnyBonus){
      this.props.renderdoesHaveAnyBonus()
    }
    return (
      <div>
        <label>For your Race, you can choose any one score to give a +2 bonus to any one Ability of your Choice!</label>
        <select value={this.props.anyBonus} onChange={(e) => this.props.renderChange(e)} name='anyBonus'>
          <option value= "" >Choose One</option>
          <option value= "Strength" >Strength</option>
          <option value= "Dexterity" >Dexterity</option>
          <option value= "Constitution" >Constitution</option>
          <option value= "Intelligence" >Intelligence</option>
          <option value= "Wisdom" >Wisdom</option>
          <option value= "Charisma" >Charisma</option>
        </select>
      </div>
    )
  }

  renderRaces = () => {
    return this.state.races.map(race => {
      return <option key={race.id} value={race.id}>{race.name}</option>
    })
  }

  renderChosenRace = () => {
    let chosen = this.state.races.find(el => el.id === _.toNumber(this.props.chosenRaceId))
    return <Link to={`/races/${chosen.name}`} > Info< br /></Link>
  }

  renderRacialAbilityModifiers = () => {
    let chosen = this.state.races.find(el => el.id === _.toNumber(this.props.chosenRaceId))
    return <span>{this.renderAbilityScoreModifiers(chosen)}</span>
  }

  renderAbilityScoreModifiers = (chosen) => {
    let mods = chosen.race_ability_score_modifiers
    let modStrings = []
    mods.forEach(mod => {
      if (mod.ability_score === 'Any' && !this.state.raceAnyModifier) {
        this.setState({raceAnyModifier: true})
      }
      let bonus = mod.bonus < 0 ? mod.bonus : `+${mod.bonus}`
      modStrings.push(`${bonus} ${mod.ability_score}`)
    })
    return modStrings.join(", ")
  }

  render () {
    return (
      <div className='second-col centered'>
      <label>Race Options </label>
        <select name="race" value={this.props.chosenRaceId} onChange={(e) => this.props.renderChange(e)}>
          <option value= "" >Select One</option>
          {this.state.races[0] ? this.renderRaces() : null}
        </select>
      {this.state.races[0] && this.props.chosenRaceId ? this.renderChosenRace() : null}
      {this.state.races[0] && this.props.chosenRaceId ? this.renderRacialAbilityModifiers() : null}
      {this.state.raceAnyModifier ? this.renderAnyChoiceField() : null}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStateToProps)(Race))
