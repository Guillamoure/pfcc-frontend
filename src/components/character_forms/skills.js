import React from 'react'
import _ from 'lodash'
import localhost from '../../localhost'
import { isThisAClassSkill } from '../../utils/calculations/skills'

class Skills extends React.Component {

  state = {
    skillsets: false
  }

  componentDidMount() {
    fetch(`${localhost}/api/v1/skillsets`)
    .then(r => r.json())
    .then(data => {
      this.setState({skillsets: data})
    })
		if (this.props.campaignDetails){
			if (this.props.activeSkillset !== this.props.campaignDetails.skillset.id){
				this.props.renderChange({target: {value: this.props.campaignDetails.skillset.id, name: "activeSkillset"}})
			}
		}
  }

  renderActiveSkillset = () => {
		if (this.props.campaignDetails?.skillset?.id){
			return (
				<div>Active Skillset: <strong>{this.props.campaignDetails.skillset.name}</strong></div>
			)
		}
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
    const skillset = this.state.skillsets.find(ss => ss.id === parseInt(this.props.activeSkillset)) ?? {}
    const sortedSkills = skillset?.skills?.sort((a,b) => a.name > b.name ? 1 : -1) ?? []
		let character = {
			skillset: {id: this.props.activeSkillset},
			uniq_klasses: this.props.classes.filter(cl => this.props.chosenClasses.includes(cl.id))
		}
    return sortedSkills.map(skill => {
      return (
        <tr key={_.random(1, 2000000)}>
					<td>{isThisAClassSkill(skill, character) ? "X" : ""}</td>
          <td><strong>{skill.ability_score.slice(0, 3)}</strong></td>
          <td>{skill.name}</td>
        </tr>
      )
    })
  }


  render() {
    return(
      <div>
        <span>Skillset</span>
        {this.state.skillsets && this.renderActiveSkillset()}
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Ability</th>
              <th>Skill</th>
            </tr>
          </thead>
          <tbody>
            {this.state.skillsets && this.renderSkillTableRow()}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Skills
