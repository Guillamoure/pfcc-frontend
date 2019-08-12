import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'


class AttackBonus extends React.Component {

  renderAbilityScoreModifiers = (scoreName) => {
    let score = this.props.character[scoreName]
    this.props.character.race.race_ability_score_modifiers.forEach(mod => {
      if (_.capitalize(scoreName) === mod.ability_score){
        score += mod.bonus
      }
    })
    if (this.props.character.any_bonus === _.capitalize(scoreName)){
      score +=2
    }
    return Math.floor( ( score - 10 ) / 2)
  }

  renderBAB = (hd) => {
    switch (hd){
      case 6:
        return 0.5;
      case 8:
        return 0.75;
      case 10:
        return 1;
      case 12:
        return 1;
      default:
        return 1;
    }
  }

  renderAB = (ability) => {
    let ab = 0
    let klass_ids = {}
    this.props.character.character_klasses.forEach(klass => {
      klass_ids[klass.klass_id] = klass.level
    })
    this.props.character.klasses.forEach(klass => {
      ab += Math.floor(this.renderBAB(klass.hit_die) * this.props.character_info.classes[klass.id])
    })
    if (this.props.character.race.size === 'Small'){
      ab += 1
    }
    ab += this.renderAbilityScoreModifiers(ability)
    return ab < 0 ? ab : `+${ab}`
  }

  render () {
    return(
      <div id='attack-bonus' >
        <span className='centered'>
          <div className='dull'><strong>Attack Bonus</strong></div>
          <div className='container-2'>
            <span className='enhanced'>{this.renderAB('strength')}</span>
            <span className='enhanced'>{this.renderAB('dexterity')}</span>
            <span>Melee</span>
            <span>Ranged</span>
          </div>
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


export default connect(mapStateToProps)(AttackBonus)
