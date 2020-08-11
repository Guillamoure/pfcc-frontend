import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { calculateWeight, calculateLoad } from '../../../helper_functions/calculations/character'

const Movement = props => {

  const movementRedux = props.character_info.movement
  const actions = props.character_info.actions

  const [baseSpeed, setBaseSpeed] = React.useState(0)

  React.useEffect(() => {
    let base = _.maxBy(movementRedux.map(mr => {
      return mr.movement === "Base" && !mr.bonus && !mr.penalty ? mr.feet : 0
    }))
    movementRedux.forEach(mr => {
      let unlessLoads = mr.conditions?.map(c => c.unless_load)

      let load = calculateLoad(calculateWeight(props.character, props.character_info), props.character_info.ability_scores.strength)

      if (!unlessLoads || !unlessLoads.includes(load) || (load === "Light" && (!unlessLoads.includes("Medium") || !unlessLoads.includes("Heavy"))) || (load === "Medium" && !unlessLoads.includes("Heavy"))){
        base += mr.movement === "Base" && mr.bonus && !mr.penalty ? mr.feet : 0
        base -= mr.movement === "Base" && !mr.bonus && mr.penalty ? mr.feet : 0
      }
    })



    setBaseSpeed(base)
  }, [movementRedux])

  const renderDispatch = action => {
    // if ((action === 'standard' || action  === 'move' || action === 'swift') && actions.full){
    //   return null
    // } else if (action === 'full' && (actions.standard || actions.move || actions.swift)){
    //   return null
    // } else if (!action === 'free'){
    //   props.dispatch({type: 'TRIGGER ACTION', action})
    // }
  }

  const canCast = (action, detail) => {
    return "full"
  }

  const mvmt = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button className={actions.move ? 'cannot-cast' : "move"} onClick={() => renderDispatch('move')}><strong>Move</strong></button></td>
            <td>Move</td>
            <td>{baseSpeed} ft</td>
          </tr>
          <tr>
            <td><button className={actions.move ? 'cannot-cast' : "free"} onClick={() => props.dispatch({type: 'FIVE FOOT STEP'})}><strong>Move</strong></button></td>
            <td>Move</td>
            <td>5 ft</td>
          </tr>
          <tr>
            <td><button className={canCast('full', 'run')} onClick={() => renderDispatch('full', 'run')}><strong>Move</strong></button></td>
            <td>Run</td>
            <td>{baseSpeed * 4} ft</td>
          </tr>
        </tbody>
      </table>
    )
  }


  return (
    <React.Fragment>
      {mvmt()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(Movement)
