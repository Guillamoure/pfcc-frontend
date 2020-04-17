import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from '../localhost'

import Characters from '../components/characters'
import Settings from './settings'
import Campaigns from '../components/campaigns'


class Home extends React.Component {

  state = {
    showCharacters: false,
    characters: []
  }

  componentDidMount() {
    if (this.props.currentUser){

        fetch(`${localhost}/api/v1/characters`, {
          headers: {
            User: this.props.currentUser.id
          }
        })
        .then(r => r.json())
        .then(data => {
          this.setState({characters: data})
      })
      }
  }

  renderSignUp = () => {
    if (!this.props.currentUser){
      this.props.history.push("/signup")
    }
  }

  render() {
    this.renderSignUp()
    let className = localStorage.computer === 'true' ? 'container-4' : 'phone-container'
    return (
      <span className='background'>
        <button className='home-btn-create-links' onClick={() => this.props.history.push("/creation")} >Create Character</button>
        <button className='home-btn-create-links' onClick={() => this.props.history.push("/campaigns/new")}>Create Campaign</button>
        <br/><br/>
        <div className={className} style={{margin: '0 2em'}} >
          <Settings />
          <Campaigns />
          <Characters characters={this.state.characters}/>
        </div>
      </span>
    )
  }

}
// {this.state.showCharacters ? <Characters />}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Home))
