import React from 'react'

const PreparedCard = props => {

  return (
    <tr>
      <td className='bordered-table'><strong>{props.spell.name}</strong></td>
      <td className='bordered-table'> Lvl {props.level}</td>
      {!props.alreadyPrepared && <td><button onClick={() => props.removePreparedSpell(props.spell.id, props.level)}>X</button></td>}
    </tr>
  )

}

export default (PreparedCard)
