import React from 'react'
import { connect } from 'react-redux'

const Initiative = props => {

  const dexMod = (style) => {
    const hc = props.character_info.hardcode
    const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major'].includes(hc.major)
    const name = props.character.name
    const enlarger = hc.enlarge
    const reducer = hc.reduce
    let mod = Math.floor((props.character_info.ability_scores.dexterity - 10) / 2)
    if (name === "Cedrick"){
      mod += 1
    }
    if (name === 'Maddox'){
      // improved initiative
      mod += 4
    }
    const ogMod = mod
    if (largeMorph){
      mod -= 1
    }
    mod += enlarger ? -1 : 0
    mod += reducer ? 1 : 0
    if (!style){
      return mod < 0 ? mod : `+${mod}`
    } else {
      if (ogMod > mod){
        return {color: 'maroon'}
      } else if (ogMod < mod){
        return {color: 'green'}
      } else {
        return {color: 'black'}
      }
    }
  }

  return (
    <div id='init' className='shadow shrink'>
      <span className='centered'>
        <div className='dull'><strong>Init</strong></div>
        <div className='enhanced' style={dexMod(true)}>{dexMod()}</div>
      </span>
    </div>
  )
}
const mapStatetoProps = (state) => {
  return {
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Initiative)
