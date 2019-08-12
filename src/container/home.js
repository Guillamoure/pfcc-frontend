import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Characters from '../components/characters'
import Settings from './settings'


class Home extends React.Component {

  state = {
    showCharacters: false,
    characters: []
  }

  componentDidMount() {
    if (this.props.currentUser){

        fetch('http://localhost:3000/api/v1/characters', {
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
    return (
      <span className='background'>
        {this.renderSignUp()}
        <button className='btn' onClick={() => this.props.history.push("/creation")} >Create Character</button>
        <br/><br/>
        <div className='container-4' style={{margin: '0 2em'}} >
          <Settings />
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
