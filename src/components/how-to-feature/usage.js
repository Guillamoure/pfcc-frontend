import React from 'react'

const Usage = props => {

  const {limit, limit_frequency, destroy_after_use, adjustable, unit, toggleable, wieldable, complete} = props.usage

  return (
    <p>
      How Many Times can this Feature be used?<br/>
      <input type="number" name="limit" value={limit} onChange={(e) => props.renderNestedChange("usage", "limit", e.target.value)}/><br/>

      What is the frequency this feature can used given the above number? (1 times a round, 3 times a day, 2 times an hour)<br/>
      <select value={limit_frequency} onChange={(e) => props.renderNestedChange("usage", "limit_frequency", e.target.value)} name='limit_frequency'>
        <option value="">Choose</option>
        <option value="Round">Round</option>
        <option value="Day">Day</option>
        <option value="Forever">Forever</option>
      </select><br/>

      Is the number of times this feature can be used counted beside "times used"? Examples: feature can be used for 10 "minutes", used for 25 "rounds", used on up to 6 "allies" (write singular)<br/>
      <input type="text" name="unit" value={unit} onChange={(e) => props.renderNestedChange("usage", "unit", e.target.value)}/><br/>

      If this feature is on an item, after the feature is used, is the item destroyed?<br/>
      <select value={destroy_after_use} onChange={(e) => props.renderNestedChange("usage", "destroy_after_use", e.target.value)} name='destroy_after_use'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      Can the number of times this feature can be used be adjusted?<br/>
      <select value={adjustable} onChange={(e) => props.renderNestedChange("usage", "adjustable", e.target.value)} name='adjustable'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      Can the usage of this feature be switched on and off? Examples: Barbarian's Rage Rounds, Slippers of Spider Climbing<br/>
      <select value={toggleable} onChange={(e) => props.renderNestedChange("usage", "toggleable", e.target.value)} name='toggleable'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      If this feature is on an item, can it, and will it only be triggered, when character is wielding it?<br/>
      <select value={wieldable} onChange={(e) => props.renderNestedChange("usage", "wieldable", e.target.value)} name='wieldable'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      Is this Usage Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("usage", "complete", e.target.value)} name='complete'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      <br/>
      <button onClick={() => props.nextQuestion("usage")}>Next</button>
    </p>
  )
}
export default Usage
