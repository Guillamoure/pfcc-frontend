import React from 'react'
import _ from 'lodash'

class Introduction extends React.Component {

  renderDescription = () => {
    if (this.props.race.description){

      let desc = this.props.race.description
      desc = desc.split("\n\n")
      return desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
    }
  }

  renderAbilityScoreModifiers = () => {
    if(this.props.race.race_ability_score_modifiers){
      let mods = this.props.race.race_ability_score_modifiers
      let modStrings = []
      mods.forEach(mod => {
        let bonus = mod.bonus < 0 ? mod.bonus : `+${mod.bonus}`
        modStrings.push(`${bonus} ${mod.ability_score}`)
      })
      return modStrings.join(", ")
    }
  }

  render () {
    return (
      <div className='show' id='class-intro'>
				<span>
					<h2>{this.props.race ? this.props.race.name : null}</h2>
					{this.renderDescription()}
					<p><strong>Size</strong>: {this.props.race ? this.props.race.size : null}</p>
					<p><strong>Speed</strong>: {this.props.race ? this.props.race.speed : null} ft</p>
					<p><strong>Ability Score Modifiers</strong>: {this.renderAbilityScoreModifiers()}</p>
				</span>
				<span>
					<img id='class-img' alt={this.props.race.name} src={this.props.race.img_url}/>
				</span>
      </div>
    )
  }



}

export default Introduction
