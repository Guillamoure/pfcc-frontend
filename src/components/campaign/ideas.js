import React from 'react'
import localhost from '../../localhost'

const Ideas = props => {

  const [amount, setAmount] = React.useState(1)
  const [ideas, setIdeas] = React.useState([])

  const renderChange = (event) => {
    let n = event.target.value
    setAmount(n)
  }

  const fetchIdeas = () => {
    fetch(`${localhost}/api/v1/ideas/${amount}`)
      .then(r => r.json())
      .then(setIdeas)
  }

  return (
    <div>
      <label>
        Number of Ideas:
        <input type="number" name="ideas" value={amount} onChange={renderChange}/>
      </label>
      <button onClick={fetchIdeas}>Brainstorm</button>
      <ul>
        {ideas.map((idea, i) => <li key={i*3-1}>{i+1}) {idea}</li>)}
      </ul>
    </div>
  )
}

export default Ideas
