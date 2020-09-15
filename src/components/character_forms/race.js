import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Race extends React.Component{

  state = {
    races: {},
    raceAnyModifier: false
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
    return this.props.races.map(race => {
      return <option key={race.id} value={race.id}>{race.name}</option>
    })
  }

  renderChosenRace = () => {
    let chosen = this.props.races.find(el => el.id === _.toNumber(this.props.chosenRaceId))
    return <Link to={`/races/${chosen.name}`} > Info< br /></Link>
  }

  renderRacialAbilityModifiers = () => {
    let chosen = this.props.races.find(el => el.id === _.toNumber(this.props.chosenRaceId))
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

	renderAncestryCard = ancestry => {
		let style = {border: "4px solid transparent"}
		if (parseInt(this.props.chosenRaceId) === ancestry.id){style.border = "4px solid black"}
		return (
			<div className="dynamic-card" style={style} onClick={() => this.props.renderAncestryChange(ancestry.id)}>
				<button className='dynamic-card-content-button'>
					Select {ancestry.name}
				</button>
				<img className='dynamic-card-img' alt={ancestry.name} src={ancestry.img_url}></img>
			</div>
		)
	}

	renderAncestryOptions = () => {
		let ancestries = this.props.races
		if (this.props.campaignDetails) {
			ancestries = this.props.campaignDetails.races
		}
		let ancestryCards = ancestries.sort((a, b) => a.name.localeCompare(b.name)).map(this.renderAncestryCard)

		return (
			<>
				<section style={{display: "flex", flexWrap: "wrap"}}>
					{ancestryCards}
				</section>
			</>
		)

		// return (
		// 	<>
		// 		<label>Race Options </label>
		// 			<select name="race" value={this.props.chosenRaceId} onChange={(e) => this.props.renderChange(e)}>
		// 			<option value= "" >Select One</option>
		// 			{this.props.races[0] ? this.renderRaces() : null}
		// 		</select>
		// 		{this.props.races[0] && this.props.chosenRaceId ? this.renderChosenRace() : null}
		// 		{this.props.races[0] && this.props.chosenRaceId ? this.renderRacialAbilityModifiers() : null}
		// 		{this.state.raceAnyModifier ? this.renderAnyChoiceField() : null}
		// 	</>
		// )
	}

  render () {
    return (
      <div>
			{this.renderAncestryOptions()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    races: state.races
  }
}

export default withRouter(connect(mapStateToProps)(Race))
