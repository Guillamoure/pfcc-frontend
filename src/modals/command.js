import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const CommandRing = props => {

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <div>Remaining: {props.character_info.hardcode.ringPoints}</div>
          <button onClick={() => props.dispatch({type: 'COMMAND POINTS CHANGE', amount: 'increase'})}>+</button>
          <button onClick={() => props.dispatch({type: 'COMMAND POINTS CHANGE', amount: 'decrease'})}>-</button>
        </div>
      </div>
    </Portal>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(CommandRing)
