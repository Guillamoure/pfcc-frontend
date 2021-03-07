import React from 'react'
import { connect } from 'react-redux'

import CombatManeuver from './basics/combat_maneuver'
import Movement from './basics/movement'

const Basics = props => {

  const hc = props.character_info.hardcode

  // const renderButtonCSS = action => {
  //   if (props.character_info.actions[action] && action !== 'free'){
  //     return `cast-${action}`
  //   } else {
  //     return action
  //   }
  // }

  let speed = props.character.race.speed || hc.speed
  speed += hc.expeditious ? 30 : 0
  speed += hc.land10 ? 10 : 0
  speed += hc.land20 ? 20 : 0
  speed += hc.quick ? 10 : 0
  speed += hc.stealTime ? 5 : 0

	  const renderDispatch = (action, details) => {
    let actions = props.character_info.actions
    if ((action === 'standard' || action  === 'move' || action === 'swift') && actions.full){
      return null
    } else if (action === 'full' && (actions.standard || actions.move || actions.swift)){
      return null
    } else if (!actions[action]){
      // I have no idea what this below code is trying to do
      // switch(details){
      //   case 'run':
      //     return null
      //   default:
      //     break
      // }
      if (action !== 'free'){
        props.dispatch({type: 'TRIGGER ACTION', action})
      }
      switch(details){
        case 'fight defensively':
          props.dispatch({type: 'FIGHT DEFENSIVELY'})
          break
        case 'charge':
          props.dispatch({type: 'CHARGE'})
          break
        case 'dimensionalSlide':
          if (!hc.slide){
            props.dispatch({type: 'DIMENSIONAL SLIDE'})
            props.dispatch({type: 'POINTS CHANGE', amount: 'decrease'})
          }
          break
        default:
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
    } else if (hc.ffs){
      return 'cannot-cast'
    } else if (!actions[action]){
      if (cannotRun(details)){
        return 'cannot-cast'
      } else {
				let className = action
				props.character_info.forbidden.forEach(f => {
					if (f.forbidden === details){
						className = "cannot-cast"
					}
				})
        return className
      }
    } else if (props.character_info.actions[action] && action !== 'free'){
      return `cast-${action}`
    } else {
      return 'cannot-cast'
    }
  }

  const swinging = props.character.name === 'Robby' ? ', Swinging Reposition' : null

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
            <td>{speed} ft</td>
          </tr>
          <tr>
            <td><button className={canCast('free')} onClick={() => props.dispatch({type: 'FIVE FOOT STEP'})}><strong>Move</strong></button></td>
            <td>Move</td>
            <td>5 ft</td>
          </tr>
            {props.character.name === "Festus" && alternateMove('Fly', 50)}
            {hc.major === "Condor - Major" && alternateMove('Fly', 80)}
            {hc.major === "Frog - Major" && alternateMove('Swim', 30)}
            {props.character.name === "Cedrick" && hc.major !== 'Chameleon - Major' && alternateMove('Climb', 20)}
            {props.character.name === "Cedrick" && hc.major === 'Chameleon - Major' && alternateMove('Climb', 40)}
            {hc.fly && alternateMove('Fly', 60)}
            {hc.major === "Squid - Major" && alternateMove('Swim', 60)}
            {props.character.name === 'Maddox' && dimensionalSlide()}
            {hc.swim && alternateMove('Swim', 30)}
            {props.character.name === 'Robby' && alternateMove('Swim', 30)}
            {hc.swim20 && alternateMove('Swim', 20)}
            {renderMovements()}
          <tr>
            <td><button className={canCast('full', 'run')} onClick={() => renderDispatch('full', 'run')}><strong>Move</strong></button></td>
            <td>Run</td>
            <td>{speed * 4} ft</td>
          </tr>
        </tbody>
      </table>
    )
  }

  const renderMovements = () => {
    console.log(props.character_info.features)
    let mvmt = props.character_info.features.filter(f => f.type === 'movement')
    return mvmt.map(m => alternateMove(m.movement, m.feet))
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
            <td><button className={canCast('full', 'Charge')} onClick={() => renderDispatch('full', 'Charge')}><strong>Attack</strong></button></td>
            <td>Charge</td>
            <td>Move up to {speed * 2} ft, make Attack. +2 to attack, -2 to AC{swinging}</td>
          </tr>
          <tr>
            <td><button className={canCast('standard')} onClick={() => renderDispatch('standard', 'total defense')}><strong>Defend</strong></button></td>
            <td>Total Defense</td>
            <td>+4 dodge bonus to AC, cannot AoO/fight defensively/use Combat Expertise</td>
          </tr>
          <tr>
            <td><button className={canCast('full')} onClick={() => renderDispatch('full', 'withdraw')}><strong>Flee</strong></button></td>
            <td>Withdraw</td>
            <td>Move up to {speed * 2} ft, you cannot be hit by AoO from your current square by visible enemies</td>
          </tr>
        </tbody>
      </table>
    )
  }

	// aid another, coup de grace, feint, delay, ready, standup
	// notes: cover, concealment, two weapon fighting, flanking, helpless defenders,

  const alternateMove = (type, speed) => {
    let fast = speed * 4
    let action = 'move'
    let fastAction = 'full'
    let asterik = null
    if (type === 'Climb'){
      fast  = speed * 2
      fastAction = 'move'
      asterik = '*'
    }
    return (
      <React.Fragment>
      <tr>
        <td><button className={canCast(action)} onClick={() => renderDispatch('move')}><strong>Move</strong></button></td>
        <td>{type}</td>
        <td>{speed} ft</td>
      </tr>
      {!hc.fly && <tr>
        <td><button className={canCast(fastAction)} onClick={() => renderDispatch('full', 'run')}><strong>Move</strong></button></td>
        <td onMouseOver={e => renderTooltip(e, type)} onMouseOut={props.mouseOut}>{type}{asterik}</td>
        <td>{fast} ft</td>
      </tr>}
      </React.Fragment>
    )
  }


  const cannotRun = (details) => {
    const isFatigued = props.character_info.conditions.includes('Fatigued')
    return details === 'run' && isFatigued ? true : false
  }

  const renderTooltip = (e, type) => {
    let message = ''
    if (type === "Climb"){
      message = '-5 penalty to Climb check, but you can take a 10'
    }
    props.renderTooltip(e, message)
  }

  const dimensionalSlide = () => {
    let className = hc.slide ? 'cannot-cast' : 'free'
    return (
      <React.Fragment>
        <tr>
          <td><button className={className} onClick={() => renderDispatch('free', 'dimensionalSlide')}><strong>Teleport</strong></button></td>
          <td>Dimensional Slide</td>
          <td>Teleport up to 70 ft to a location you can see. This is used as part of your move action or withdraw action. However, this counts as 5 ft of movement.</td>
        </tr>
      </React.Fragment>
    )
  }

  return (
    <section>
      {/* mvmt() */}
      <Movement renderTooltip={props.renderTooltip} mouseOut={props.mouseOut}/>
      {fight()}
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
