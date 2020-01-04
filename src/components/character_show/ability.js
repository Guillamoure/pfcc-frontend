import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

function AbilityScore (props) {

  // const mod = Math.floor((props.ability_score - 10) / 2)
  const truncate = _.upperCase(props.name.substring(0,3))
  const name = props.character.name

  let score = props.ability_score
  const hc = props.character_info.hardcode
  const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major', 'Chameleon - Major'].includes(hc.major)
  const enlarger = hc.enlarge
  const reducer = hc.reduce
  const age = name === 'Maddox' && hc.age

  if (props.name === "Strength"){
    if (largeMorph){
      score += 4
    }
    score += enlarger ? 2 : 0
    score += reducer ? -2 : 0

    score += age === 'Young' ? -2 : 0
    score += age === 'Middle' ? -1 : 0
    score += age === 'Old' ? -2 : 0
    score += age === 'Venerable' ? -3 : 0
  } else if (props.name === "Dexterity"){
    if (largeMorph){
      score -= 2
    }
    if (name === "Cedrick"){
      score += 2
    }
    score += enlarger ? -2 : 0
    score += reducer ? 2 : 0

    score += age === 'Young' ? 2 : 0
    score += age === 'Middle' ? -1 : 0
    score += age === 'Old' ? -2 : 0
    score += age === 'Venerable' ? -3 : 0
  } else if (props.name === 'Constitution'){

    score += age === 'Young' ? -2 : 0
    score += age === 'Middle' ? -1 : 0
    score += age === 'Old' ? -2 : 0
    score += age === 'Venerable' ? -3 : 0
  } else if (props.name === "Intelligence"){
    if (name === "Persephone"){
      score += 2
    }

    score += age === 'Middle' ? 1 : 0
    score += age === 'Old' ? 1 : 0
    score += age === 'Venerable' ? 1 : 0
  } else if (props.name === 'Wisdom'){
    score += age === 'Young' ? -2 : 0
    score += age === 'Middle' ? 1 : 0
    score += age === 'Old' ? 1 : 0
    score += age === 'Venerable' ? 1 : 0
  } else if (props.name === 'Charisma'){
    score += age === 'Middle' ? 1 : 0
    score += age === 'Old' ? 1 : 0
    score += age === 'Venerable' ? 1 : 0
  }

  const mod = (Math.floor( (score - 10) / 2))
  return (
    <span className='centered egg shadow shrink' >
      <div className='enhanced'>{mod < 0 ? mod : `+${mod}`}</div>
      <div className='muted'><strong>{truncate}</strong></div>
      <div className='dull'>{score}</div>
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
