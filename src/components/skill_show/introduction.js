import React from 'react'
import _ from 'lodash'

class Introduction extends React.Component {

  renderDescription = () => {
    if (this.props.skill.description){

      let desc = this.props.skill.description
      desc = desc.split("\n\n")
      return desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
    }
  }


  render () {
    return (
      <div className='show'>
        <h2>{this.props.skill ? this.props.skill.name : null}</h2>
        <p><strong>{this.props.skill && this.props.skill.ability_score ? this.props.skill.ability_score : null}{this.props.skill && !this.props.skill.untrained ? "; Trained Only" : null}{this.props.skill && (this.props.skill.abilityScore === "Strength" || this.props.skill.abilityScore === "Dexterity") ? "; Armor Check Ability" : null}</strong></p>
        {this.renderDescription()}
      </div>
    )
  }



}

export default Introduction
