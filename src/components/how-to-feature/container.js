import React from 'react'

const Container = props => {

  const {weight, volume_cubic_feet, complete} = props.container

  return (
    <p>
      Fill out if feature or item is container
      <br/><br/>

      How much weight can this feature or item hold?<br/>
      <input type="number" name="weight" value={weight} onChange={(e) => props.renderNestedChange("container", "weight", e.target.value)}/><br/>

      How many cubic feet can this feature or item hold?<br/>
      <input type="number" name="volume_cubic_feet" value={volume_cubic_feet} onChange={(e) => props.renderNestedChange("container", "volume_cubic_feet", e.target.value)}/><br/>


      Is this Container Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("container", "complete", e.target.value)} name='complete'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      <button onClick={() => props.nextQuestion("name")}>Next</button>
    </p>
  )
}
export default Container
