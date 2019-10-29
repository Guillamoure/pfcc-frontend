import React from 'react'
import { connect } from 'react-redux'


class Rest extends React.Component {

  newDay = () => {
    const char = this.props.character
    fetch('http://localhost:3000/api/v1/rest', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: char.id
      })
    })
    .then(r => r.json())
    .then(data => {
      debugger
      // should return either updated character
      // or adjusted hps (lethal, non lethal, temp) due to resting

      // then do a delete with all cast spells
    })
  }

  render(){

    return(
      <span style={{padding: '1em'}}>
        <p>
          <button onClick={this.newDay}>Would You Like to Rest?</button>
        </p>
      </span>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Rest)
