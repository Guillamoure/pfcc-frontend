import React from 'react'
import _ from 'lodash'

class Spells extends React.Component {

  state = {
    activeTrait: 0
  }

  remainingSpells = () => {
    let spells = []
    let currentCK = 0
    let currentLvl = 0
    this.props.character.character_klasses.forEach(ck => {
      if (ck.klass_id !== currentCK){
        // edit this code
        // right now, this function doesn't work if classes are not sequential/ordered by their klass id
        // need to rework so that multiple classes can be acceessed
        // i think the saves and BAB components has some functions that might help...
      }
    })
    console.log(this.props.character)
    debugger
  }

  render(){
    return(
      <div style={{padding: '1em'}}>
        {this.remainingSpells()}
      </div>
    )
  }
}

export default Spells
