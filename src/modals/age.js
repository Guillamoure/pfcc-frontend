import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const AgeModal = props => {

  const renderAge = age => {
    props.dispatch({type: 'TIME TRAVEL', age})
    props.exitModal()
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <div>Current Age Catergory: {props.character_info.hardcode.age}</div>
          <button onClick={() => renderAge('Young')}>Young</button>
          <button onClick={() => renderAge('Adult')}>Adult</button>
          <button onClick={() => renderAge('Venerable')}>Venerable</button>
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

export default connect(mapStatetoProps)(AgeModal)
