import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import SkillRanks from '../../components/skill_ranks'
import PrepareSpells from '../../components/prepare_spells'


class Update extends React.Component {

  state= {
    activeProblem: ""
  }

  needsRanks = () => {
    if (this.props.character.character_skillset_skills.length === 0){
      return true
    }
    let totalSkillRanks = 0
    this.props.character.klasses.forEach(klass => {
      totalSkillRanks += klass.skill_ranks
    })
    let appliedSkillRanks = 0
    this.props.character.character_skillset_skills.forEach(chsss => {
      appliedSkillRanks += chsss.ranks
    })
    if (appliedSkillRanks < totalSkillRanks){
      return true
    } else {
      return false
    }
  }

  addSkillRanks = () => {
    if (this.needsRanks() && this.state.activeProblem !== "Ranks"){
      return <div onClick={() => this.setState({activeProblem: "Ranks"})}><FontAwesomeIcon icon={faExclamationTriangle} color='#ffd800' />You have some Skill Ranks to spend</div>
    }
    if (this.needsRanks() && this.state.activeProblem === "Ranks"){
      return <SkillRanks exitModal={this.props.exitModal}/>
    }
  }

  isThisCasterPrepared = (klassId) => {
    // REFACTOR
    // Doesn't check to see if spells can be cast at their current level
    // Just at all levels
    // Paladin/Ranger at lvl 4/3, etc.
    let klass = this.props.classes.find(cl => cl.id === klassId)
    let spellcasting = klass.klass_features.find(kf => kf.spellcasting).spellcasting
    return spellcasting.prepared
  }

  prepareSpells = () => {
    let prepared = false
    this.props.character.klasses.forEach(kl => {
      if (this.isThisCasterPrepared(kl.id)){
        prepared = true
      }
    })
    if (!this.props.character.is_done_preparing_spells && prepared && this.state.activeProblem !== "Prepare"){
      return <div onClick={() => this.setState({activeProblem: "Prepare"})}><FontAwesomeIcon icon={faExclamationTriangle} color='#ffd800' />You have to prepare your spells!</div>
    }
    if (!this.props.character.is_done_preparing_spells && prepared && this.state.activeProblem === "Prepare"){
      return <PrepareSpells exitModal={this.props.exitModal}/>
    }
  }

  render(){
    return(
      <span style={{padding: '1em'}}>
        <p>Things to update</p>
        {this.addSkillRanks()}
        {this.prepareSpells()}
      </span>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(Update)
