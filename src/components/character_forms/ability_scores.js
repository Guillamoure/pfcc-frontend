import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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
      <span>
        <p>Bild a Bear's Abilities</p>
        {this.state.numbers[0] ? <p>{this.state.numbers.join(", ")}</p>: <p> You can roll your own numbers, or you can generate some sample scores with the button below! </p>}

        <button onClick={this.generateRandomAbilityScores}>Generate 6 numbers!</button>
        <br /><br />
        <label>
          Strength:
          <input type="text" name="strength" value={this.props.strength} onChange={this.props.renderChange}/>
        </label>
        <br />
        <label>
          Dexterity:
          <input type="text" name="dexterity" value={this.props.dexterity} onChange={this.props.renderChange}/>
        </label>
        <br />
        <label>
          Constitution:
          <input type="text" name="constitution" value={this.props.constitution} onChange={this.props.renderChange}/>
        </label>
        <br />
        <label>
          Intelligence:
          <input type="text" name="intelligence" value={this.props.intelligence} onChange={this.props.renderChange}/>
        </label>
        <br />
        <label>
          Wisdom:
          <input type="text" name="wisdom" value={this.props.wisdom} onChange={this.props.renderChange}/>
        </label>
        <br />
        <label>
          Charisma:
          <input type="text" name="charisma" value={this.props.charisma} onChange={this.props.renderChange}/>
        </label>
        <br />
      </span>

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
