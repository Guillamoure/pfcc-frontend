import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const Performance = props => {

  const renderPerformance = (name) => {
    props.dispatch({type: 'CHANGE PERFORMANCE', name})
    props.exitModal()
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <div>Active Performance: {props.character_info.hardcode.performance ? props.character_info.hardcode.performance : "none"}</div>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => renderPerformance('Inspire Courage')}>Inspire Courage</button>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => renderPerformance('Inspire Competence')}>Inspire Competence</button>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => renderPerformance('Countersong')}>Countersong</button>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => renderPerformance('Distraction')}>Distraction</button>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => renderPerformance('Fascinate')}>Fascinate</button>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => renderPerformance('Suggestion')}>Suggestion</button>
          <br/>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => renderPerformance('none')}>Cancel Performance</button>
        </div>
      </div>
    </Portal>
  )
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Performance)
