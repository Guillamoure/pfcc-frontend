import React from 'react'

class NewClass extends React.Component {

  state = {
    name: "",
    description: "",
    hit_die: 0,
    skill_ranks: 0
  }

  renderSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then(this.setState({name: "", description: "", hit_die: 0, skill_ranks: 0}))
  }

  renderChange = (e) => {

    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.renderSubmit}>
          <label>
            Class Name:
            <input type="text" name="name" value={this.state.name} onChange={this.renderChange}/>
          </label>
          <br />
          <br />
          <label>
            Desciption:
            <input type="textfield" name="description" value={this.state.desciption} onChange={this.renderChange}/>
          </label>
          <br />
          <br />
          <label>
            Hit Die:
            <select name="hit_die" value={this.state.hit_die} onChange={this.renderChange}>
              <option value= "12" >d12</option>
              <option value= "10" >d10</option>
              <option value= "8" >d8</option>
              <option value= "6" >d6</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Skill Ranks:
            <input type="number" name="skill_ranks" value={this.state.skill_ranks} onChange={this.renderChange}/>
          </label>
          <br />
          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }

}

export default NewClass
