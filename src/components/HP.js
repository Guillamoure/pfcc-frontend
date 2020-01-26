import React from 'react'
import { connect } from 'react-redux'
import localhost from '../localhost'

class HP extends React.Component {

  state = {
    hitPoints: 0,
    error: false
  }

  componentDidMount() {
    const sortedClasses = this.props.character.character_klasses.sort((a,b) => a.level - b.level)
    let currentHP = []
    sortedClasses.forEach(cl => {
      let hit_die = this.props.character.uniq_klasses.find(kl => kl.id === cl.klass_id).hit_die
      if ((cl.level === 1) && (hit_die !== cl.hp)) {
        return currentHP.push(hit_die)
      }
      return currentHP.push(cl.hp)
    })

    this.setState({hitPoints: currentHP})
  }

  renderChange = (e, index, maxValue) => {
    const hp = parseInt(e.target.value)
    if (typeof hp === "number" && (hp < 1 || hp > maxValue)){
      let hitPoints = [...this.state.hitPoints]

      hitPoints[index] = parseInt(e.target.value) || null
      this.setState({ hitPoints: hitPoints, error: true })
    } else {
      let hitPoints = [...this.state.hitPoints]

      hitPoints[index] = parseInt(e.target.value) || null
      this.setState({ hitPoints: hitPoints, error: false })
    }

  }

  renderClasses = () => {
    const sortedClasses = this.props.character.character_klasses.sort((a,b) => a.level - b.level)
    return sortedClasses.map((char_klass, idx) => {
      const info = this.props.character.uniq_klasses.find(kl => kl.id === char_klass.klass_id)
      return (
        <div>
          <label>Level {char_klass.level}: {info.name}</label>
          <input type="number" name={char_klass.level} value={this.state.hitPoints[idx]} onChange={(e) => this.renderChange(e, idx, info.hit_die)}/>
          d{info.hit_die}
        </div>
      )
    })
  }

  renderSubmit = () => {
    fetch(`${localhost}/api/v1/hp`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        character_id: this.props.character.id,
        hp: this.state.hitPoints
      })
    })
    .then(r => r.json())
    .then(data => {
      this.props.dispatch({type: 'CHARACTER', character: data.character })
      this.props.exitModal()
    })
  }

  render() {
    console.log("changing HP", this.state)
    return (
      <div>
        {this.renderClasses()}
        {this.state.error && <p>One of your choices is too high or too low!</p>}
        {!this.state.error && <button onClick={this.renderSubmit}>Submit!</button>}
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

export default connect(mapStatetoProps)(HP)
