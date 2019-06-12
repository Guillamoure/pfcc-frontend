import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class Character extends React.Component {

  state = {
    character: {}
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1${this.props.location.pathname}`)
    .then(r => r.json())
    .then(data => this.setState({character: data.character}))
  }


  render() {
    console.log(this.state.character)
    return (
      <span >
        <div>{this.state.character.name}</div>
        <div>{this.state.character.race ? this.state.character.race.name : null}</div>
      </span>
    )
  }

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Character))
