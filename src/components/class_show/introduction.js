import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'


class Introduction extends React.Component {

  renderDescription = () => {
    if (this.props.klass.description){

      let desc = this.props.klass.description
      desc = desc.split("\n\n")
      return desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
    }
  }

  renderValidSkillsetSkills = () => {
    let activeSkillsetClassSkills = this.props.klass.class_skillset_skills.filter(csss => csss.skillset_id === this.props.currentUser.skillset_id)
    let remappedASCS = activeSkillsetClassSkills.map(csss => csss.skill_id)
    let skillsetSkills = this.props.klass.skills.filter(skill => remappedASCS.includes(skill.id))
    let skillsetSkillsUniq = []
    skillsetSkills.forEach(skill => {
      const emptyArray = skillsetSkillsUniq.filter(skill_uniq => skill_uniq.id === skill.id)
      if (emptyArray.length === 0) {
        skillsetSkillsUniq.push(skill)
      }
    })
    return skillsetSkillsUniq
  }

  renderSkills = () => {
    const validSkills = this.renderValidSkillsetSkills()
    return validSkills.map((skill, index, array) => {
      return index === array.length -1 ? `and ${skill.name} (${skill.ability_score.slice(0, 3)}).` : `${skill.name} (${skill.ability_score.slice(0, 3)}), `
    })
  }

  render () {
    return (
      <div className='show' id='class-intro'>
        <span>
          <h2>{this.props.klass.name}</h2>
          {this.renderDescription()}
          <p><strong>Hit Die</strong>: d{this.props.klass.hit_die}</p>
          <p><strong>Skill Ranks per Level</strong>: {this.props.klass.skill_ranks} + Int modifier</p>
          {this.props.klass.skills[0] && <p><strong>Class Skills</strong>: The {_.lowerCase(this.props.klass.name)}'s class skills are {this.renderSkills()}</p>}
        </span>
        <span>
          <img id='class-img' alt={this.props.klass.name} src={this.props.klass.img_url}/>
        </span>
      </div>
    )
  }



}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(Introduction)
