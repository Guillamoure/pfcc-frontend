import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Portal from '../portal'
import localhost from '../localhost'

const CharacterFeatureModal = props => {

  const [cf, setCF] = React.useState(null);
  const [adjustedValue, setAdjustedValue] = React.useState(-1);

  React.useEffect(() => {
    fetch(`${localhost}/api/v1/${props.detail}/${props.cfId}`)
      .then(r => r.json())
      .then(data => {
        setCF(data)
      })
  }, [props.cfId])

  const fetchAdjust = (id, info) => {
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

          if (adjustedValue < 0){

            info.movement && props.dispatch( { type: 'ACTIVATED FEATURE', feature: { type: 'movement', source: info.source, movement: info.movement.movement, feet: info.movement.feet, bonus: info.movement.bonus, penalty: info.movement.penalty, duration: 'temporary' } } )

          }
        }
      })
  }


  const renderPage = () => {
    console.log(cf)
    const { name, features } = cf.magic_item
    let info = {}

    features.forEach(f => {
      let u = f.usage
      if (u){
        info.limit = u.limit
        info.unit = u.unit
        let cmifu = cf.character_magic_item_feature_usages.find(fu => fu.feature_usage_id === u.id)
        info.cmifuId = cmifu.id
        info.remaining = u.limit - cmifu.current_usage
        info.movement = f.movement
        info.source = cf.magic_item.name
      }
    })

    if (info.remaining === 0 && adjustedValue === -1){
      setAdjustedValue(0)
    }

    let alreadyImplemented = props.character_info.features.find(f => f.source === info.source)


    return (
      <React.Fragment>
        <h3>{name}</h3>
        <div>
          <span>{info.remaining}/{info.limit} {info.unit}s</span>
          <div>Adjust Available {_.capitalize(info.unit)}s: {adjustedValue}</div>
          {(adjustedValue + info.remaining < 10) && <button onClick={() => setAdjustedValue(adjustedValue + 1)}>+</button>}
          {(adjustedValue + info.remaining > 0) && <button onClick={() => setAdjustedValue(adjustedValue - 1)}>-</button>}
          <div>
            {info.movement && <p>{info.movement.movement} Speed: {info.movement.feet} ft</p>}
          </div>
          {!!adjustedValue && !alreadyImplemented && <button onClick={() => fetchAdjust(info.cmifuId, info)}>{adjustedValue > 0 ? `Restore ${info.unit}s` : 'Activate Feature' }</button>}

          {alreadyImplemented && <button onClick={() => props.dispatch({type: 'ACTIVATED FEATURE', feature: {source: info.source, remove: true}})}>Cancel Active Feature</button>}

        </div>
      </React.Fragment>
    )
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          {cf && renderPage()}
        </div>
      </div>
    </Portal>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(CharacterFeatureModal)
