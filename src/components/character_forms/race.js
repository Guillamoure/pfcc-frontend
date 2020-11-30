import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { pluser } from '../../utils/fuf'

const Race = props => {

	const [ ancestryDetails, setAncestryDetails ] = React.useState({
    races: [],
    raceAnyModifier: false
  })
	const [ showDetails, toggleDetails ] = React.useState(false)

  const renderAnyChoiceField = () => {
    if (!props.doesRacehaveAnyBonus){
      props.renderdoesHaveAnyBonus()
    }
    return (
      <div>
        <label>For your Race, you can choose any one score to give a +2 bonus to any one Ability of your Choice!</label>
        <select value={props.anyBonus} onChange={(e) => props.renderChange(e)} name='anyBonus'>
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

  const renderRaces = () => {
    return props.races.map(race => {
      return <option key={race.id} value={race.id}>{race.name}</option>
    })
  }

  const renderRacialAbilityModifiers = () => {
    let chosen = props.races.find(el => el.id === _.toNumber(props.chosenRaceId))
    return <span>{renderAbilityScoreModifiers(chosen)}</span>
  }

  const renderAbilityScoreModifiers = (chosen) => {
    let mods = chosen.race_ability_score_modifiers
    let modStrings = []
    mods.forEach(mod => {
      if (mod.ability_score === 'Any' && !ancestryDetails.raceAnyModifier) {
        setAncestryDetails({...ancestryDetails, raceAnyModifier: true})
      }
      let bonus = mod.bonus < 0 ? mod.bonus : `+${mod.bonus}`
      modStrings.push(`${bonus} ${mod.ability_score}`)
    })
    return modStrings.join(", ")
  }

	const renderAncestryCard = ancestry => {
		// let style = {border: "4px solid transparent"}
		// let styleID = ""
		// if (parseInt(props.chosenRaceId) === ancestry.id){
		// 	style = {}
		// 	styleID += "chosen-ancestry-card"
		// }
		return (
			<div className="dynamic-card" style={{border: "4px solid transparent"}} onClick={() => props.renderAncestryChange(ancestry.id)}>
				<img className='dynamic-card-img' alt={ancestry.name} src={ancestry.img_url}></img>
				<p className='dynamic-card-content-button'> {ancestry.name} </p>
			</div>
		)
	}

	const renderAncestryOptions = () => {
		let ancestries = props.races
		if (props.campaignDetails?.races.length > 1) {
			ancestries = props.campaignDetails.races
		}

		let ancestryCards = ancestries.filter(an => an.id !== props.chosenRaceId)
		let chosenAncestry = ancestries.find(an => an.id === props.chosenRaceId)

		ancestryCards = ancestryCards.sort((a, b) => a.name.localeCompare(b.name)).map(renderAncestryCard)


		return (
			<section id="character-creation-ancestry-all">
				{ancestryCards}
			</section>
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

	const renderAncestryImage = () => {
		let ancestry = props.races.find(an => an.id === props.chosenRaceId)
		return (
			<div id="chosen-ancestry-card" className="dynamic-card" onClick={() => props.renderAncestryChange(ancestry.id)}>
				<img className='dynamic-card-img' alt={ancestry.name} src={ancestry.img_url}></img>
				<p className='dynamic-card-content-button'> {ancestry.name} </p>
			</div>
		)
	}

	const renderAncestryDetails = () => {
		let selectedAncestry = props.races.find(a => a.id === props.chosenRaceId)
		const { name, size, speed, description } = selectedAncestry

		let abilityScores = selectedAncestry.race_ability_score_modifiers.map(asm => {
			return `${pluser(asm.bonus)} ${asm.ability_score}`
		}).join(", ")

		let traits = selectedAncestry.racial_traits.map(tr => {
			return <li><strong>{tr.name}:</strong> {tr.description}</li>
		})

		let details = description.split("\n\n").map(d => <p>{d}</p>)

		return (
			<aside id="character-creation-ancestry-chosen">
				<h4>{name}</h4>
				<p onClick={() => toggleDetails(!showDetails)}>{showDetails ? details : "Show Details"}</p>
				<ul>
					<li><strong>{abilityScores}</strong></li>
					<li><strong>Size:</strong> {size}</li>
					<li><strong>Speed:</strong> {speed} ft</li>
					{traits}
				</ul>
			</aside>
		)
	}

	const className = !!props.chosenRaceId ? "chosen-ancestry" : ""

  return (
    <section id="character-creation-ancestry" className={className}>
			{!props.chosenRaceId && renderAncestryOptions()}
			{!!props.chosenRaceId && renderAncestryImage()}
			{!!props.chosenRaceId && renderAncestryDetails()}
			{!!props.chosenRaceId && <button onClick={() => props.renderAncestryChange(0)}>Go Back</button>}
    </section>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    races: state.races
  }
}

export default withRouter(connect(mapStateToProps)(Race))
