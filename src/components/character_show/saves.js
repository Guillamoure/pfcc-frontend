import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'



class Saves extends React.Component {

  renderSave = (num, save) => {
    if (save === 0.5){
      return _.floor(num * save) + 2
    } else if (save === 0.34){
      return _.floor(num * save)
    }
  }

  renderClassAbilityScoreModifiers = (scoreName) => {
    let score = this.props.character[scoreName]
    this.props.character.race.race_ability_score_modifiers.forEach(mod => {
      if (_.capitalize(scoreName) === mod.ability_score){
        score += mod.bonus
      }
    })
    if (this.props.character.any_bonus === _.capitalize(scoreName)){
      score +=2
    }
    return score
  }

  renderCharacterSave = (save, score) => {
    let totalSavingThrow = 0
    let klass_ids = {}
    this.props.character.character_klasses.forEach(klass => {
      klass_ids[klass.klass_id] = klass.level
    })
    this.props.character.klasses.forEach(klass => {
      totalSavingThrow += this.renderSave(klass_ids[klass.id], klass[save])
    })
    const mod = Math.floor((this.renderClassAbilityScoreModifiers(score) - 10) / 2)
    totalSavingThrow += mod
    return totalSavingThrow < 0 ? totalSavingThrow : `+${totalSavingThrow}`
  }


  render(){
    console.log(this.props.character)
    return(
      <div id='saves' className='container-3'>
        <div id='saving-throw-title'>Saving Throws</div>
        <span className='centered' >
          <div className='enhanced'>{this.renderCharacterSave('fortitude', 'constitution')}</div>
          <div className='muted'><strong>Fortitude</strong></div>
        </span>
        <span className='centered' >
          <div className='enhanced'>{this.renderCharacterSave('reflex', 'dexterity')}</div>
          <div className='muted'><strong>Reflex</strong></div>
        </span>
        <span className='centered' >
          <div className='enhanced'>{this.renderCharacterSave('will', 'wisdom')}</div>
          <div className='muted'><strong>Will</strong></div>
        </span>
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


export default withRouter(connect(mapStateToProps)(Saves))
