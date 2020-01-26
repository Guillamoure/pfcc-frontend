import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../../localhost'

const HP = props =>{

  const conMod = () => {
    let con = props.character_info.ability_scores.constitution
    const age = props.character.name === 'Maddox' && props.character_info.hardcode.age

    con += age === 'Young' ? -2 : 0
    con += age === 'Middle' ? -1 : 0
    con += age === 'Old' ? -2 : 0
    con += age === 'Venerable' ? -3 : 0

    return Math.floor((con  - 10) / 2)
  }

  const renderDamaged = () => {
    // oh GOD please refactor

    let id = "none"
    if (props.character.lethal_damage && props.character.temp_hp){
      id = "temp-damage"
    } else if (props.character.lethal_damage){
      id = "damaged"
    } else if (props.character.temp_hp){
      id = "temporary"
    }
    return id
  }

  const renderCharacterHP = () => {
    let totalHP = 0
    props.character.character_klasses.forEach(klass => {
      if (klass.hp !== null) {
        totalHP += klass.hp
      }
      totalHP += conMod()
    })

    let currentHP = totalHP - props.character.lethal_damage + props.character.temp_hp

    if (props.character.max_hp !== totalHP){
      fetch (`${localhost}/api/v1/character_max_hp/${props.character.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({max_hp: totalHP})
      })
        .then(r => r.json())
        .then(console.log)
    }

    return (
      <span className='centered'>
        <div className='dull'><strong>Hit Points</strong></div>
        <div className='middle'>
          <span id={renderDamaged()} className='enhanced'>{currentHP}</span>
          <span className='enhanced'>/{totalHP}</span>
          <span><button className='spacing' style={{boxShadow: "1px 1px 2px #000", borderRadius: ".5em"}} onClick={() => props.editModal("hitPoints")}>Adjust</button></span>
        </div>
        {!!props.character.non_lethal_damage && <div><small>Non-Lethal: {props.character.non_lethal_damage}</small></div>}
      </span>
    )
  }

  return (
    <div className='hp shadow shrink'>
    {renderCharacterHP()}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStateToProps)(HP)
