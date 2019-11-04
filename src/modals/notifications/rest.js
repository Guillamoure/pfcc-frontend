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
      // do you have any spells to prepare at the beginning of the day?

      debugger
      // should return either updated character // RETURNS NEW CHARACTER

      // dispatch new character, clear cast cast spells

      // or adjusted hps (lethal, non lethal, temp) due to resting

      // then do a delete with all cast spells
    })
  }

  anyPreparedSpells = () => {
    // Go through each class
    //  check to see if it has to prepare any spells
    // AT ITS CURRENT LEVEL i.e. Paladin, Ranger etc.

    // spontaneousOrPrepared = (klassId) => {
    //   const klass = this.props.classes.find(cl => cl.id === klassId)
    //   let spellcasting = klass.klass_features.find(kf => kf.spellcasting).spellcasting
    //   return spellcasting.prepared
    // }
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
