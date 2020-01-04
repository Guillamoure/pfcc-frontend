import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const AgeModal = props => {

  const renderAge = age => {
    let previousAge = props.character_info.hardcode.age
    if (age === 'Young'){
      props.dispatch({type: 'CHANGE SIZE', size: 'Small'})
    }
    if (previousAge === 'Young' && age !== 'Young'){
      props.dispatch({type: 'CHANGE SIZE', size: 'Medium'})
    }
    props.dispatch({type: 'TIME TRAVEL', age})
    props.exitModal()
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <div>Current Age Catergory: {props.character_info.hardcode.age}</div>
          <button onClick={() => renderAge('Young')}>Young (3-7)</button>
          <button onClick={() => renderAge('Adult')}>Adult (8-12)</button>
          <button onClick={() => renderAge('Middle')}>Middle Age (13-15)</button>
          <button onClick={() => renderAge('Old')}>Old (16-17)</button>
          <button onClick={() => renderAge('Venerable')}>Venerable (18)</button>
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
