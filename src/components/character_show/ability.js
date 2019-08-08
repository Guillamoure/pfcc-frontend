import React from 'react'

function AbilityScore (props) {
  const mod = Math.floor((props.ability_score - 10) / 2)

  return (
    <span className='centered egg' >
      <div className='enhanced'>{mod < 0 ? mod : `+${mod}`}</div>
      <div className='muted'><strong>{props.name}</strong></div>
      <div className='dull'>{props.ability_score}</div>
    </span>
  )
}
export default AbilityScore
