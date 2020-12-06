import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { archetypeClassSkillNodes } from '../../utils/calculations/class_archetypes'


class Introduction extends React.Component {

	state = {
		showDetails: false
	}

  renderDescription = () => {
    if (this.props.klass.description){
			if (this.props.options?.displayDescription === false && !this.state.showDetails){return <p onClick={() => this.setState({showDetails: true})}>Show Details</p>}

      let desc = this.props.klass.description
			this.props.chosenArchetypes.forEach(arch => {
				desc += `\n\n${arch.name}\n\n${arch.description}`
			})

      desc = desc.split("\n\n")

			let onClick = this.props.options?.displayDescription === false ? () => this.setState({showDetails: false}) : null
      return desc.map(para => <p key={_.random(1, 2000000)} onClick={onClick}>{para}</p>)
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
    let validSkills = this.renderValidSkillsetSkills()
		validSkills = validSkills.sort((a, b) => a.name.localeCompare(b.name))
    let domSkills = validSkills.map((skill, index, array) => {
      return index === array.length -1 ? `and ${skill.name} (${skill.ability_score.slice(0, 3)}).` : `${skill.name} (${skill.ability_score.slice(0, 3)}), `
    })

		archetypeClassSkillNodes(this.props.chosenArchetypes).forEach(archDesc => {
			domSkills.push(<><br/><br/>{archDesc}</>)
		})


		return domSkills
  }

	renderImage = () => {
		if (this.props.options?.displayImage === false){return null}
		return (
			<span>
				<img id='class-img' alt={this.props.klass.name} src={this.props.klass.img_url}/>
			</span>
		)
	}

	renderName = () => {
		let name = []
		this.props.chosenArchetypes.forEach(arch => {
			name.push(arch.name)
		})
		name.push(this.props.klass.name)
		return name.join(" ")
	}

  render () {
    return (
      <div className='show' id='class-intro'>
        <span>
          <h2>{this.renderName()}</h2>
          {this.renderDescription()}
          <p><strong>Hit Die</strong>: d{this.props.klass.hit_die}</p>
          <p><strong>Starting Wealth</strong>: {this.props.klass.starting_wealth}</p>
          {this.props.klass.skills[0] && <p><strong>Class Skills</strong>: The {_.lowerCase(this.props.klass.name)}'s class skills are {this.renderSkills()}</p>}
					<p><strong>Skill Ranks per Level</strong>: {this.props.klass.skill_ranks} + Int modifier</p>
        </span>
				{this.renderImage()}
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
