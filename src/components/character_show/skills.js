import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'



class Skills extends React.Component {

  state = {
    skillset: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/skillsets/${this.props.character.skillset.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({skillset: data.skillset})
    })
  }

  renderSkillBonus = (skill) => {
    const score = this.props.character_info.ability_scores[_.lowerCase(skill.ability_score)]
    let mod = Math.floor((score - 10) / 2)
    let skillRanks = this.renderNumOfRanks(skill)
      mod += skillRanks
    if (this.renderClassSkill(skill) && skillRanks > 0){
      mod += 3
    }
    return mod < 0 ? mod : `+${mod}`
  }

  renderNumOfRanks = (skill) => {
    let skillRanks = this.props.character.character_skillset_skills.find(chsss => chsss.skill_id === skill.id)
    return skillRanks !== undefined ? skillRanks.ranks : 0
  }

  renderClassSkill = (skill) => {
    let isThisAClassSkill = false
    this.props.character.klasses.forEach(klass => {
      klass.class_skillset_skills.forEach(csss => {
        if (csss.skill_id === skill.id && csss.skillset_id === this.props.character.skillset.id) {
          isThisAClassSkill = true
        }
      })
    })
    return isThisAClassSkill
  }

  renderSkillTableRow = () => {
    const sortedSkills = this.state.skillset.skills.sort((a,b) => a.name > b.name ? 1 : -1)
    return sortedSkills.map(skill => {
      return (
        <tr key={_.random(1, 2000000)}>
          <td>{this.renderClassSkill(skill) ? "X" : null}</td>
          <td><strong>{skill.ability_score.slice(0, 3)}</strong></td>
          <td>{skill.name}</td>
          <td>{this.renderSkillBonus(skill)}</td>
          <td>{this.renderNumOfRanks(skill)}</td>
        </tr>
      )}
    )
  }

  renderSkillsTable = () => {
    return (
      <table>
        <thead >
          <tr >
            <th >Class</th>
            <th >Ability</th>
            <th >Skill</th>
            <th >Bonus</th>
            <th >Ranks</th>
          </tr>
        </thead>
        <tbody >
          {this.renderSkillTableRow()}
        </tbody>
      </table>
    )
  }


  render(){
    return(
      <div id='skills' className='shadow'>
        <div name="skill list">
          {!!this.state.skillset ? this.renderSkillsTable() : null}
        </div>
      </div>
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

export default withRouter(connect(mapStatetoProps)(Skills))
