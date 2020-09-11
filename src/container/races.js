import React from 'react'
// import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../localhost'

const Races = props => {

  const renderRaces = () => {
    const sortedRaces = props.races.sort((a,b) => a.name.localeCompare(b.name))
    return sortedRaces.map(race => {return (
      <div className='card' onClick={() => props.history.push(`/ancestries/${race.name}`)} key={race.id} >
        <div className='fill'></div>
        <span className='card-content'>
        	{race.name}
        </span>
        <div className="fade"></div>
        <img className='card-img' alt={race.name} src={race.img_url}></img>
      </div>
    )})
  }


  return (
    <div className='container-4'>
      {renderRaces()}
      {props.admin ? <div className='card' onClick={() => props.history.push('/ancestries-form')}><span className='card-content'>Create a Fantasy Ancestry!</span></div> : null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
		races: state.races
  }
}

export default connect(mapStateToProps)(Races)
