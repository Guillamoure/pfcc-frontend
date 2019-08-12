import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import SkillRanks from '../../components/skill_ranks'


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
      return <SkillRanks />
    }
  }

  render(){
    return(
      <span style={{padding: '1em'}}>
        <p>Things to update</p>
        {this.addSkillRanks()}
      </span>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Update)
