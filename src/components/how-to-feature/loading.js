import React from 'react'

const Loading = props => {

  const {capacity, must_reload_after_use, complete} = props.loading

  return (
    <p>
      Fill out if feature/item must be reloading after use<br/><br/>

      What is the capacity of this feature/item?<br/>
      <input type="number" name="capacity" value={capacity} onChange={(e) => props.renderNestedChange("movement", "capacity", e.target.value)}/><br/>

      Must this feature/item needed to be reloaded after use?<br/>
      <select value={must_reload_after_use} onChange={(e) => props.renderNestedChange("loading", "must_reload_after_use", e.target.value)} name='must_reload_after_use'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      Is this Loading Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("loading", "complete", e.target.value)} name='complete'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      <br/>
      <button onClick={() => props.nextQuestion("loading")}>Next</button>
    </p>
  )
}
export default Loading
