import React from 'react'

const StatBonuses = props => {

  const [num, changeNum] = React.useState(0)

  const {bonuses, complete} = props.stat_bonuses
  const obj = {
    statistic: "",
    bonus: 1,
    bonus_type: "",
    duration: "",
    note: ""
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
    props.renderNestedChange("stat_bonuses", "bonuses", duplicate)
  }

  const changeDynamicForm = (i, name, value) => {
    let option = [...bonuses][i]
    option[name] = value
    let newOptions = [...bonuses]
    newOptions.splice(i, 1, option)
    props.renderNestedChange("stat_bonuses", "bonuses", newOptions)
  }

  const renderOptions = (option, i) => {
    return (
      <p key={i * 3 - 1} style={{borderBottom: "2px solid black", paddingBottom: "0.5em"}}>
        <strong>Skill Bonus {i + 1}:</strong><br/><br/>

        Which Statistic?<br/>
        <select value={option.statistic} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)} name='statistic'>
          <option value="">Choose Statistic</option>
          <option value="Strength">Strength</option>
          <option value="Dexterity">Dexterity</option>
          <option value="Constitution">Constitution</option>
          <option value="Intelligence">Intelligence</option>
          <option value="Wisdom">Wisdom</option>
          <option value="Charisma">Charisma</option>
          <option value="Initiative">Initiative</option>
          <option value="Save">Save</option>
          <option value="Fortitude">Fortitude</option>
          <option value="Reflex">Reflex</option>
          <option value="Will">Will</option>
        </select><br/>

        How much is the bonus?<br/>
        <input type="number" name="bonus" value={option.bonus} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        What kind of bonus is it?<br/>
        <select value={option.bonus_type} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)} name='bonus_type'>
          <option value="">Choose</option>
          <option value="Alchemical">Alchemical</option>
          <option value="Circumstance">Circumstance</option>
          <option value="Competence">Competence</option>
          <option value="Enhancement">Enhancement</option>
          <option value="Inherent">Inherent</option>
          <option value="Insight">Insight</option>
          <option value="Luck">Luck</option>
          <option value="Morale">Morale</option>
          <option value="Profane">Profane</option>
          <option value="Resistance">Resistance</option>
          <option value="Sacred">Sacred</option>
          <option value="Size">Size</option>
        </select><br/>

        How Long does the Bonus Last?<br/>
        <select value={option.duration} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)} name='duration'>
          <option value="">Choose</option>
          <option value="Permanent">Permanent</option>
        </select><br/>

        Does this feature have specific details or notes that could appear as a tooltip? Please use separate lines for seperate details<br/>
        <input type="text" name="note" value={option.note} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

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
      Is this Stat Bonuses Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("stat_bonuses", "complete", e.target.value)} name='complete'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <br/><br/>
      <button onClick={() => props.nextQuestion("stat_bonuses")}>Next</button>
    </section>
  )
}
export default StatBonuses
