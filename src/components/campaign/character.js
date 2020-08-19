import React from 'react'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import { withRouter } from 'react-router-dom'

const Character = props => {

  console.log(props.character)

  const { name, character_magic_items, id } = props.character
  let unknowns = character_magic_items.filter(cmi => !cmi.known)

  const knownFetch = (id) => {
    fetch(`${localhost}/api/v1/character_magic_items_known/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({current_user: props.currentUser.id})
    })
      .then(r => r.json())
      .then(data => {
        props.dispatch({type: 'SIGNIN', user: data.current_user, admin: data.current_user.admin })
      })
  }

  const renderUnknownMagicItems = () => {
    return (
      <React.Fragment>
        <h4>Unknown Magic Items</h4>
        {unknowns.map((u, idx) => {
          let dc = 15 + u.magic_item.caster_level
          return <p key={u.magic_item.id*3-1}>{u.magic_item.name} || DC {dc} <button onClick={() => knownFetch(u.id)}>Known</button></p>
        })}
      </React.Fragment>
    )
  }

  console.log(props)
  return (
    <div className='character-campaign-card'>
      <p><strong className='underline-hover' onClick={() => props.history.push(`/characters/${id}`)}>{name}</strong></p>
      {!!unknowns.length && renderUnknownMagicItems()}
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Character))
