import React from 'react'
import _ from 'lodash'

class Skills extends React.Component {

  state = {
    skillsets: false
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/skillsets")
    .then(r => r.json())
    .then(data => {
      debugger
      this.setState({skillsets: data})
    })
  }

  renderActiveSkillset = () => {
    return (
      <div>
        <label>
          Active Skillset:
          <select name="activeSkillset" value={this.props.activeSkillset} onChange={this.props.renderChange}>
            {this.state.skillsets.map(ss => <option value={ss.id}>{ss.name}</option>)}
          </select>
        </label>
      </div>
    )
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
    const skillset = this.state.skillsets.find(ss => ss.id === this.props.activeSkillset)
    const sortedSkills = skillset.skills.sort((a,b) => a.name > b.name ? 1 : -1)
    return sortedSkills.map(skill => {
      return (
        <tr key={_.random(1, 2000000)}>
          <td><strong>{skill.ability_score.slice(0, 3)}</strong></td>
          <td>{skill.name}</td>
        </tr>
      )}
    )
  }


  render() {
    return(
      <div>
        <span>Skillset</span>
        {this.state.skillsets && this.renderActiveSkillset()}
        {this.state.skillsets && this.renderSkillTableRow()}
      </div>
    )
  }

}

export default Skills
