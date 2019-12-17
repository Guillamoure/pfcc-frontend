import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const FrogCombat = props => {

  const frogCombat = (name) => {
    props.dispatch({type: 'FROG COMBAT', name})
    props.exitModal()
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <div>Active Combat Form Effect: {props.character_info.hardcode.frogCombat ? props.character_info.hardcode.frogCombat : "none"}</div>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => frogCombat('Sickened')}>Sickened for 1 round</button>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => frogCombat('Acid Damage')}> 1d3 Acid Damage</button>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => frogCombat('Silent Image')}>Affected by <em>silent image</em> for 1 round</button>
          <br/>
          <button style={{display: 'block', margin: 'auto'}} onClick={() => frogCombat('none')}>Cancel Combat Form</button>
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

export default connect(mapStatetoProps)(FrogCombat)
