import React from 'react'

const UsageOptions = props => {

  const [num, changeNum] = React.useState(0)

  const {options, complete} = props.usage_options
  const obj = {
    detail: "",
    cost: 1,
    amount: 1,
    destroy_after_use: false
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
    props.renderNestedChange("usage_options", "options", duplicate)
  }

  const changeDynamicForm = (i, name, value) => {
    let option = [...options][i]
    option[name] = value
    let newOptions = [...options]
    newOptions.splice(i, 1, option)
    props.renderNestedChange("usage_options", "options", newOptions)
  }

  const renderOptions = (option, i) => {
    return (
      <p key={i * 3 - 1} style={{borderBottom: "2px solid black", paddingBottom: "0.5em"}}>
        <strong>Option {i + 1}:</strong><br/><br/>

        Describe this specific option's details or effect<br/>
        <input type="text" name="detail" value={option.detail} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        When this feature option is used, how many instances does it cost, or how many instances of the limit does it use? Example: Casting Reduce Person costs "1 charge" from the Staff's 10 charges, and Shrink Item costs "2 charges"<br/>
        <input type="number" name="cost" value={option.cost} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        How many of this feature option exist? Example: Necklace of Fireballs can have 3 of a given option, and 1 of another option<br/>
        <input type="number" name="amount" value={option.amount} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)}/><br/>

        If this feature option is on an item, after the feature option is used, is the specific option destroyed or no longer available?<br/>
        <select value={option.destroy_after_use} onChange={(e) => changeDynamicForm(i, e.target.name, e.target.value)} name='destroy_after_use'>
          <option value="true">True</option>
          <option value="false">False</option>
        </select><br/>
      </p>
    )
  }


  return (
    <section>
      How many usage options does this feature have? {num}
      <button style={{width: "2.5em", height: "2em", marginLeft: "1em"}} onClick={() => renderDynamicForm("+")}>+</button>
      <button style={{width: "2.5em", height: "2em", marginLeft: "1em"}} onClick={() => num > 0 && renderDynamicForm("-")}>-</button>
      <br/>
      (This is for specific information for different options. If the feature does not have multiple ways it can be used, or if it uses different features for different options, do not fill this out; the description will be written on the actual Class Feature/Racial Traits/Feat details/Equipment/etc.)
      <br/>
      {options.map((option, i) => renderOptions(option, i))}
      <br/>
      Is this Usage Options Questionnaire Completed?<br/>
      <select value={complete} onChange={(e) => props.renderNestedChange("usage_options", "complete", e.target.value)} name='complete'>
        <option value={true}>True</option>
        <option value={false}>False</option>
      </select>
      <br/><br/>
      <button onClick={() => props.nextQuestion("usage_options")}>Next</button>
    </section>
  )
}
export default UsageOptions
