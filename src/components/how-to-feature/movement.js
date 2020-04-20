import React from 'react'

const Movement = props => {

  const {movement, feet, bonus, penalty, complete} = props.movement

  return (
    <p>
      Fill out if feature gives a character a movement speed change<br/><br/>

      What type of movement speed change does this give<br/>
      <select value={movement} onChange={(e) => props.renderNestedChange("movement", "movement", e.target.value)} name='movement'>
        <option value="">Choose</option>
        <option value="Base">Base</option>
        <option value="Climb">Climb</option>
        <option value="Swim">Swim</option>
        <option value="Burrow">Burrow</option>
      </select><br/>

      What is the feet specified for this feature<br/>
      <input type="number" name="feet" value={feet} onChange={(e) => props.renderNestedChange("movement", "feet", e.target.value)}/><br/>

      Is this movement a increase/bonus to a current movement speed?<br/>
      <select value={bonus} onChange={(e) => props.renderNestedChange("movement", "bonus", e.target.value)} name='bonus'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      Is this movement a decrease/penalty to a current movement speed?<br/>
      <select value={penalty} onChange={(e) => props.renderNestedChange("movement", "penalty", e.target.value)} name='penalty'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      Is this Movement Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("movement", "complete", e.target.value)} name='complete'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select><br/>

      <br/>
      <button onClick={() => props.nextQuestion("movement")}>Next</button>
    </p>
  )
}
export default Movement
