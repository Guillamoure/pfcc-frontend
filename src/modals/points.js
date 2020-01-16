import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const Points = props => {

  const additionalContent = () => {
    let name = props.character.name
    if (name === 'Robby'){
      return (
        <React.Fragment>
          <h4>Regain Panache</h4>
          <ul>
            <li><em><u>Critical Hit with a Light or One-Handed Piercing Melee Weapon:</u></em> Each time you confirm a critical hit with a light or one-handed piercing melee weapon, you regain 1 panache point. Confirming a critical hit on a helpless or unaware creature or a creature that has fewer Hit Dice than half your character level doesn’t restore panache.</li>
            <li><em><u>Killing Blow with a Light or One-Handed Piercing Melee Weapon:</u></em> When you reduces a creature to 0 or fewer hit points with a light or one-handed piercing melee weapon attack while in combat, you regain 1 panache point. Destroying an unattended object, reducing a helpless or unaware creature to 0 or fewer hit points, or reducing a creature that has fewer Hit Dice than half your character level to 0 or fewer hit points doesn’t restore panache.</li>
          </ul>
        </React.Fragment>
      )
    }
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <h3>Remaining: {props.character_info.hardcode.points}</h3>
          {additionalContent()}
          <button onClick={() => props.dispatch({type: 'POINTS CHANGE', amount: 'increase'})}>+</button>
          <button onClick={() => props.dispatch({type: 'POINTS CHANGE', amount: 'decrease'})}>-</button>
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

export default connect(mapStatetoProps)(Points)
