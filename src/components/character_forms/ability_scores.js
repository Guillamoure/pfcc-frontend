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

  renderCSSClasses = () => {
    let style = 'first-col centered'
    if (this.props.strength && this.props.constitution && this.props.dexterity && this.props.intelligence && this.props.wisdom && this.props.charisma) {
      style += ' tinted'
    }
    return style
  }



  render () {
    return (
      <div className='first-col centered'>
        {this.state.numbers[0] ? <p>{this.state.numbers.join(", ")}</p>: <p> You can roll your own numbers, or you can generate some sample scores with the button below! </p>}

        <button onClick={this.generateRandomAbilityScores}>Generate 6 numbers!</button>
        <br /><br />
        <div className='container-2' style={{marginLeft: '20%'}}>
          <label>Strength</label>
            <input type="number" name="strength" value={this.props.strength} onChange={this.props.renderChange}/>
          <label>Dexterity</label>
            <input type="number" name="dexterity" value={this.props.dexterity} onChange={this.props.renderChange}/>
          <label>Constitution</label>
            <input type="number" name="constitution" value={this.props.constitution} onChange={this.props.renderChange}/>
          <label>Intelligence</label>
            <input type="number" name="intelligence" value={this.props.intelligence} onChange={this.props.renderChange}/>
          <label>Wisdom</label>
            <input type="number" name="wisdom" value={this.props.wisdom} onChange={this.props.renderChange}/>
          <label>Charisma</label>
            <input type="number" name="charisma" value={this.props.charisma} onChange={this.props.renderChange}/>
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
