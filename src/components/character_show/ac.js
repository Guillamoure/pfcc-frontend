import React from 'react'
import { connect } from 'react-redux'

const ArmorClass = props => {

  const hc = props.character_info.hardcode
  const raging = hc.rage ? -2 : 0
  const fd = hc.fd
  const charging = hc.charge ? -2 : 0
  const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major'].includes(hc.major)
  const cleave = hc.cleave ? -2 : 0
  const dodgingPanache = hc.dodgingPanache ? 4 : 0
  const name = props.character.name
  const armor = hc.armor
  const enlarger = hc.enlarge
  const reducer = hc.reduce
  const quick = hc.quick ? 2 : 0
  // for enlarge person, you automatically have a -1 penalty to AC
  const enlarge = enlarger ? -1 : 0
  const reduce = reducer ? 1 : 0

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
      dex-=2
    }
    if (name === "Cedrick"){
      dex+=2
    }
    dex += enlarger ? -2 : 0
    dex += reducer ? 2 : 0
    if (armor){
      // Mex Dex Bonus from Armor
      if (armor === 'Wooden' && dex > 17){
        dex = 17
      }
      if (armor === '+1 chain shirt' && dex > 19){
        dex = 19
      }
      if (armor === 'Padded' && dex > 27){
        dex = 27
      }
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
    if (name === "Robby"){
      bonus+=1
    }
    return bonus
  }

  const natural = () => {
    let bonus = 0
    if (largeMorph){
      bonus +=4
    }
    if (name === "Persephone"){
      bonus+=1
    }
    return bonus
  }

  const armorBonus = () => {
    let bonus = 0
    if (armor){
      if (armor === "Wooden"){
        bonus += 3
      }
      if (armor === "+1 chain shirt"){
        bonus += 5
      }
      if (armor === 'Padded'){
        bonus += 1
      }
    }
    return bonus
  }

  const acCalc = (type) => {
    switch(type){
      case 'ac':
        return (10 + dexMod() + renderSize() + armorBonus() + dodge() + natural() + raging + charging + cleave + cedrick + enlarge + reduce + dodgingPanache + quick)
      case 't':
        return (10 + dexMod() + renderSize() + dodge() + raging + charging + cleave + cedrick + enlarge + reduce + dodgingPanache + quick)
      case 'ff':
        return (10 + renderSize() + armorBonus() + natural() + raging + charging + cleave + cedrick + enlarge + reduce + dodgingPanache + quick)
      default:
        return 10
    }
  }

  const colorStyle = (type) => {
    let dex = Math.floor((props.character_info.ability_scores.dexterity-10)/2)
    let size = 0
    if (name === 'Cedrick'){
      size = 1
      dex += 1
    } else if (name === 'Nettie'){
      size = 2
    }
    let natural = 0
    let bonus = 0
    if (name === 'Cedrick'){
      bonus = 5
    }
    let armorBonus = 0
    if (armor){
      armorBonus += armor === 'Wooden' ? 3 : 0
      dex = armor === 'Wooden' && dex > 3 ? 3 : dex
      armorBonus += armor === '+1 chain shirt' ? 5 : 0
      dex = armor === '+1 chain shirt' && dex > 4 ? 4 : dex
      armorBonus += armor === 'Padded' ? 1 : 0
      dex = armor === 'Padded' && dex > 8 ? 8 : dex
    }
    let defaultAC = 10 + dex + size + armorBonus + natural + bonus
    defaultAC += name === "Robby" ? 1 : 0 // nimble feature
    defaultAC += name === "Persephone" ? 1 : 0 // dodge feat
    defaultAC += name === "Persephone" ? 1 : 0 // natural armor
    if (type === 't'){
      defaultAC = 10 + dex + size + bonus
      defaultAC += name === "Robby" ? 1 : 0 // nimble feature
      defaultAC += name === "Persephone" ? 1 : 0 // dodge feat
    } else if (type === 'ff'){
      defaultAC = 10 + size + armorBonus + natural + bonus
      defaultAC += name === "Persephone" ? 1 : 0 // natural armor
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
