import React from 'react'
import localhost from '../../localhost'

const Action = props => {

  const [actions, updateActions] = React.useState([])

  React.useEffect(() => {
    fetch(`${localhost}/api/v1/actions`)
      .then(r => r.json())
      .then(updateActions)
  }, [])

  let variableActions = actions.map(a => {
    let lower = a.name.toLowerCase()
    let array = lower.split(" ")
    let noAction = array.filter(word => word !== "action")
    return noAction.join("_")
  })

  return (
    <p>
      Does your feature take an action to trigger/use?
      <select value={props.action} onChange={props.renderChange} name='action'>
        <option value="">No Action</option>
        {variableActions.map((a, i) => <option key={i * 3 - 1} value={a}>{a}</option>)}
      </select>
      <button onClick={() => props.nextQuestion("action")}>Next</button>
    </p>
  )
}
export default Action
