import React from 'react'
import { connect } from 'react-redux'
import { pluser } from '../../../utils/fuf'
import { baseAttackBonus, pluserAB, combatManuevers } from '../../../utils/calculations/attack_bonus'

const CombatManeuver = props => {

  const swinging = props.character.name === 'Robby' ? ', Swinging Reposition' : null
  const hc = props.characterInfo.hardcode
  const name = props.character.name
  const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major', 'Chameleon - Major'].includes(hc.major)
  let rage = hc.rage
  let bullMinor = hc.minor === 'Bull - Minor'
  let charge = hc.charge
  let fd = hc.fd
  let power = hc.power
  const enlarger = hc.enlarge
  const reducer = hc.reduce
  const activeMutagen = hc.activeMutagen ? hc.mutagen : false

  const actions = props.characterInfo.actions



  const bab = () => {
    let bab = 0
    props.characterInfo.classes.forEach(cl => {
      const klass = props.classes.find(c => c.id === cl.id)
      bab += (cl.level * renderBAB(klass.hit_die))
    })
    return bab
  }

  const str = () => {
    let mod = Math.floor( ( props.characterInfo.ability_scores.strength - 10 ) / 2)
    mod += !!largeMorph ? 2 : 0
    mod += !!bullMinor ? 1 : 0

    mod += activeMutagen === 'strength' ? 2 : 0
    return mod
  }

  const dex = () => {
    let mod = Math.floor( ( props.characterInfo.ability_scores.dexterity - 10 ) / 2)
    mod += !!largeMorph ? -1 : 0
    mod += name === 'Cedrick' ? 1 : 0
    mod += enlarger ? -1 : 0
    mod += reducer ? 1 : 0

    mod += activeMutagen === 'dexterity' ? 2 : 0
    return mod
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

  const size = () => {
    let size = props.characterInfo.size
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

  const cmbBonuses = (cm) => {
    let mod = 0
    if (name === 'Cedrick' && cm === 'Bull Rush'){
      mod += 2
    }
    return mod
  }

  const cmdBonuses = (cm) => {
    let mod = 0
    if (name === 'Cedrick' && cm === 'Bull Rush'){
      mod += 2
    }
    if (name === 'Merg'){
      mod += 2
    }
    return mod
  }

  const calcCMD = (name, style) => {
    let cmb = calcCMB(null, false, true)
    let cmd = 10 + cmb + dex()

    cmd += cmdBonuses(name)

    let ogCMD = cmd

    if (style){
      if (ogCMD > cmd){
        return {color: 'maroon'}
      } else if (ogCMD < cmd){
        return {color: 'green'}
      } else {
        return {color: 'black'}
      }
    } else {
      return cmd
    }
  }

	const cms = combatManuevers(props.character, props.characterInfo)
	let cmb = pluser(cms.bonus)
	let cmd = cms.defense

  const calcCMB = (name, style, cmd) => {
    let ab = bab() + str() + size()

    ab += cmbBonuses(name)

    let ogAB = ab

    ab += !!rage ? 2 : 0
    ab += !!charge ? 2 : 0
    ab += !!fd ? -4 : 0
    ab += !!power ? -2 : 0

    if (style){
      if (ogAB > ab){
        return {color: 'maroon'}
      } else if (ogAB < ab){
        return {color: 'green'}
      } else {
        return {color: 'black'}
      }
    } else if (cmd){
      ab = Math.floor(ab)
      return ab
    } else {

      ab = Math.floor(ab)
      return ab >= 0 ? `+${ab}` : ab
    }
  }

	// combat manuevers: tip, disarm, sunder, grapple, dirty trick, pin, overrun, steal, reposition, drag

  const renderCombatManeuvers = () => {
    let maneuvers = [
      {id: 100, name: 'Bull Rush', action: 'standard', description: 'Move target 5 ft back, +5 ft for every 5 you beat their CMD.', button: 'Rush'},
			{id: 101, name: "Dirty Trick", action: 'standard', description: "Impose condition (blinded, dazzled, deafened, entangled, shaken, sickened) for 1 round, +1 round for every 5 you beat their CMD. Condition can be removed with move action.", button: "Pocket Sand"},
			{id: 102, name: "Disarm", action: 'standard', description: "Remove 1 item from target, beat CMD by 10, remove both items. Can automatically pick up disarmed weapon. Fail by 10, drop your weapon. If unarmed, -4 penalty to CMB.", button: "Disarm"},
			{id: 103, name: "Drag", action: 'standard', description: "Drag in straight line. Move you and target 5 ft, +5 ft for every 5 you beat their CMD. Must be able to move with target.", button: "Drag"},
			{id: 104, name: "Grapple", action: 'standard', description: "You and target have Grappled condition. Must make check to maintain each round. Use two hands or -4 penalty to CMB", button: "Grab"},
			{id: 105, name: "Grapple (Move)", action: 'standard', description: "If target is grappled, move up to half your speed with target.", button: "Move"},
			{id: 106, name: "Grapple (Damage)", action: 'standard', description: "If target is grappled, attack with unarmed, natural attack, or light/one-handed weapon.", button: "Attack"},
			{id: 107, name: "Grapple (Pin)", action: 'standard', description: "If target is grappled, give target Pinned condition.", button: "Pin"},
			{id: 108, name: "Grapple (Tie Up)", action: 'standard', description: "If target is pinned, tie up target. DC to escape is 20 + your CMB. If target is grappled, -10 penalty to CMB.", button: "Wrangle"},
			{id: 109, name: "Grapple (Break)", action: 'standard', description: "If you are grappled, CMB/Acrobatics check against CMD. If succeed, can escape or become grappler.", button: "Reversal"},
			{id: 110, name: "Overrun", action: 'standard', description: "As part of Charge, move through enemy square. They can choose to let you pass. If beat their CMD by 5, knock them prone.", button: "Charge"},
			{id: 111, name: "Reposition", action: 'standard', description: "Move target 5ft from their position, within your reach, except for final 5 ft. +5 ft for every 5 your beat their CMD.", button: "Shift"},
			{id: 112, name: "Steal", action: 'standard', description: "Choose item to take, +5 to their CMD if item is fastened, cannot take worn/wielded items.", button: "Thieve"},
			{id: 113, name: "Sunder", action: 'standard', description: "Attack an item held/worn by target. Deal damage, can choose not to destroy the item.", button: "Smash"},
			{id: 114, name: "Trip", action: 'standard', description: "Knock target prone. If you fail by 10, you are knocked prone.", button: "Trip"},
    ]
    return maneuvers.map((m, idx) => {
      return (
        <tr>
          <td><button className={actions[m.action] ? 'cannot-cast' : m.action} onClick={() => renderDispatch(m.action)}>{m.button}</button></td>
          <td>{m.name}</td>
          <td>{cmb}</td>
          <td>{cmd}</td>
          <td>{m.description}</td>
        </tr>
      )
    })
  }

  const renderDispatch = action => {
    if ((action === 'standard' || action  === 'move' || action === 'swift') && actions.full){
      return null
    } else if (action === 'full' && (actions.standard || actions.move || actions.swift)){
      return null
    } else if (!action === 'free'){
      props.dispatch({type: 'TRIGGER ACTION', action})
    }
  }

  const cm = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Bonus</th>
            <th>Defense</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          {renderCombatManeuvers()}
        </tbody>
      </table>
    )
  }


  return (
    <React.Fragment>
      {cm()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    characterInfo: state.character_info,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(CombatManeuver)
