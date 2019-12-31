import React from 'react'
import { connect } from 'react-redux'

const CombatManeuver = props => {

  const swinging = props.character.name === 'Robby' ? ', Swinging Reposition' : null
  const hc = props.character_info.hardcode
  const name = props.character.name
  const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major', 'Chameleon - Major'].includes(hc.major)
  let rage = hc.rage
  let bullMinor = hc.minor === 'Bull - Minor'
  let charge = hc.charge
  let fd = hc.fd
  let power = hc.power
  const enlarger = hc.enlarge
  const reducer = hc.reduce

  const actions = props.character_info.actions



  const bab = () => {
    let bab = 0
    props.character_info.classes.forEach(cl => {
      const klass = props.classes.find(c => c.id === cl.id)
      bab += (cl.level * renderBAB(klass.hit_die))
    })
    return bab
  }

  const str = () => {
    let mod = Math.floor( ( props.character_info.ability_scores.strength - 10 ) / 2)
    mod += !!largeMorph ? 2 : 0
    mod += !!bullMinor ? 1 : 0

    return mod
  }

  const dex = () => {
    let mod = Math.floor( ( props.character_info.ability_scores.dexterity - 10 ) / 2)
    mod += !!largeMorph ? -1 : 0
    mod += name === 'Cedrick' ? 1 : 0
    mod += enlarger ? -1 : 0
    mod += reducer ? 1 : 0

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
    let size = props.character_info.size
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

  const renderCombatManeuvers = () => {
    let maneuvers = [
      {
        id: 100,
        name: 'Bull Rush',
        action: 'standard',
        description: 'Move target 5 ft back, +5 ft for every 5 you beat their CMD',
        button: 'Rush'
      }
    ]
    return maneuvers.map((m, idx) => {
      return (
        <tr>
          <td><button className={actions[m.action] ? 'cannot-cast' : m.action} onClick={() => renderDispatch(m.action)}>{m.button}</button></td>
          <td>{m.name}</td>
          <td style={calcCMB(m.name, true)}>{calcCMB(m.name)}</td>
          <td style={calcCMD(m.name, true)}>{calcCMD(m.name)}</td>
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

  const baselines = () => {
    return (
      <div style={{paddingLeft: '2.5%'}}><strong>CMB</strong> <span style={calcCMB(null, true)}>{calcCMB()}</span> || <strong>CMD</strong> <span style={calcCMD(null, true)}>{calcCMD()}</span> </div>
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
      {baselines()}
      {cm()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(CombatManeuver)
