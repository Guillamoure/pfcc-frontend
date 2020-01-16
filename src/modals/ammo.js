import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const AmmoModal = props => {

  const weapon = props.character_info.hardcode.activeWeapon
  const activeAmmo = props.character_info.hardcode.weaponAmmo.find(wa => wa.weapon === weapon).ammo

  const dispatchAmmo = (ammo, direction) => {
    let ammoDup = [...props.character_info.hardcode.ammo]
    ammoDup = ammoDup.map(a => {
      if (a.name === ammo.name){
        let thisAmmo = {...a}
        if (direction === 'increase'){
          thisAmmo.amount = thisAmmo.amount+1
        } else if (direction === 'decrease' && thisAmmo.amount > 0){
          thisAmmo.amount = thisAmmo.amount-1
        }
        return thisAmmo
      } else {
        return a
      }
    })
    props.dispatch({type: 'AMMO CHANGE', ammo: ammoDup})
  }

  const dispatchWeaponAmmo = ammo => {
    let newWeaponAmmo = [...props.character_info.hardcode.weaponAmmo]
    newWeaponAmmo = newWeaponAmmo.map(nwa => {
      if (nwa.weapon === weapon){
        let nnwa = {...nwa}
        nnwa.ammo = ammo
        return nnwa
      } else {
        return nwa
      }
    })
    props.dispatch({type: 'WEAPON AMMO', weaponAmmo: newWeaponAmmo})
  }

  const renderAmmo = () => {
    let ammo = props.character_info.hardcode.ammo
    return ammo.map(a => {
      return (
        <li>
          <span>{a.amount} {a.name}{a.amount === 1 ? null : 's'} remaining </span>
          <button onClick={() => dispatchAmmo(a, 'increase')}>+</button>
          <button onClick={() => dispatchAmmo(a, 'decrease')}>-</button>
          {activeAmmo === a.name ? <span><strong> Active Ammo</strong></span> : <button onClick={() => dispatchWeaponAmmo(a.name)}>Change Active Ammo</button>}
        </li>
      )
    })
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <h3>{weapon}</h3>
          <p>Current Ammo: {activeAmmo}</p>
          <h5>Available Ammo:</h5>
          <ul>
            {renderAmmo()}
          </ul>
          <button onClick={props.exitModal}>Exit</button>
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

export default connect(mapStatetoProps)(AmmoModal)
