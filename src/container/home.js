import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Characters from '../components/characters'


class Home extends React.Component {

  state = {
    showCharacters: false,
    characters: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/characters', {
      headers: {
        User: this.props.currentUser.id
      }
    })
    .then(r => r.json())
    .then(data => this.setState({characters: data}))
  }

  renderSignUp = () => {
    if (!this.props.currentUser){
      this.props.history.push("/signup")
    }
  }

  render() {
    console.log(this.state.characters)
    return (
      <span className='background'>
        {this.renderSignUp()}
        {`Welcome ${this.props.currentUser.username}`}
        <br/>
        <br/>
        <button onClick={() => this.props.history.push("/creation")}>Create Character</button>
        <br/>
        <br/>
        <button onClick={() => this.setState({showCharacters: !this.state.showCharacters})}>{this.state.showCharacters ? "Hide your Characters": "View Your Characters"}</button>
        {this.state.showCharacters ? <span><Characters characters={this.state.characters}/></span> : null}
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
