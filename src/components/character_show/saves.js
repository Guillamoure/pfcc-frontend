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

  const renderCharacterSave = (save, score, style) => {
    if (!props.classes.length){
      return null
    } else {
      let totalSavingThrow = 0

      props.character_info.classes.forEach(klass => {
        let currentClass = findCurrentClass(klass.id)
        totalSavingThrow += renderSave(klass.level, currentClass[save])
      })
      const mod = Math.floor((props.character_info.ability_scores[score] - 10) / 2)
      totalSavingThrow += mod
      if (save === 'reflex' && props.character.name === "Cedrick"){
        totalSavingThrow += 1
      }
      const ogST = totalSavingThrow
      // hardcoding
      const hc = props.character_info.hardcode
      if (save === 'will' && hc.rage){
        totalSavingThrow += 2
      }
      const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major'].includes(hc.major)
      if (save === 'reflex'){
        if (largeMorph){
          totalSavingThrow -= 1
        }
      }
      if (!style){
        return totalSavingThrow < 0 ? totalSavingThrow : `+${totalSavingThrow}`
      } else {
        if (ogST > totalSavingThrow){
          return {color: 'maroon'}
        } else if (ogST < totalSavingThrow){
          return {color: 'green'}
        } else {
          return {color: 'black'}
        }
      }
    }
    // iterating over the character_info.classes in redux
    // this is written as a key value pair
    // first value is the class' id
    // second value is the character's level for that class


    // for (var klassId in props.character_info.classes){
    //   // find the class' info from the id
    //   let currentClass = findCurrentClass(klass.id)
    //   // send the character's level in that class, and the relevant saving throw value
    //   totalSavingThrow += renderSave(props.character_info.classes[klassId], currentClass[save])
    // }

    // grab the character's ability score, and render its bonus
  }

  const findCurrentClass = (klassId) => {
    return props.classes.find(ck => ck.id === klassId)
  }


    return(
      <div id='saves' className='container-3 shadow shrink'>
        <div id='saving-throw-title'>Saving Throws</div>
        <span className='centered' >
          <div className='enhanced' style={renderCharacterSave('fortitude', 'constitution', true)}>{renderCharacterSave('fortitude', 'constitution')}</div>
          <div className='muted'><strong>Fortitude</strong></div>
        </span>
        <span className='centered' >
          <div className='enhanced' style={renderCharacterSave('reflex', 'dexterity', true)}>{renderCharacterSave('reflex', 'dexterity')}</div>
          <div className='muted'><strong>Reflex</strong></div>
        </span>
        <span className='centered' >
          <div className='enhanced' style={renderCharacterSave('will', 'wisdom', true)}>{renderCharacterSave('will', 'wisdom')}</div>
          <div className='muted'><strong>Will</strong></div>
        </span>
      </div>
    )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character_info: state.character_info,
    classes: state.classes
  }
}


export default connect(mapStateToProps)(Saves)
