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
    const mod = Math.floor((score - 10) / 2)
    return mod < 0 ? mod : `+${mod}`
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
      <div id='skills'>
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
    character_info: state.character_info
  }
}

export default withRouter(connect(mapStatetoProps)(Skills))
