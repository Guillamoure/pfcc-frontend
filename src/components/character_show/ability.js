import React from 'react'
import _ from 'lodash'

function AbilityScore (props) {
  const mod = Math.floor((props.ability_score - 10) / 2)
  const truncate = _.upperCase(props.name.substring(0,3))

  return (
    <span className='centered egg shadow shrink' >
      <div className='enhanced'>{mod < 0 ? mod : `+${mod}`}</div>
      <div className='muted'><strong>{truncate}</strong></div>
      <div className='dull'>{props.ability_score}</div>
    </span>
  )
}
export default AbilityScore
