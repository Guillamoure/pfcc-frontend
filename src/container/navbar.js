import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import localhost from '../localhost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

class NavBar extends React.Component {

  state ={
    currentUser : null,
    menuDropDown: false
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    if (!this.state.currentUser && token){
      fetch(`${localhost}/api/v1/auth`, {
        headers: {
          Authenticate: token
        }
      })
      .then(r => r.json())
      .then((data) => {
        if (!data.error) {
          this.props.dispatch({type: 'SIGNIN', user: data.current_user, admin: data.current_user.admin })
          console.log(data)
          this.setState({currentUser: data.current_user})
          if(this.props.location.pathname === "/login" || this.props.location.pathname === "/signup"){this.props.history.push("/")}
        }
      })
    }
    // COMMENTED OUT FOR TESTING PURPOSES
    // let data = {
    //   current_user: {
    //     id: 1,
    //     skillset_id: 2,
    //     username: "jack",
    //     admin: true,
    //     campaigns: [],
    //     characters: []
    //   }
    // }
    // this.props.dispatch({type: 'SIGNIN', user: data.current_user, admin: data.current_user.admin })
    // console.log(data)
    // this.setState({currentUser: data.current_user})
    // console.log(this.props.location.pathname)
    // this.props.history.push("/")

  }

  renderLogOut = () => {
    localStorage.removeItem("token")
    this.props.dispatch({type: "SIGNOUT"})
    this.setState({currentUser: ""})
    this.props.history.push('/login')
  }

  menuClick = (url) => {
    this.props.history.push(url)
    this.setState({menuDropDown: false})
  }

  renderNavBar = () => {
    if (localStorage.computer === "true"){
      return (
        <Menu>
          <Menu.Item className='project-name'>CharacterFinder</Menu.Item>
          <Menu.Item onClick={() => this.props.history.push('/classes')}>Classes</Menu.Item>
          <Menu.Item onClick={() => this.props.history.push('/ancestries')}>Ancestries</Menu.Item>
          <Menu.Item onClick={() => this.props.history.push('/spells')}>Spells</Menu.Item>
          {this.props.currentUser ? <Menu.Item onClick={() => this.props.history.push('/')}>{this.props.currentUser.username}</Menu.Item>: <Menu.Item onClick={() => this.props.history.push('/login')}>Login</Menu.Item>}
          {this.props.currentUser ? <Menu.Item onClick={this.renderLogOut}>Log Out</Menu.Item> : <Menu.Item onClick={() => this.props.history.push('/signup')}>Sign Up</Menu.Item>}
        </Menu>
      )
    } else {
      if (!this.state.menuDropDown){
        return (
          <div id='mobile-navbar'>
            <div className='project-name' onClick={() => this.setState({menuDropDown: !this.state.menuDropDown})}>CharacterFinder</div>
            <button onClick={() => this.setState({menuDropDown: !this.state.menuDropDown})}><FontAwesomeIcon icon={faBars}/></button>
          </div>
        )
      } else {
        return(
          <>
            <div id='mobile-navbar'>
              <div className='project-name'>CharacterFinder</div>
              <button onClick={() => this.setState({menuDropDown: !this.state.menuDropDown})}><FontAwesomeIcon icon={faBars}/></button>
            </div>
            <div id='drop-down-menu'>
              <Menu pointing secondary vertical>
                <Menu.Item onClick={() => this.menuClick('/classes')}>Classes</Menu.Item>
                <Menu.Item onClick={() => this.menuClick('/races')}>Races</Menu.Item>
                <Menu.Item onClick={() => this.menuClick('/skills')}>Skills</Menu.Item>
                <Menu.Item onClick={() => this.menuClick('/spells')}>Spells</Menu.Item>
                {this.state.currentUser ? <Menu.Item onClick={() => this.menuClick('/')}>{this.state.currentUser.username}</Menu.Item>: <Menu.Item onClick={() => this.menuClick('/login')}>Login</Menu.Item>}
                {this.state.currentUser ? <Menu.Item onClick={this.renderLogOut}>Log Out</Menu.Item> : <Menu.Item onClick={() => this.menuClick('/signup')}>Sign Up</Menu.Item>}
              </Menu>
            </div>
          </>
        )
      }
    }
  }

  render() {
    return (
      <>
        {this.renderNavBar()}
      </>
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
