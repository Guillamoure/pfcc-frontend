import React from 'react'
import { withRouter } from 'react-router-dom'
// import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../localhost'

const Classes = props => {

  const renderClasses = () => {
    const sortedClasses = props.classes.sort((a,b) => a.name.localeCompare(b.name))
    return sortedClasses.map(klass => {return (
      <div className='card' onClick={() => props.history.push(`/classes/${klass.name}`)} key={klass.id} >
        <div className='fill'></div>
        <span className='card-content'>
        	{klass.name}
        </span>
        <div className="fade"></div>
        <img className='card-img' alt={klass.name} src={klass.img_url}></img>
      </div>
    )})
  }


  // <button onClick={this.renderNewClass}>Create New Class</button>
  return (
    <div>
      <div className='container-4'>
        {renderClasses()}
        {props.admin ? <div className='card' onClick={() => props.history.push('/classes-form')}><span className='card-content'>Create a new Class!</span></div> : null}
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
		classes: state.classes
  }
}


export default withRouter(connect(mapStateToProps)(Classes))
