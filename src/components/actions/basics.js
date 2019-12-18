import React from 'react'
import { connect } from 'react-redux'

const Basics =  props => {

  // const renderButtonCSS = action => {
  //   if (props.character_info.actions[action] && action !== 'free'){
  //     return `cast-${action}`
  //   } else {
  //     return action
  //   }
  // }

  const renderDispatch = (action, details) => {
    let actions = props.character_info.actions
    if ((action === 'standard' || action  === 'move' || action === 'swift') && actions.full){
      return null
    } else if (action === 'full' && (actions.standard || actions.move || actions.swift)){
      return null
    } else if (!actions[action]){
      switch(details){
        case 'run':
        return null
      }
      props.dispatch({type: 'TRIGGER ACTION', action})
      switch(details){
        case 'fight defensively':
          props.dispatch({type: 'FIGHT DEFENSIVELY'})
          break
        case 'charge':
          props.dispatch({type: 'CHARGE'})
          break
      }
    } else {
      return null
    }
  }

  const canCast = (action, details) => {
    let actions = props.character_info.actions
    if ((action === 'standard' || action  === 'move' || action === 'swift') && actions.full){
      return "cannot-cast"
    } else if (action === 'full' && (actions.standard || actions.move || actions.swift)){
      return "cannot-cast"
    } else if (props.character_info.hardcode.ffs){
      return 'cannot-cast'
    } else if (!actions[action]){
      if (cannotRun(details)){
        return 'cannot-cast'
      } else {
        return action
      }
    } else if (props.character_info.actions[action] && action !== 'free'){
      return `cast-${action}`
    } else {
      return 'cannot-cast'
    }
  }

  const calcCMB = (cm) => {
    let bab = 0
    props.character_info.classes.forEach(cl => {
      const klass = props.classes.find(c => c.id === cl.id)
      bab += (cl.level * renderBAB(klass.hit_die))
    })
    const str = Math.floor( ( props.character_info.ability_scores.strength - 10 ) / 2)
    const size = renderSize(props.character.race.size)
    let ab = bab + str + size
    if (props.character.name === 'Cedrick' && cm === 'bull rush'){
      ab += 2
    }
    return ab >= 0 ? `+${ab}` : ab
  }

  const renderBAB = (hd) => {
    switch (hd){
      case 6:
        return 0.5;
      case 8:
        return 0.75;
      case 10:
        return 1;
      case 12:
        return 1;
      default:
        return 1;
    }
  }

  const renderSize = (size) => {
    switch(size){
      case "Fine":
        return -8;
      case "Diminutive":
        return -4;
      case "Tiny":
        return -2;
      case "Small":
        return -1;
      case "Large":
        return 1;
      case "Huge":
        return 2;
      case "Gargantuan":
        return 4;
      case "Colossal":
        return 8;
      default:
        return 0;
    }
  }

  const mvmt = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button className={canCast('move')} onClick={() => renderDispatch('move')}><strong>Move</strong></button></td>
            <td>Move</td>
            <td>{props.character_info.hardcode.speed} ft</td>
          </tr>
          <tr>
            <td><button className={canCast('free')} onClick={() => props.dispatch({type: 'FIVE FOOT STEP'})}><strong>Move</strong></button></td>
            <td>Move</td>
            <td>5 ft</td>
          </tr>
          {props.character.name === "Festus" && alternateMove('Fly', 50)}
          {props.character_info.hardcode.major === "Condor - Major" && alternateMove('Fly', 80)}
          {props.character_info.hardcode.major === "Frog - Major" && alternateMove('Swim', 30)}
          <tr>
            <td><button className={canCast('full', 'run')} onClick={() => renderDispatch('full', 'run')}><strong>Move</strong></button></td>
            <td>Run</td>
            <td>{props.character_info.hardcode.speed * 4} ft</td>
          </tr>
        </tbody>
      </table>
    )
  }

  const fight = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button className={canCast('standard')} onClick={() => renderDispatch('standard', 'fight defensively')}><strong>Attack</strong></button></td>
            <td>Fight Defensively</td>
            <td>-4 to Attack Rolls, +2 dodge bonus to AC</td>
          </tr>
          <tr>
            <td><button className={canCast('full', 'charge')} onClick={() => renderDispatch('full', 'charge')}><strong>Attack</strong></button></td>
            <td>Charge</td>
            <td>Move up to {props.character_info.hardcode.speed * 2} ft, make Attack. +2 to attack, -2 to AC</td>
          </tr>
        </tbody>
      </table>
    )
  }

  const cm = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Bonus</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
            <td>Bull Rush</td>
            <td>{calcCMB('bull rush')}</td>
            <td>Move target 5 ft back, +5 ft for every 5 you beat their CMD</td>
          </tr>
        </tbody>
      </table>
    )
  }

  const alternateMove = (type, speed) => {
    return (
      <React.Fragment>
      <tr>
        <td><button className={canCast('move')}><strong>Move</strong></button></td>
        <td>{type}</td>
        <td>{speed} ft</td>
      </tr>
      <tr>
        <td><button className={canCast('full')}><strong>Move</strong></button></td>
        <td>{type}</td>
        <td>{speed * 4} ft</td>
      </tr>
      </React.Fragment>
    )
  }

  const festus = () => {
    return (
      <React.Fragment>
      <tr>
        <td><button className={canCast('move')}><strong>Move</strong></button></td>
        <td>Fly</td>
        <td>50 ft</td>
      </tr>
      </React.Fragment>
    )
  }

  const frog = () => {
    return (
      <React.Fragment>
      <tr>
        <td><button className={canCast('move')}><strong>Move</strong></button></td>
        <td>Swim</td>
        <td>30 ft</td>
      </tr>
      </React.Fragment>
    )
  }

  const cannotRun = (details) => {
    const isFatigued = props.character_info.conditions.includes('Fatigued')
    return details === 'run' && isFatigued ? true : false
  }

  return (
    <section>
      {mvmt()}
      {fight()}
      {cm()}
    </section>
  )
}
const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(Basics)