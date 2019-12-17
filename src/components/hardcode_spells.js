import React from 'react'
import { connect } from 'react-redux'

const HardcodeSpells = props => {

  const condor = props.character_info.hardcode.minor === 'Condor - Minor'
  const cedrick = props.character.name

  const spells = () => {
    let availableSpells = []
    let allSpells = [...props.spells]
    if (condor){
      let feather_fall = {
        id: 18,
        level: 0,
        action: 'immediate',
        name: 'Feather Fall',
        range: 'self',
        duration: 'until landing or 7 rounds',
        dc: '-',
        sr: false
      }
      availableSpells.push(feather_fall)
    }
    if (cedrick){
      let haste = {
        id: 9,
        level: 3,
        action: 'standard',
        name: 'Haste',
        range: 'self or touch',
        duration: '7 rounds',
        dc: 'Fort 15',
        sr: false,
        commandRing: 1
      }
      availableSpells.push(haste)
      let slow = {
        id: 27,
        level: 3,
        action: 'standard',
        name: 'Slow',
        range: 'self or touch',
        duration: '7 rounds',
        dc: 'Will 15',
        sr: true,
        commandRing: 1
      }
      availableSpells.push(slow)
      let master = {
        id: 28,
        level: 3,
        action: 'immediate',
        name: 'Bleed for your Master',
        range: 'touch',
        duration: 'inst',
        dc: 'none',
        sr: false,
        commandRing: 2
      }
      availableSpells.push(master)
      let dominate = {
        id: 29,
        level: 5,
        action: 'full',
        name: 'Dominate Person',
        range: 'touch',
        duration: '7 days',
        dc: 'Will 15',
        sr: true,
        commandRing: 3
      }
      availableSpells.push(dominate)
    }
    return availableSpells.map(sp => {
      return (
        <tr>
          <td>{sp.level}</td>
          <td ><button className={className(sp.action, sp.commandRing)} onClick={() => dispatchCasting(className(sp.action, sp.commandRing))}><strong>Cast{sp.commandRing && ` (${sp.commandRing})`}</strong></button></td>
          <td className='underline-hover' onClick={() => props.editModal('spell', null, sp.id)}>{sp.name}</td>
          <td>{sp.range}</td>
          <td>{sp.duration}</td>
          <td>{sp.dc}</td>
          <td>{sp.sr ? "Y" : "N"}</td>
        </tr>
      )
    })
  }

  const className = (action, commandRing) => {
    let availableAction = props.character_info.actions[action]
    if (props.character_info.hardcode.ringPoints < commandRing){
      return 'cannot-cast'
    }
    return availableAction ? 'cannot-cast' : action
  }

  const dispatchCasting = (action) => {
    if (action !== 'cannot-cast'){
      props.dispatch({type: 'TRIGGER ACTION', action})
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Lvl</th>
          <th>Action</th>
          <th>Name</th>
          <th>Range</th>
          <th>Duration</th>
          <th>Hit / DC</th>
          <th>SR</th>
        </tr>
      </thead>
      <tbody>
        {spells()}
      </tbody>
    </table>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
    spells: state.spells
  }
}

export default connect(mapStatetoProps)(HardcodeSpells)
