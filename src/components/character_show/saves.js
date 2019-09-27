import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

const Saves = props => {

  const renderSave = (num, save) => {
    if (save === 0.5){
      return _.floor(num * save) + 2
    } else if (save === 0.34){
      return _.floor(num * save)
    }
  }

  const renderCharacterSave = (save, score) => {
    let totalSavingThrow = 0
    // iterating over the character_info.classes in redux
    // this is written as a key value pair
    // first value is the class' id
    // second value is the character's level for that class
    for (var klassId in props.character_info.classes){
      // find the class' info from the id
      let currentClass = findCurrentClass(klassId)
      // send the character's level in that class, and the relevant saving throw value
      totalSavingThrow += renderSave(props.character_info.classes[klassId], currentClass[save])
    }
    // grab the character's ability score, and render its bonus
    const mod = Math.floor((props.character_info.ability_scores[score] - 10) / 2)
    totalSavingThrow += mod
    return totalSavingThrow < 0 ? totalSavingThrow : `+${totalSavingThrow}`
  }

  const findCurrentClass = (klassId) => {
    return props.character.klasses.find(ck => ck.id === parseInt(klassId))
  }


    return(
      <div id='saves' className='container-3 shadow'>
        <div id='saving-throw-title'>Saving Throws</div>
        <span className='centered' >
          <div className='enhanced'>{renderCharacterSave('fortitude', 'constitution')}</div>
          <div className='muted'><strong>Fortitude</strong></div>
        </span>
        <span className='centered' >
          <div className='enhanced'>{renderCharacterSave('reflex', 'dexterity')}</div>
          <div className='muted'><strong>Reflex</strong></div>
        </span>
        <span className='centered' >
          <div className='enhanced'>{renderCharacterSave('will', 'wisdom')}</div>
          <div className='muted'><strong>Will</strong></div>
        </span>
      </div>
    )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character_info: state.character_info
  }
}


export default connect(mapStateToProps)(Saves)
