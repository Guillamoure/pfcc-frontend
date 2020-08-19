import React from 'react'

const Name = props => {
  return (
    <p>
      What is the name of your feature?
      <input type="text" name="name" value={props.name} onChange={props.renderChange}/>
      <button onClick={() => props.nextQuestion("name")}>Next</button>
    </p>
  )
}
export default Name
