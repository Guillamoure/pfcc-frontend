import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../localhost'


const MagicItemSummary = props => {

  const [trading, setTrading] = React.useState(false);
  const [tradedChar, setTradedChar] = React.useState(0);
  const [stash, setStash] = React.useState(false);
  const [stashContainer, setStashContainer] = React.useState(0);
  const [containers, setContainers] = React.useState([])
  const [contents, setContents] = React.useState([])

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

  const canEquip = item.slot === 'potion' || item.slot === 'none' ? false : true
  let canBeStored = !props.cmi.stored_character_magic_item && !!containers
  let hasContents = !!item.features.find(f => f.feature_container)

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
            if (f.skill_bonus){
              const { skill_id, bonus, bonus_type, duration } = f.skill_bonus
              props.dispatch({type: 'BONUS', bonus: {type: 'skill', skill_id, bonus, bonus_type, duration, source: item.name}, alreadyEquipped: equipped})
            }
          })
          props.dispatch({type: 'CHARACTER', character: data.character })
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
    let container_cmi = containers.find(c => c.id === parseInt(stashContainer))
    let stored_cmi = props.cmi
    fetch(`${localhost}/api/v1/container_storage/${container_cmi.id}`, {
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

  const renderDescription = (desc) => {
    let descArray = desc.split("\n\n")
    let spellArray = item.features.map(f => {
      return f.spells.map(sp => {
        return _.lowerCase(sp.name)
      })
    })
    spellArray = _.flatten(spellArray)
    return descArray.map((para, idx) => {
      let paraDupe = para
      if (spellArray.length){

        let array = ''

        spellArray.forEach(s => {

          if (array.length > 1){
            array = array.map((ar, idx) => {
              if (!spellArray.includes(ar)){

                ar = ar.split(s)

                if (ar.length > 1){
                  ar.splice(1, 0, s)
                }
                return ar

              } else {
                return ar
              }
            })
            array = _.flatten(array)
          } else {

            array = para.split(s)

            if (array.length > 1){
              array.splice(1, 0, s)
            }
          }

        })

        paraDupe = array.map(ar => {
          if (spellArray.includes(ar)){
            let spell
            item.features.forEach(f => {
              f.spells.forEach(sp => {
                if (_.lowerCase(sp.name) === ar){
                  spell = sp
                }
              })
            })
            return <em className='underline-hover' onClick={() => props.editModal('spell', null, spell.id)}>{ar}</em>
          } else {
            return <React.Fragment>{ar}</React.Fragment>
          }
        })

      }
      return <p key={idx*3+1}>{paraDupe}</p>
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

  const renderTH = (num) => {
    let th = 'th'
    switch(num){
      case 1:
        th ='st'
        break
      case 2:
        th = 'nd'
        break
      case 3:
        th = 'rd'
        break
      default:
        th = 'th'
        break
    }
    return num + th
  }

  const renderMI = () => {
    return (
      <React.Fragment>
        <h3 style={{display: 'inline-block'}}>{item.name}</h3>
        {canEquip && <button id='equipBtn' onClick={renderEquip}>{equipped ? 'Unequip' : 'Equip'}</button>}
        <button id='tradeBtn' onClick={() => setTrading(!trading)}>Trade</button>
        {canBeStored ? <button className={stash ? 'pressedBtn' : null} onClick={() => setStash(!stash)}>Stash</button> : <button onClick={() => renderWithdraw(props.cmi)}>Withdraw</button>}
        {hasContents && <button className={!!contents.length ? 'pressedBtn' : null} onClick={fetchContents}>Contents</button>}
        {trading ? tradeSelection() : null}
        {stash ? stashSelection() : null}
        {!!contents.length ? renderContents() : null}
        <div><strong>Price</strong> {item.price_in_gp} gp; <strong>Slot</strong> {item.slot}; <strong>CL</strong> {renderTH(item.caster_level)}; <strong>Weight</strong> {item.weight} lb; <strong>Aura</strong> {item.aura}</div>
        <br/>
        <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
        {renderDescription(item.description)}
      </React.Fragment>
    )
  }


  const renderFalseDesc = () => {
    return (
      <React.Fragment>
        <h3>{props.cmi.false_desc}</h3>
        {canEquip && <button id='equipBtn' onClick={renderEquip}>{equipped ? 'Unequip' : 'Equip'}</button>}
        <button id='tradeBtn' onClick={() => setTrading(!trading)}>Trade</button>
        {canBeStored ? <button className={stash ? 'pressedBtn' : null} onClick={() => setStash(!stash)}>Stash</button> : <button onClick={() => renderWithdraw(props.cmi)}>Withdraw</button>}
        {hasContents && <button>Contents</button>}
        {trading ? tradeSelection() : null}
        {stash ? stashSelection() : null}
      </React.Fragment>
    )
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
    return containersExcludingSelf.map(cmi => <option value={cmi.id}>{`${cmi.character.name}'s ${cmi.discovered ? cmi.magic_item.name : cmi.false_desc}`}</option>)
  }

  return (
    <div>
      {known ? renderMI() : renderFalseDesc()}
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(MagicItemSummary)
