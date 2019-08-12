import React from 'react'
import { connect } from 'react-redux'

class SkillRanks extends React.Component {

  state = {
    skillset: false,
    previousRanks: {},
    currentRanks: {}
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/skillsets/${this.props.character.skillset.id}`)
    .then(r => r.json())
    .then(data => {
      const skillsAndRanks = {}
      data.skillset.skills.forEach(skill => {
        let ranks = 0
        this.props.character.character_skillset_skills.forEach(charRanksSkill => {
          if (charRanksSkill.skill_id === skill.id){
            ranks = charRanksSkill.ranks
          }
        })
        skillsAndRanks[skill.id] = ranks
      })
      this.setState({skillset: data.skillset, previousRanks: skillsAndRanks, currentRanks:skillsAndRanks})
    })
  }

  renderClassLevel = () => {
    return this.props.character.character_klasses.reduce((agg, klass) => {
      return agg + klass.level
    }, 0)
  }

  renderCSSChangeColor = (id) => {
    if (this.state.currentRanks[id] > this.state.previousRanks[id]){
      return "green"
    } else {
      return "black"
    }
  }


  renderSkillSelection = () => {
    return this.state.skillset.skills.map(skill => {
      return (
        <div>
            <span>{skill.name}: <span className={this.renderCSSChangeColor(skill.id)}>{this.state.currentRanks[skill.id]}</span></span>
          {(!this.state.currentRanks[skill.id] === this.renderClassLevel()) ? <button onClick={this.setState({currentRanks: {...this.state.currentRanks, [skill.id]: this.state.currentRanks[skill.id]+1 }})}>+</button> : null}
          {(!this.state.currentRanks[skill.id] === this.state.previousRanks[skill.id]) ? <button onClick={this.setState({currentRanks: {...this.state.currentRanks, [skill.id]: this.state.currentRanks[skill.id]-1 }})}>-</button> : null}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.state.skillset && this.renderSkillSelection()}
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

export default connect(mapStatetoProps)(SkillRanks)
