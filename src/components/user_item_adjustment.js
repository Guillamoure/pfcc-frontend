import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../localhost'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const UserItemAdjustment = props => {

  const [trading, setTrading] = React.useState(false);
  const [tradedChar, setTradedChar] = React.useState(0);
  const [stash, setStash] = React.useState(false);
  const [stashContainer, setStashContainer] = React.useState(0);
  const [containers, setContainers] = React.useState([])
  const [contents, setContents] = React.useState([])
  const [adjust, setAdjust] = React.useState(false);
  const [adjustedValue, setAdjustedValue] = React.useState(0);

  React.useEffect(() => {
    fetch(`${localhost}/api/v1/campaign_containers/${props.character.campaign.id}`)
      .then(r => r.json())
      .then(data => {
        console.log("Using the Effect!")
        setContainers(data)
      })
  }, [props.item])

  let itemType
  switch(props.url){
    case "character_weapon":
      itemType = 'weapon'
      break
    case "character_armor":
      itemType = 'armor'
      break
  }

  const { item, url } = props
  const { equipped, known } = props.characterItem

  let featureWithUsage = item.features ? item.features.find(f => f.usage) : false
  let usage = featureWithUsage ? featureWithUsage.usage : false
  const canEquip = ((item.slot !== 'potion' && item.slot !== 'none' && item.proficiency !== "") || usage.wieldable) ? true : false
  // AN ITEM IS EQUIPABLE IF IT:
    // IS NOT A POTION
    // IS A SLOTLESS ITEM
    // OR IF IT HAS A WIELDABLE PROPERTY IN ITS USAGE
  let canBeStored = !props.characterItem.stored_character_magic_item && !!containers
  let hasContents = item.features ? !!item.features.find(f => f.feature_container) : false
  let adjustable = usage ? usage.adjustable : false

  const destroyItem = () => {
    fetch(`${localhost}/api/v1/${url}s/${props.characterItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 404 || data.status === 500){
          console.log(data)
        } else {
          props.exitModal()
          props.dispatch({type: 'CHARACTER', character: data.character })
        }
      })
  }

  const renderEquip = (e) => {
    let newEquippedStatus = e.target.value
    if (itemType === 'armor'){ newEquippedStatus = newEquippedStatus === "true" ? true : false }
    fetch(`${localhost}/api/v1/${url}s_equip/${props.characterItem.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({equipped: newEquippedStatus})
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 404 || data.status === 500){
          console.log(data)
        } else {
          if (item.features) {
            item.features.forEach(f => {
              if (!!f.skill_bonuses.length){
                f.skill_bonuses.forEach(sk => {
                  const { skill_id, bonus, bonus_type, duration } = sk
                  // const conditions = sk.feature_skill_bonus_conditions.map(c => {return {condition: c.condition}})
                  props.dispatch({type: 'BONUS', bonus: {type: 'skill', skill_id, bonus, bonus_type, duration, source: item.name}, alreadyEquipped: equipped})
                })
              }
              if (!!f.stat_bonuses.length){
                f.stat_bonuses.forEach(st => {
                  const { statistic, bonus, bonus_type, duration } = st
                  const conditions = st.feature_stat_bonus_conditions.map(c => {return {condition: c.condition}})
                  props.dispatch({type: 'BONUS', bonus: {type: 'stat', statistic, bonus, bonus_type, duration, source: item.name, conditions}, alreadyEquipped: equipped})
                })
              }
              if (!!f.skill_notes.length){
                f.skill_notes.forEach(sk => {
                  const { skill_id, note} = sk
                  props.dispatch({type: 'BONUS', bonus: {type: 'note', skill_id, note, source: item.name}, alreadyEquipped: equipped})
                })
              }
              if (!!f.languages.length){
                f.languages.forEach(l => {
                  const { language, note } = l
                  props.dispatch({type: 'EFFECT', effect: {type: 'language', language, note, source: item.name}, alreadyEquipped: equipped})
                })
              }
            })
          }
          // props.dispatch({type: 'CHARACTER', character: data.character })
          let dispatchType
          dispatchType = url === 'character_magic_item' ? 'EQUIP CMI' : dispatchType
          dispatchType = url === 'character_weapon' ? 'EQUIP WEAPON' : dispatchType
          dispatchType = url === 'character_armor' ? 'EQUIP ARMOR' : dispatchType
          props.dispatch({type: dispatchType, id: props.characterItem.id, equipped: newEquippedStatus})
        }
      })
  }

  const renderTrade = () => {
    fetch(`${localhost}/api/v1/${url}s_trade/${props.characterItem.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        new_owner_id: tradedChar
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 404 || data.status === 500){
          console.log(data)
        } else {
          props.exitModal()
          props.dispatch({type: 'CHARACTER', character: data.character })
          setTrading(false)
          setTradedChar(0)

        }
      })
  }

  const renderStash = () => {
    let stored_cmi = props.characterItem
    fetch(`${localhost}/api/v1/container_storage/${stashContainer}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        cmi: stored_cmi.id
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 404 || data.status === 500){
          console.log(data)
        } else {
          props.exitModal()
          props.dispatch({type: 'CHARACTER', character: data.character })
          setStash(false)
          setStashContainer(0)
        }
      })
  }

  const renderWithdraw = (id) => {
    fetch(`${localhost}/api/v1/container_withdraw/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({cmi: true})
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 404 || data.status === 500){
          console.log(data)
        } else {
          props.exitModal()
          props.dispatch({type: 'CHARACTER', character: data.character })
          let newContents = contents.filter(c => c.id !== id)
        }
      })
  }

  const fetchContents = () => {
    if (!!contents.length){
      setContents([])
    } else {
      fetch(`${localhost}/api/v1/container/${props.characterItem.container.id}`)
      .then(r => r.json())
      .then(data => {
        setContents(data)
      })
    }
  }

  const fetchAdjust = (id) => {
    fetch(`${localhost}/api/v1/character_magic_items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({count: 0 - adjustedValue})
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 404 || data.status === 500){
          console.log(data)
        } else {
          props.exitModal()
          props.dispatch({type: 'CHARACTER', character: data.character })
          setAdjustedValue(0)
          setAdjust(false)
        }
      })
  }

  const tradeSelection = () => {
    return (
      <React.Fragment>
        <label>
          Who?
          <select name="tradedChar" value={tradedChar} onChange={(e) => setTradedChar(e.target.value)}>
            <option value= "" >Select One</option>
            {props.character.campaign.characters.filter(a => a.name !== props.character.name).map(a => <option value={a.id} >{a.name}</option>)}
          </select>
        </label>
        {!!tradedChar && <button onClick={renderTrade}>Enter</button>}
      </React.Fragment>
    )
  }

  const stashSelection = () => {
    return (
      <React.Fragment>
        <label>
        Who?
        <select name="stashContainer" value={stashContainer} onChange={(e) => setStashContainer(e.target.value)}>
        <option value= "" >Select One</option>
        {renderApplicableContainers()}
        </select>
        </label>
        {!!stashContainer && <button onClick={renderStash}>Enter</button>}
      </React.Fragment>
    )
  }

  const renderContents = () => {
    return (
      <div>
        <ul>
          {contents.map(cmi => <li>{`${cmi.character.name}'s ${cmi.discovered ? cmi.magic_item.name : cmi.false_desc}`} <button onClick={() => renderWithdraw(cmi.id)}>Withdraw</button></li>)}
        </ul>
      </div>
    )
  }

  const renderApplicableContainers = () => {
    let containersExcludingSelf = containers.filter(c => c.id !== props.characterItem.id)
    return containersExcludingSelf.map(cmi => <option value={cmi.container.id}>{`${cmi.character.name}'s ${cmi.discovered ? cmi.magic_item.name : cmi.false_desc}`}</option>)
  }

  const adjustSelection = () => {
    let featureUsage = props.characterItem.character_magic_item_feature_usages.find(fu => fu.feature_usage_id === usage.id)
    let currentUsage = featureUsage.current_usage || 0
    let limit = usage.limit
    let remaining = limit - currentUsage
    return (
      <React.Fragment>
        <span>{` (${remaining}/${limit})`}</span>
        {(adjustedValue + remaining < 10) && <button onClick={() => setAdjustedValue(adjustedValue + 1)}>+</button>}
        {(adjustedValue + remaining > 0) && <button onClick={() => setAdjustedValue(adjustedValue - 1)}>-</button>}
        <span>Adjust: {adjustedValue}</span>
        {!!adjustedValue && <button onClick={() => fetchAdjust(featureUsage.id)}>Submit</button>}
      </React.Fragment>
    )
  }

  const equipSelection = () => {
    let options = []
    if (itemType === 'weapon'){
      options.push(<option value="">{equipped ? "Unequip" : "Unequipped"}</option>)
      if (item.category === "Light" || item.category === "One-Handed") {
        options.push(<option value="Primary">Primary Hand</option>)
        options.push(<option value="Off">Off Hand</option>)
      }
      if (item.category === "One-Handed" || item.category === "Two-Handed"){options.push(<option value="Two">Two-Handed</option>)}
      if (item.double_weapon){options.push(<option value="Double">Double</option>)}

      if (item.weapon_hands.length){
        item.weapon_hands.forEach(wh => {
          if (wh.hands === "One") {options.push(<option value="Primary">Primary Hand</option>)}
          if (wh.hands === "One") {options.push(<option value="Off">Off Hand</option>)}
          if (wh.hands === "Two") {options.push(<option value="Two">Two-Handed</option>)}
        })
      }
    } else if (itemType === 'armor'){
      options.push(<option value={false}>Unequip{!equipped && "ed"} ({item.remove})</option>)
      options.push(<option value={true}>Equip{equipped && "ed"} ({item.don})</option>)
    }

    return (
      <label htmlFor="equipType" name="Equip">
        <select name="equipType" value={`${equipped}`} onChange={e => renderEquip(e)}>
          {options}
        </select>
      </label>
    )
  }


  return (
    <div>
      {canEquip ? equipSelection() : null}
      <button id='tradeBtn' onClick={() => setTrading(!trading)}>Trade</button>
      {canBeStored ? <button className={stash ? 'pressedBtn' : null} onClick={() => setStash(!stash)}>Stash</button> : <button onClick={() => renderWithdraw(props.characterItem.id)}>Withdraw</button>}
      {hasContents && <button className={!!contents.length ? 'pressedBtn' : null} onClick={fetchContents}>Contents</button>}
      {adjustable && <button onClick={() => setAdjust(!adjust)}>Adjustable</button>}
      {!!contents.length ? renderContents() : null}
      {trading ? tradeSelection() : null}
      {stash ? stashSelection() : null}
      {adjust ? adjustSelection() : null}

      <div className='trash' onClick={destroyItem} ><FontAwesomeIcon icon={faTrash} size='1x'/></div>

    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(UserItemAdjustment)
