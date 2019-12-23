import React from 'react'
import { connect } from 'react-redux'

const HardcodeSpells = props => {

  const condor = props.character_info.hardcode.minor === 'Condor - Minor'
  const cedrick = props.character.name === "Cedrick"
  const pepper = props.character.name === "Persephone"

  const spells = () => {
    let availableSpells = []
    // let allSpells = [...props.spells]
    if (condor || pepper){
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
      let punch = {
        id: 59,
        level: 3,
        action: 'standard',
        name: 'Force Punch',
        range: 'touch',
        duration: 'instantaneous',
        dc: 'Fort 13',
        sr: true,
        limit: 2
      }
      availableSpells.push(punch)
    }
    if (pepper){
      let levitate = {
        id: 56,
        level: 2,
        action: "standard",
        name: "Levitate",
        range: "personal",
        duration: "5 minutes",
        dc: "-",
        sr: false,
        limit: 1
      }
      availableSpells.push(levitate)
      let fly = {
        id: 57,
        level: 3,
        action: "standard",
        name: "Fly",
        range: "personal",
        duration: "5 minutes",
        dc: "-",
        sr: false
      }
      availableSpells.push(fly)
    }
    return availableSpells.map((sp, idx) => {
      const hc = props.character_info.hardcode
      let limits = hc.limits
      let amount
      if (limits && sp.limit){
        let found = limits.find(l => l.name === sp.name)
        if (sp.starting){
          amount = found ? sp.starting - found.cast : sp.starting
        } else {
          amount = found ? sp.limit - found.cast : sp.limit
        }
      } else {
        amount = sp.starting ? sp.starting : sp.limit
      }
      return (
        <tr className={renderTableStyling(idx)} key={sp.id*3-1}>
          <td>{sp.level}</td>
          <td ><button className={className(sp.action, sp.commandRing, sp.limit, sp.name)} onClick={() => dispatchCasting(className(sp.action, sp.commandRing, sp.limit, sp.name), sp.limit, sp.name, sp.starting)}><strong>Cast{sp.commandRing && ` (${sp.commandRing})`}{sp.limit ? `(${amount}/${sp.limit})` : null}</strong></button></td>
          <td className='underline-hover' onClick={() => props.editModal('spell', null, sp.id)}>{sp.name}</td>
          <td>{sp.range}</td>
          <td>{sp.duration}</td>
          <td>{sp.dc}</td>
          <td>{sp.sr ? "Y" : "N"}</td>
        </tr>
      )
    })
  }

  const className = (action, commandRing, limit, name) => {
    let availableAction = props.character_info.actions[action]
    // are the number of ring points left less than the number of points it costs to cast
    // is the limited number of times you can cast this spell greater or equal to the number of times you already cast it?
    if (commandRing || limit){
      // if limited spells have already been cast, return true, otherwise, there have been no limited spell cast
      let unableToCast = props.character_info.hardcode.limits
      if (unableToCast){
        // find that spell, and see if the max limit is less or equal to the number of times its been cast
        // if it is maxed out, you cannot-cast it
        unableToCast = !!props.character_info.hardcode.limits.find(l => l.name === name && limit <= l.cast)
      }
      if (props.character_info.hardcode.ringPoints < commandRing || unableToCast){
        return 'cannot-cast'
      }
    }
    return availableAction ? 'cannot-cast' : action
  }

  const dispatchCasting = (action, limit, name, starting) => {
    if (action !== 'cannot-cast'){
      props.dispatch({type: 'TRIGGER ACTION', action})
    }
    if (limit){
      renderLimits(name, limit, starting)
    }
    if (name === "Fly"){
      props.dispatch({type: 'I CAN FLY'})
    }
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-general" : "odd-row-general"
  }

  const renderLimits = (name, limit, startingValue) => {
    let limits = props.character_info.hardcode.limits
    // if limits doesn't exist, dispatch
    // if limits does exist, try to find the specifc one
    // if that one isn't found, dispatch
    // if that one is found, check to see if the number of casts is equal to the limit
    // if casts is less than limit, dispatch
    // if casts is equal to limit, don't
    if (limits){
      let found = props.character_info.hardcode.limits.find(l => l.name === name)
      if (found){
        if (startingValue && found.cast < startingValue){
          props.dispatch({type: 'LIMIT CASTING', name})
        } else if (found.cast < limit){
          props.dispatch({type: 'LIMIT CASTING', name})
        }
      } else {
        props.dispatch({type: 'LIMIT CASTING', name})
      }
    } else {
      props.dispatch({type: 'LIMIT CASTING', name})
    }
  }

  return (
    <table>
      <thead>
        <tr >
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
