import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class NavBar extends React.Component {

  state ={
    currentUser : ""
  }

  componentDidUpdate(){
    const token = localStorage.getItem("token")
    if (!this.state.currentUser && token){
      fetch("http://localhost:3000/api/v1/auth", {
        headers: {
          Authenticate: token
        }
      })
      .then(r => r.json())
      .then((data) => {
        if (!data.error) {
          this.props.dispatch({type: 'SIGNIN', user: data.current_user, admin: data.current_user.admin })
          this.setState({currentUser: data.current_user})
          if(this.props.location.pathname === "/login" || this.props.location.pathname === "/signup"){this.props.history.push("/")}
        }
      })
    }
  }

  renderLogOut = () => {
    localStorage.removeItem("token")
    this.props.dispatch({type: "SIGNOUT"})
    this.setState({currentUser: ""})
    this.props.history.push('/login')
  }

  render() {
    // console.log("The navbar state", this.state)
    console.log("The navbar props", this.props)
    // if (this.state.currentUser !== ""){
    //   this.setState({currentUser: this.props.currentUser})
    // }
    return (
      <div>
        <button onClick={() => this.props.history.push('/classes')}>Classes</button>
        <button onClick={() => this.props.history.push('/races')}>Races</button>
        {this.state.currentUser ? <button onClick={() => this.props.history.push('/')}>{this.state.currentUser.username}</button>: <button onClick={() => this.props.history.push('/login')}>Login</button>}
        {this.state.currentUser ? <button onClick={this.renderLogOut}>Log Out</button> : <button onClick={() => this.props.history.push('/signup')}>Sign Up</button>}
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

export default withRouter(connect(mapStatetoProps)(NavBar))
