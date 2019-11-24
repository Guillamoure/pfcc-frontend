import React from 'react'

const PreparedCard = props => {

  return (
    <div>
      <span><strong>{props.spell.name}</strong></span>
      <span> Lvl {props.level}</span>
      <span><button onClick={() => props.removePreparedSpell(props.spell.id)}>X</button></span>
    </div>
  )

}

export default (PreparedCard)
