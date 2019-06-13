import React from 'react'
import { Link } from 'react-router-dom'
// import _ from 'lodash'
import { connect } from 'react-redux'

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
    return this.state.races.map(race => <Link to={`/races/${race.name}`} key={race.id} >{race.name}< br /></Link>)
  }


  renderNewClass = () => {
    console.log("clicked")
  }

  // <button onClick={this.renderNewClass}>Create New Class</button>
  render() {
    return (
      <div className='background'>
        Dees the Playable Races:
        < br />
        {this.state.races[0] ? this.renderRaces() : null}
        < br />
        < br />
        {this.props.admin ? <Link to='/races-form' >Create a Fantasy Race!</Link> : null}
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

export default connect(mapStateToProps)(Races)
