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

  const { item } = props
  const { equipped, known } = props.cmi

  let featureWithUsage = item.features.find(f => f.usage)
  let usage = featureWithUsage ? featureWithUsage.usage : false
  const canEquip = ((item.slot !== 'potion' && item.slot !== 'none') || usage.wieldable) ? true : false
  let canBeStored = !props.cmi.stored_character_magic_item && !!containers
  let hasContents = !!item.features.find(f => f.feature_container)
  let adjustable = usage ? usage.adjustable : false

  const destroyItem = () => {
    fetch(`${localhost}/api/v1/character_magic_item/${props.cmi.id}`, {
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

  const renderEquip = () => {
    fetch(`${localhost}/api/v1/character_magic_items_equip/${props.cmi.id}`, {
      method: 'PATCH',
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
          // props.dispatch({type: 'CHARACTER', character: data.character })
          props.dispatch({type: 'EQUIP CMI', id: props.cmi.id})
        }
      })
  }

  const renderTrade = () => {
    fetch(`${localhost}/api/v1/character_magic_items_trade/${props.cmi.id}`, {
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
    let stored_cmi = props.cmi
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
      fetch(`${localhost}/api/v1/container/${props.cmi.container.id}`)
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
            {props.character.allies.filter(a => a.name !== props.character.name).map(a => <option value={a.id} >{a.name}</option>)}
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
    let containersExcludingSelf = containers.filter(c => c.id !== props.cmi.id)
    return containersExcludingSelf.map(cmi => <option value={cmi.container.id}>{`${cmi.character.name}'s ${cmi.discovered ? cmi.magic_item.name : cmi.false_desc}`}</option>)
  }

  const adjustSelection = () => {
    let featureUsage = props.cmi.character_magic_item_feature_usages.find(fu => fu.feature_usage_id === usage.id)
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


  return (
    <div>
      {canEquip && <button id='equipBtn' onClick={renderEquip}>{equipped ? 'Unequip' : 'Equip'}</button>}
      <button id='tradeBtn' onClick={() => setTrading(!trading)}>Trade</button>
      {canBeStored ? <button className={stash ? 'pressedBtn' : null} onClick={() => setStash(!stash)}>Stash</button> : <button onClick={() => renderWithdraw(props.cmi.id)}>Withdraw</button>}
      {hasContents && <button className={!!contents.length ? 'pressedBtn' : null} onClick={fetchContents}>Contents</button>}
      {adjustable && <button onClick={() => setAdjust(!adjust)}>Adjustable</button>}
      {!!contents.length ? renderContents() : null}
      {trading ? tradeSelection() : null}
      {stash ? stashSelection() : null}
      {adjust ? adjustSelection() : null}

      <div class='trash' onClick={destroyItem} ><FontAwesomeIcon icon={faTrash} size='1x'/></div>

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
