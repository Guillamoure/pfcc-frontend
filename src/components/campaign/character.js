import React from 'react'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { sendCampaignWebsocket } from '../../utils/websocket/campaign'

const Character = props => {

  const { name, character_magic_items, id, character_potions, character_scrolls } = props.character
  let unknownMagicItems = character_magic_items.filter(cmi => !cmi.known)
  let unknownPotions = character_potions.filter(cp => !cp.known)
  let unknownScrolls = character_scrolls.filter(cs => !cs.known)

  const knownFetch = (id, itemType, name, obj) => {
    fetch(`${localhost}/api/v1/character_magic_items_known/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({current_user: props.currentUser.id, item_type: itemType})
    })
      .then(r => r.json())
      .then(data => {
				sendCampaignWebsocket({message: `You now know that you have a ${name}!`, reciever_id: props.character.id, itemType, data: {...obj, known: true}}, {dm: true}, {knownItem: true})

      })
  }

  const renderUnknownMagicItems = () => {
		if (unknownMagicItems.length || unknownPotions.length || unknownScrolls.length){
			return (
				<>
					<h4>Unknown Magic Items</h4>
					{unknownMagicItems.map((u, idx) => {
						let dc = 15 + u.magic_item.caster_level
						return <p key={u.magic_item.id*3-1}>{u.magic_item.name} || DC {dc} Spellcraft <button onClick={() => knownFetch(u.id, "magic_item", u.magic_item.name, u)}>Known</button></p>
					})}
					{unknownPotions.map((u, idx) => {
						let dc = 15 + u.caster_level
						let name = `${_.capitalize(u.potion_or_oil)} of ${u.spell.name}`
						return <p key={u.spell.id*3-1}>{name} || DC {dc} Perception <button onClick={() => knownFetch(u.id, "potion", name, u)}>Known</button></p>
					})}
					{unknownScrolls.map((u, idx) => {
						let dc = 20 + u.spell_level
						let name = `Scroll of ${u.spell.name}`
						return <p key={u.spell.id*3-1}>{name} || DC {dc} Spellcraft <button onClick={() => knownFetch(u.id, "scroll", name, u)}>Known</button></p>
					})}
				</>
			)
		}
  }

  return (
    <div className='character-campaign-card'>
      <p><strong className='underline-hover' onClick={() => props.history.push(`/characters/${id}`)}>{name}</strong></p>
      {renderUnknownMagicItems()}
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
