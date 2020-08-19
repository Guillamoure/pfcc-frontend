import React from 'react'

const Languages = props => {

  const [num, changeNum] = React.useState(0)

  const {options, complete} = props.languages
  const obj = {
    language: "",
    note: ""
  }

  const renderDynamicForm = (operator) => {
    let duplicate = [...options]
    if (operator === "+"){
      duplicate.push(obj)
      changeNum(num + 1)
    } else if (operator === "-"){
      duplicate.pop()
      changeNum(num - 1)
    }
    props.renderNestedChange("languages", "options", duplicate)
  }

  const changeDynamicForm = (i, name, value) => {
    let option = [...options][i]
    option[name] = value
    let newOptions = [...options]
    newOptions.splice(i, 1, option)
    props.renderNestedChange("languages", "options", newOptions)
  }

  const renderOptions = (option, i) => {
    return (
      <p key={i * 3 - 1} style={{borderBottom: "2px solid black", paddingBottom: "0.5em"}}>
        <strong>Langauge {i + 1}:</strong><br/><br/>

        What langauge does it give you<br/>
        <input type="text" name="language" value={option.language} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        Does this feature have specific details or notes that could appear as a tooltip? Please use separate lines for seperate details<br/>
        <input type="text" name="note" value={option.note} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>
      </p>
    )
  }


  return (
    <section>
      Does this feature give you additional languages? How many? {num}
      <button style={{width: "2.5em", height: "2em", marginLeft: "1em"}} onClick={() => renderDynamicForm("+")}>+</button>
      <button style={{width: "2.5em", height: "2em", marginLeft: "1em"}} onClick={() => num > 0 && renderDynamicForm("-")}>-</button>
      <br/>
      {options.map((option, i) => renderOptions(option, i))}
      <br/>
      Is this Languages Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("languages", "complete", e.target.value)} name='complete'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <br/><br/>
      <button onClick={() => props.nextQuestion("languages")}>Next</button>
    </section>
  )
}
export default Languages
