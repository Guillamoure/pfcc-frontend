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

  const fetchAdjust = (id, url, info) => {
    fetch(`${localhost}/api/v1/${url}/${id}`, {
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

            info.movements && info.movements.forEach(m => {
              props.dispatch( { type: 'ACTIVATED FEATURE', feature: { type: 'movement', source: info.source, movement: m.movement, feet: m.feet, bonus: m.bonus, penalty: m.penalty, duration: 'temporary' } } )

            })

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
        info.movements = f.movements
        info.source = cf.magic_item.name
        info.options = u.options
        info.cmifuo = cf.character_magic_item_feature_usage_options
      }
    })

    if ((info.remaining === 0 || info.options) && adjustedValue === -1){
      setAdjustedValue(0)
    }

    let alreadyImplemented = props.character_info.features.find(f => f.source === info.source)

    console.log(info.options)
    return (
      <React.Fragment>
        <h3>{name}</h3>
        <div>
          <span>{info.remaining}/{info.limit} {info.unit}s</span>
          {!info.options.length && (
            <React.Fragment>
              <div>Adjust Available {_.capitalize(info.unit)}s: {adjustedValue}</div>
              {(adjustedValue + info.remaining < 10) && <button onClick={() => setAdjustedValue(adjustedValue + 1)}>+</button>}
              {(adjustedValue + info.remaining > 0) && <button onClick={() => setAdjustedValue(adjustedValue - 1)}>-</button>}
            </React.Fragment>
          )}
          {!!info.options.length && (
            <React.Fragment>
              {info.options.map(op => {
                let cmifuo = info.cmifuo.find(fuo => fuo.feature_usage_option_id === op.id)
                let remainingOptions = op.amount - cmifuo.current_usage
                if (remainingOptions !== 0){
                  return <p>{remainingOptions} {op.amount === 1 ? info.unit : info.unit + 's'}: {op.detail} <button onClick={() => fetchAdjust(cmifuo.id, 'character_magic_item_feature_usage_options', info)}>Expend {info.unit}</button></p>
                } else {
                  return null
                }
              })}
            </React.Fragment>
          )}
          <div>
            {info.movement && <p>{info.movement.movement} Speed: {info.movement.feet} ft</p>}
          </div>
          {!!adjustedValue && !alreadyImplemented && <button onClick={() => fetchAdjust(info.cmifuId, 'character_magic_items', info)}>{adjustedValue > 0 ? `Restore ${info.unit}s` : 'Activate Feature' }</button>}

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
