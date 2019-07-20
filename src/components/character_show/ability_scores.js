import React from 'react'
import { withRouter } from 'react-router-dom'
// import _ from 'lodash'
import { connect } from 'react-redux'
import Ability from './ability'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

class AbilityScores extends React.Component {

  renderAbilityScoreModifiers = () => {
    if(this.props.race.race_ability_score_modifiers){
      let mods = this.props.race.race_ability_score_modifiers
      let modStrings = []
      mods.forEach(mod => {
        let bonus = mod.bonus < 0 ? mod.bonus : `+${mod.bonus}`
        modStrings.push(`${bonus} ${mod.ability_score}`)
      })
      return modStrings.join(", ")
    }
  }

  renderEditAbilityToggle = () => {
    let numOfContainers = 'ability'
    if (this.props.character.user_id === this.props.currentUser.id){
      numOfContainers += ' container-7'
    } else {
      numOfContainers += ' container-6'
    }
    return numOfContainers
  }

  render () {
    return (
      <div className={this.renderEditAbilityToggle()}>
        <Ability ability={this.props.character.strength} name={'Strength'} racialModifiers={this.props.character.race.race_ability_score_modifiers} anyBonus={this.props.character.any_bonus}/>
        <Ability ability={this.props.character.dexterity} name={'Dexterity'} racialModifiers={this.props.character.race.race_ability_score_modifiers} anyBonus={this.props.character.any_bonus}/>
        <Ability ability={this.props.character.constitution} name={'Constitution'} racialModifiers={this.props.character.race.race_ability_score_modifiers} anyBonus={this.props.character.any_bonus}/>
        <Ability ability={this.props.character.intelligence} name={'Intelligence'} racialModifiers={this.props.character.race.race_ability_score_modifiers} anyBonus={this.props.character.any_bonus}/>
        <Ability ability={this.props.character.wisdom} name={'Wisdom'} racialModifiers={this.props.character.race.race_ability_score_modifiers} anyBonus={this.props.character.any_bonus}/>
        <Ability ability={this.props.character.charisma} name={'Charisma'} racialModifiers={this.props.character.race.race_ability_score_modifiers} anyBonus={this.props.character.any_bonus}/>
        {this.props.character.user_id === this.props.currentUser.id && <span className='edit' onClick={() => this.props.editModal('ability')}><FontAwesomeIcon icon={faPencilAlt} /></span>}

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


export default withRouter(connect(mapStateToProps)(AbilityScores))
