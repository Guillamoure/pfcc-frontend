import React from 'react'
import { connect } from 'react-redux'

class Login extends React.Component {

  state = {
    username: "",
    password: "",
    error: false
  }

  // renderSignedIn = () => {
  //   if (this.props.currentUser){
  //     render(){
  //       <Redirect to='/classes'/>
  //     }
  //   }
  // }

  // componentDidMount() {
  //   const token = localStorage.getItem('token')
  //   console.log('token is', token)
  //
  // }


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
        this.props.dispatch({type: 'SIGNIN', user: data.user, admin: data.user.admin })
        localStorage.setItem("token", data.token)
        this.setState({username: "", password: "", error: false})
        this.props.history.push("/")
      } else {
        console.log(data.error)
        this.setState({username: "", password: "", error: true})
      }
    })
  }

  renderChange = (e) => {

    this.setState({[e.target.name]: e.target.value})
  }

  render() {
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
        {this.state.error ? <p><strong>Invalid login. Please try again.</strong></p> : null}
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
