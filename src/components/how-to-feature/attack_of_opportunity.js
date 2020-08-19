import React from 'react'

const AttackOfOpportunity = props => {
  return (
    <p>
      Does this feature threaten an Attack of Opportunity?
      <select value={props.attack_of_opportunity} onChange={props.renderChange} name='attack_of_opportunity'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <button onClick={() => props.nextQuestion("attack_of_opportunity")}>Next</button>
    </p>
  )
}
export default AttackOfOpportunity
