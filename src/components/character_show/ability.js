import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

function AbilityScore (props) {
  const mod = Math.floor((props.ability_score - 10) / 2)
  const truncate = _.upperCase(props.name.substring(0,3))
  const name = props.character.name
  const additionalMods = () => {
    let bonus = 0
    const hc = props.character_info.hardcode
    const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major'].includes(hc.major)
    if (props.name === "Strength"){
      if (largeMorph){
        bonus += 4
      }
    }
    if (props.name === "Dexterity"){
      if (largeMorph){
        bonus -= 2
      }
      if (name === "Cedrick"){
        bonus += 2
      }
    }
    if (props.name === "Intelligence"){
      if (name === "Persephone"){
        bonus += 2
      }
    }
    return bonus
  }
  const newMod = mod + (Math.floor(additionalMods() / 2))

  return (
    <span className='centered egg shadow shrink' >
      <div className='enhanced'>{newMod < 0 ? newMod : `+${newMod}`}</div>
      <div className='muted'><strong>{truncate}</strong></div>
      <div className='dull'>{props.ability_score + additionalMods()}</div>
    </span>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(AbilityScore)
