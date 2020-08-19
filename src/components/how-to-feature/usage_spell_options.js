import React from 'react'

const UsageSpellOptions = props => {

  const [num, changeNum] = React.useState(0)

  const {spell_options, complete} = props.usage_spell_options
  const obj = {
    spell: "",
    cost: 1,
    castable: true,
  }

  const renderDynamicForm = (operator) => {
    let duplicate = [...spell_options]
    if (operator === "+"){
      duplicate.push(obj)
      changeNum(num + 1)
    } else if (operator === "-"){
      duplicate.pop()
      changeNum(num - 1)
    }
    props.renderNestedChange("usage_spell_options", "spell_options", duplicate)
  }

  const changeDynamicForm = (i, name, value) => {
    let option = [...spell_options][i]
    option[name] = value
    let newOptions = [...spell_options]
    newOptions.splice(i, 1, option)
    props.renderNestedChange("usage_spell_options", "spell_options", newOptions)
  }

  const renderOptions = (option, i) => {
    return (
      <p key={i * 3 - 1} style={{borderBottom: "2px solid black", paddingBottom: "0.5em"}}>
        <strong>Spell Option {i + 1}:</strong><br/><br/>

        What is the name of the Spell<br/>
        <input type="text" name="spell" value={option.spell} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        When this feature spell option is used, how many instances does it cost, or how many instances of the limit does it use? Example: Casting Reduce Person costs "1 charge" from the Staff's 10 charges, and Shrink Item costs "2 charges"<br/>
        <input type="number" name="cost" value={option.cost} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>


        Is this spell castable, or is it just a reference when using this feature?<br/>
        <select value={option.castable} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)} name='castable'>
          <option value="true">Castable</option>
          <option value="false">Just a Reference</option>
        </select><br/>
      </p>
    )
  }


  return (
    <section>
      How many usage spell options does this feature have? {num}
      <button style={{width: "2.5em", height: "2em", marginLeft: "1em"}} onClick={() => renderDynamicForm("+")}>+</button>
      <button style={{width: "2.5em", height: "2em", marginLeft: "1em"}} onClick={() => num > 0 && renderDynamicForm("-")}>-</button>
      <br/>
      {spell_options.map((option, i) => renderOptions(option, i))}
      <br/>
      Is this Usage Spell Options Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("usage_spell_options", "complete", e.target.value)} name='complete'>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <br/><br/>
      <button onClick={() => props.nextQuestion("usage_spell_options")}>Next</button>
    </section>
  )
}
export default UsageSpellOptions
