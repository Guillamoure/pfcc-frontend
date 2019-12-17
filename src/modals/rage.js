import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const Rage = props => {

  const renderClick = () => {
    let rage = props.character_info.hardcode.rage
    if (rage){
      props.dispatch({type: 'POINTS CHANGE', change: 'decrease'})
    } else {
      props.dispatch({type: 'RAGE', change: 'START'})
      props.dispatch({type: 'POINTS CHANGE', change: 'decrease'})
    }
    props.exitModal()
  }

  const renderEnd = () => {
    props.dispatch({type: 'RAGE', change: 'END'})
    props.exitModal()
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <button style={{display: 'block', margin: 'auto'}} onClick={renderClick}>{props.character_info.hardcode.rage ? 'Continue Rage' : 'Start Rage'}</button>
          <br/>
          <button style={{display: 'block', margin: 'auto'}} onClick={renderEnd}>End Rage</button>
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

export default connect(mapStatetoProps)(Rage)
