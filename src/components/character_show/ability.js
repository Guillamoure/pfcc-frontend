import React from 'react'

function AbilityScore (props) {
  let score = props.ability
  props.racialModifiers.forEach(mod => {
    if (props.name === mod.ability_score){
      score += mod.bonus
    }
  })
  if (props.anyBonus === props.name){
    score +=2
  }

  const mod = Math.floor((score - 10) / 2)
  console.log('ability score', mod)


  return (
    <span className='centered egg' >
      <div className='enhanced'>{mod < 0 ? mod : `+${mod}`}</div>
      <div className='muted'><strong>{props.name}</strong></div>
      <div className='dull'>{score}</div>
    </span>
  )
}
export default AbilityScore
