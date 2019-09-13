import React from 'react'
import { connect } from 'react-redux'

class SkillRanks extends React.Component {

  state = {
    skillset: false,
    previousRanks: {},
    currentRanks: {},
    availableRanks: 0
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
      this.setState({skillset: data.skillset, previousRanks: skillsAndRanks, currentRanks:skillsAndRanks}, this.renderAvailableRanks())
    })
  }

  renderSubmit = () => {
    fetch('http://localhost:3000/api/v1/character_skillset_skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        character_id: this.props.character.id,
        skillset_id: this.props.character.skillset.id,
        ranks: this.state.currentRanks
      })
    })
    .then(r => r.json())
    .then(data => {
      this.props.dispatch({type: 'CHARACTER', character: data.character })
      this.props.exitModal()
    })
  }


  renderCSSChangeColor = (id) => {
    if (this.state.currentRanks[id] > this.state.previousRanks[id]){
      return "green"
    } else {
      return "black"
    }
  }

  renderAvailableRanks = () => {
    let availableRanks = this.props.character.klasses.reduce(((agg, klass) => {
      return agg + klass.skill_ranks
    }), 0)
    availableRanks += (Math.floor((this.props.character_info.ability_scores.intelligence - 10) / 2) * this.props.character.character_klasses.length)
    if (this.state.previousRanks.length > 1){
      const currentRanks = Object.entries(this.state.previousRanks).reduce(((agg, skill) => {
        return agg + skill[1]
      }), 0)
      availableRanks -= currentRanks
    }
    this.setState({availableRanks: availableRanks})
  }


  renderSkillSelection = () => {
    return this.state.skillset.skills.map(skill => {
      return (
        <div>
            <span>{skill.name}: <span className={this.renderCSSChangeColor(skill.id)}>{this.state.currentRanks[skill.id]}</span></span>
          {!(this.state.currentRanks[skill.id] === this.props.character.character_klasses.length) && (this.state.availableRanks !== 0)? <button onClick={() => this.setState({currentRanks: {...this.state.currentRanks, [skill.id]: this.state.currentRanks[skill.id]+1 }, availableRanks: this.state.availableRanks - 1})}>+</button> : null}
          {!(this.state.currentRanks[skill.id] === this.state.previousRanks[skill.id]) ? <button onClick={() => this.setState({currentRanks: {...this.state.currentRanks, [skill.id]: this.state.currentRanks[skill.id]-1 }, availableRanks: this.state.availableRanks + 1})}>-</button> : null}
        </div>
      )
    })
  }

  render() {
    return (
      <div style={{overflow: "hidden", marginBottom: '2.5em'}}>
        <div>Available Ranks: {this.state.availableRanks}</div>
        {this.state.skillset && this.renderSkillSelection()}
        <button onClick={this.renderSubmit}>Submit!</button>
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
