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
        <Ability name={'Strength'} ability_score={this.props.character_info.ability_scores.strength}/>
        <Ability name={'Dexterity'} ability_score={this.props.character_info.ability_scores.dexterity}/>
        <Ability name={'Constitution'} ability_score={this.props.character_info.ability_scores.constitution}/>
        <Ability name={'Intelligence'} ability_score={this.props.character_info.ability_scores.intelligence}/>
        <Ability name={'Wisdom'} ability_score={this.props.character_info.ability_scores.wisdom}/>
        <Ability name={'Charisma'} ability_score={this.props.character_info.ability_scores.charisma}/>
        {this.props.character.user_id === this.props.currentUser.id && <span className='edit' onClick={() => this.props.editModal('ability')}><FontAwesomeIcon icon={faPencilAlt} /></span>}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character_info: state.character_info
  }
}


export default withRouter(connect(mapStateToProps)(AbilityScores))
