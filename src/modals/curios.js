import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const AgeModal = props => {

  let curio = {}

  switch(props.character.name){
    case 'Cedrick':
      curio = {
        name: "Ta'al'mon Ancestral Handwraps",
        effects: [
          ""
        ]
      }
      break
    default:
      break
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <h3>{curio.name}</h3>
          <ul>
            {curio.effects.map(effect => <li>{effect}</li>)}
          </ul>
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
