import React from 'react'
import { connect } from 'react-redux'

const ArmorClass = props => {

  const hc = props.character_info.hardcode
  const raging = hc.rage ? -2 : 0
  const fd = hc.fd
  const charging = hc.charge ? -2 : 0
  const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major'].includes(hc.major)
  const cleave = hc.cleave ? -2 : 0
  const name = props.character.name

  const cedrick = name === "Cedrick" ? 5 : 0

  const dexMod = () => {
    let dex = props.character.dexterity
    props.character.race.race_ability_score_modifiers.forEach(mod => {
      if ('Dexterity' === mod.ability_score){
        dex += mod.bonus
      }
    })
    if (props.character.anyBonus === 'Dexterity'){
      dex +=2
    }
    if (largeMorph){
      dex--
    }
    return Math.floor((dex - 10) / 2)
  }

  // renderSize = () => {
  //   if (props.character.race.size === 'Small'){
  //     return 1
  //   } else {
  //     return 0
  //   }
  // }

  const renderSize = () => {
    switch (props.character_info.size){
      case 'Tiny':
        return 2
      case 'Small':
        return 1;
      case 'Large':
        return -1;
      default:
        return 0;
    }
  }


  const dodge = () => {
    let bonus = 0
    if (fd){
      bonus += 2
    }
    if (name === "Persephone"){
      bonus+=1
    }
    return bonus
  }

  const natural = () => {
    let bonus = 0
    if (largeMorph){
      bonus +=4
    }
    return bonus
  }

  const acCalc = (type) => {
    switch(type){
      case 'ac':
        return (10 + dexMod() + renderSize() + dodge() + natural() + raging + charging + cleave + cedrick)
      case 't':
        return (10 + dexMod() + renderSize() + dodge() + raging + charging + cleave + cedrick)
      case 'ff':
        return (10 + renderSize() + natural() + raging + charging + cleave + cedrick)
      default:
        return 10
    }
  }

  const colorStyle = (type) => {
    let dex = Math.floor((props.character_info.ability_scores.dexterity-10)/2)
    let size = 0
    if (name === 'Cedrick'){
      size = 1
    } else if (name === 'Nettie'){
      size = 2
    }
    let armor = 0
    let bonus = 0
    if (name === 'Cedrick'){
      bonus = 5
    }
    let defaultAC = 10 + dex + size + armor + bonus
    defaultAC += name === "Persephone" ? 1 : 0 // dodge feat
    if (type === 't'){
      defaultAC = 10 + dex + size + bonus
      defaultAC += name === "Persephone" ? 1 : 0 // dodge feat
    } else if (type === 'ff'){
      defaultAC = 10 + size + armor + bonus
    }
    if (defaultAC > acCalc(type)){
      return {color: 'maroon'}
    } else if (defaultAC < acCalc(type)){
      return {color: 'green'}
    } else {
      return {color: 'black'}
    }
  }


  return(
    <div id='ac' className='shadow shrink'>
      <span className='centered container-3'>
        <section>
          <div className='enhanced' style={colorStyle('ac')}>{acCalc('ac')}</div>
          <div><strong>AC</strong></div>
        </section>
        <section>
          <div className='enhanced' style={colorStyle('t')}>{acCalc('t')}</div>
          <div className='dull'><strong>T</strong></div>
        </section>
        <section>
          <div className='enhanced' style={colorStyle('ff')}>{acCalc('ff')}</div>
          <div className='dull'><strong>FF</strong></div>
        </section>
      </span>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(ArmorClass)
