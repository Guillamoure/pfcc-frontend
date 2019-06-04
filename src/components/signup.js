import React from 'react'

class SignUp extends React.Component {

  state = {
    username: "",
    password: ""
  }

  renderSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
    })
  }

  renderChange = (e) => {

    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.renderSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.renderChange}/>
          </label>
          <label>
            Password:
            <input type="text" name="password" value={this.state.password} onChange={this.renderChange}/>
          </label>
          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }

}

export default SignUp
