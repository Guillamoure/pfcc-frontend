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

  // renderRaces = () => {
  //   return this.state.races.map(race => <Link to={`/races/${race.name}`} key={race.id} >{race.name}< br /></Link>)
  // }

  renderRaces = () => {
    const sortedRaces = this.state.races.sort((a,b) => a.id - b.id)
    return sortedRaces.map(race => {return (
      <div className='card' onClick={() => this.props.history.push(`/races/${race.name}`)} key={race.id} >
        <div className='fill'></div>
        {console.log(race.img_url)}
        <span className='card-content'>
        {race.name}
        </span>
        <div className="fade"></div>
        <img className='card-img' src={race.img_url}>
        </img>
      </div>
    )})
  }


  // <button onClick={this.renderNewClass}>Create New Class</button>
  render() {
    return (
      <div className='container-4'>
        {this.state.races[0] ? this.renderRaces() : null}
        {this.props.admin ? <div className='card' onClick={() => this.props.history.push('/races-form')}><span className='card-content'>Create a Fantasy Race!</span></div> : null}
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
