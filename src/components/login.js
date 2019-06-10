import React from 'react'
import { connect } from 'react-redux'

class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  // renderSignedIn = () => {
  //   if (this.props.currentUser){
  //     render(){
  //       <Redirect to='/classes'/>
  //     }
  //   }
  // }

  componentDidMount() {
    const token = localStorage.getItem('token')
    console.log('token is', token)
    
  }


  renderSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then(data => {
      if(!data.error){
        console.log("Welcome", data.user.username)
        this.props.dispatch({type: 'SIGNIN', user: data.user, admin: data.user.admin })
        localStorage.setItem("token", data.token)
        this.setState({username: "", password: ""})
        this.props.history.push("/")
      } else {
        console.log(data.error)
      }
    })
  }

  renderChange = (e) => {

    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    console.log(this.props)
    return (
      <div>
      Login Form
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
        {this.props.currentUser ? <span>Hi {this.props.currentUser.username}!</span> : null}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(Login)
