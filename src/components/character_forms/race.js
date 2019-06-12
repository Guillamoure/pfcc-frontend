import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Race extends React.Component{

  state = {
    races: {}
  }


  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/races')
    .then(r => r.json())
    .then(data => {
      this.setState({races: data})
    })
  }

  renderRaces = () => {
    return this.state.races.map(race => {
      return <option key={race.id} value={race.id}>{race.name}</option>
    })
  }

  renderChosenRace = () => {
    let chosen = this.state.races.find(el => el.id === _.toNumber(this.props.chosenRaceId))
    return <Link to={`/races/${chosen.name}`} >{chosen.name}< br /></Link>
  }

  render () {
    return (
      <span>
      <p>Bild a Bear's Race</p>
      <label>
        Race Options:
        <select name="race" value={this.props.chosenRaceId} onChange={(e) => this.props.renderChange(e)}>
          <option value= "" >Select One</option>
          {this.state.races[0] ? this.renderRaces() : null}
        </select>
      </label>
      {this.state.races[0] && this.props.chosenRaceId ? this.renderChosenRace() : null}
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

export default withRouter(connect(mapStateToProps)(Race))
