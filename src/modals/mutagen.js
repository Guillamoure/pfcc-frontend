import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const MutagenModal = props => {

  const dispatchMutagen = (name) => {
    props.dispatch({type: 'MUTAGEN', name})
    props.exitModal()
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <h4>Pick a mutagen</h4>
          <p> +2 natural armor bonus, +4 alchemical bonus to Strength, -2 penalty to Intelligence<button onClick={() => dispatchMutagen('strength')}>Select</button></p>
          <p> +2 natural armor bonus, +4 alchemical bonus to Dexterity, -2 penalty to Wisdom<button onClick={() => dispatchMutagen('dexterity')}>Select</button></p>
          <p> +2 natural armor bonus, +4 alchemical bonus to Constitution, -2 penalty to Charisma<button onClick={() => dispatchMutagen('constitution')}>Select</button></p>
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

export default connect(mapStatetoProps)(MutagenModal)
