import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mod, pluser } from '../../utils/fuf'

class AbilityForm extends React.Component{

  state = {
    numbers: []
  }

  generateRandomAbilityScores = () => {
    let array = []
    for (var i = 0; i < 6; i++){
      array.push(this.generateOneScore())
    }
    this.setState({numbers: array})
  }

  generateOneScore = () => {
    const score = []
    for (var i = 0; i < 4; i++){
      score.push(_.random(1,6))
    }

    score.sort((a, b) => b - a)
    score.pop()
    return score.reduce((agg, el) => {
      return agg + el
    })
  }

  render () {
    return (
      <div id="new-character-details-ability-scores" className="standard-container-bubble">
        <p> You can roll your own numbers, or you can generate some sample scores with the button below! Place the numbers to whatever score you'd like, or map them directly to the ability scores in order!{this.state.numbers.length === 6 ? <p style={{textAlign: "center"}}>{this.state.numbers.join(", ")}</p> : <p  style={{textAlign: "center"}}>0, 0, 0, 0, 0, 0</p>}</p>

        <button onClick={this.generateRandomAbilityScores}>Generate 6 numbers!</button>
        {this.state.numbers.length === 6 && <button onClick={() => this.props.mapAbilityScores(this.state.numbers)}>Map directly to Abilities!</button>}
        <br /><br />
        <div id="character-creation-display-ability-scores" >
          <label className="new-character-label"><strong>Strength</strong></label>
            <input type="number" name="strength" className="new-character-text-input" value={this.props.strength} onChange={this.props.renderChange}/>
						<span> Modifier: {pluser(mod(this.props.strength))}</span>

          <label className="new-character-label"><strong>Dexterity</strong></label>
            <input type="number" name="dexterity" className="new-character-text-input" value={this.props.dexterity} onChange={this.props.renderChange}/>
						<span> Modifier: {pluser(mod(this.props.dexterity))}</span>

          <label className="new-character-label"><strong>Constitution</strong></label>
            <input type="number" name="constitution" className="new-character-text-input" value={this.props.constitution} onChange={this.props.renderChange}/>
						<span> Modifier: {pluser(mod(this.props.constitution))}</span>

          <label className="new-character-label"><strong>Intelligence</strong></label>
            <input type="number" name="intelligence" className="new-character-text-input" value={this.props.intelligence} onChange={this.props.renderChange}/>
						<span> Modifier: {pluser(mod(this.props.intelligence))}</span>

          <label className="new-character-label"><strong>Wisdom</strong></label>
            <input type="number" name="wisdom" className="new-character-text-input" value={this.props.wisdom} onChange={this.props.renderChange}/>
						<span> Modifier: {pluser(mod(this.props.wisdom))}</span>

          <label className="new-character-label"><strong>Charisma</strong></label>
            <input type="number" name="charisma" className="new-character-text-input" value={this.props.charisma} onChange={this.props.renderChange}/>
						<span> Modifier: {pluser(mod(this.props.charisma))}</span>
				</div>
      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStateToProps)(AbilityForm))
