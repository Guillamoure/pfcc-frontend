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

  renderPolymorph = (ability) => {
    let bonus = 0
    let minor = this.props.character_info.hardcode.minor
    let major = this.props.character_info.hardcode.major
    const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major'].includes(major)
    switch(ability){
      case "strength":
        if (minor === "Bull - Minor"){
          bonus++
          break
        }
        if (largeMorph){
          bonus +=2
          break
        }
      case "dexterity":
        if (largeMorph){
          bonus--
          break
        }
      default:
        break
    }
    return bonus
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

  renderSize = (size) => {
    switch(size){
      case "Fine":
        return 8;
      case "Diminutive":
        return 4;
      case "Tiny":
        return 2;
      case "Small":
        return 1;
      case "Large":
        return -1;
      case "Huge":
        return -2;
      case "Gargantuan":
        return -4;
      case "Colossal":
        return -8;
      default:
        return 0;
    }
  }

  renderAB = (ability) => {
    if(this.props.character_info.classes && this.props.classes){

      let ab = 0
      this.props.character_info.classes.forEach(klass => {
        let currentClass = this.props.classes.find(ck => ck.id === parseInt(klass.id))
        ab += Math.floor(this.renderBAB(currentClass.hit_die) * klass.level)

      })
      // for (var klass_id in this.props.character_info.classes){
      //   // find the class' info from the id
      //   let currentClass = this.props.character.klasses.find(ck => ck.id === parseInt(klass.id))
      //   // send the character's level in that class, and the relevant saving throw value
      //   ab += Math.floor(this.renderBAB(currentClass.hit_die) * this.props.character_info.classes[klass_id])
      // }
      ab += this.renderSize(this.props.character_info.size)
      ab += this.renderAbilityScoreModifiers(ability)
      ab += this.renderPolymorph(ability)
      return ab < 0 ? ab : `+${ab}`
    }
  }

  render () {
    return(
      <div id='attack-bonus' className='shadow shrink'>
        <span className='centered'>
          <div className='duller'><strong>Attack Bonus</strong></div>
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
    character_info: state.character_info,
    classes: state.classes
  }
}


export default connect(mapStateToProps)(AttackBonus)
