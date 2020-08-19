import React from 'react'

const SkillBonuses = props => {

  const [num, changeNum] = React.useState(0)

  const {bonuses, complete} = props.skill_bonuses
  const obj = {
    skill: "",
    bonus: 1,
    bonus_type: "",
    duration: "",
    custom: "",
    notes: ""
  }

  const renderDynamicForm = (operator) => {
    let duplicate = [...bonuses]
    if (operator === "+"){
      duplicate.push(obj)
      changeNum(num + 1)
    } else if (operator === "-"){
      duplicate.pop()
      changeNum(num - 1)
    }
    props.renderNestedChange("skill_bonuses", "bonuses", duplicate)
  }

  const changeDynamicForm = (i, name, value) => {
    let option = [...bonuses][i]
    option[name] = value
    let newOptions = [...bonuses]
    newOptions.splice(i, 1, option)
    props.renderNestedChange("skill_bonuses", "bonuses", newOptions)
  }

  const renderOptions = (option, i) => {
    return (
      <p key={i * 3 - 1} style={{borderBottom: "2px solid black", paddingBottom: "0.5em"}}>
        <strong>Skill Bonus {i + 1}:</strong><br/><br/>

        Which Skill?<br/>
        <input type="text" name="skill" value={option.skill} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        How much is the bonus?<br/>
        <input type="number" name="bonus" value={option.bonus} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        What kind of bonus is it?<br/>
        <select value={option.bonus_type} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)} name='bonus_type'>
          <option value="">Choose</option>
          <option value="Circumstance">Circumstance</option>
          <option value="Competence">Competence</option>
          <option value="Insight">Insight</option>
          <option value="Luck">Luck</option>
          <option value="Morale">Morale</option>
          <option value="Profane">Profane</option>
          <option value="Sacred">Sacred</option>
        </select><br/>

        How Long does the Bonus Last?<br/>
        <select value={option.duration} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)} name='duration'>
          <option value="">Choose</option>
          <option value="Permanent">Permanent</option>
        </select><br/>

        Does this skill only apply to a subset of a skill? Example: Perform (percussion), Profession (sailor), Craft (alchemy)<br/>
        <input type="text" name="custom" value={option.custom} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        Does this feature have specific details or notes that could appear as a tooltip? Please use separate lines for seperate details<br/>
        <input type="text" name="notes" value={option.notes} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

      </p>
    )
  }


  return (
    <section>
      Does this Feature grant skill bonuses? How many? {num}
      <button style={{width: "2.5em", height: "2em", marginLeft: "1em"}} onClick={() => renderDynamicForm("+")}>+</button>
      <button style={{width: "2.5em", height: "2em", marginLeft: "1em"}} onClick={() => num > 0 && renderDynamicForm("-")}>-</button>
      <br/>
      {bonuses.map((option, i) => renderOptions(option, i))}
      <br/>
      Is this Skill Bonuses Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("skill_bonuses", "complete", e.target.value)} name='complete'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <br/><br/>
      <button onClick={() => props.nextQuestion("skill_bonuses")}>Next</button>
    </section>
  )
}
export default SkillBonuses
