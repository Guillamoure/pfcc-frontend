import React from 'react'
import RaceForm from '../components/race_form'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import _ from 'lodash'

class Races extends React.Component {

  state = {
    races: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/races')
    .then(r => r.json())
    .then(data => {
      this.setState({races: data})
    })
  }

  renderRaces = () => {
    return this.state.races.map(race => <Link to={`/races/${race.name}`} >{race.name}< br /></Link>)
  }


  renderNewClass = () => {
    console.log("clicked")
  }

  // <button onClick={this.renderNewClass}>Create New Class</button>
  render() {
    console.log(this.props)
    return (
      <div className='background'>
        Dees the Playable Races:
        < br />
        {this.state.races[0] ? this.renderRaces() : null}
        < br />
        < br />
        <Link to='/races-form' >Create a Fantasy Race!</Link>
      </div>
    )
  }

}

export default Races
