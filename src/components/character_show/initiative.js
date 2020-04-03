import React from 'react'
import { connect } from 'react-redux'

const Initiative = props => {

  const dexMod = (style) => {
    const hc = props.character_info.hardcode
    const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major', 'Chameleon - Major'].includes(hc.major)
    const name = props.character.name
    const enlarger = hc.enlarge
    const reducer = hc.reduce
    const age = name === 'Maddox' && hc.age
    const activeMutagen = hc.activeMutagen ? hc.mutagen : false

    let mod = Math.floor((props.character_info.ability_scores.dexterity - 10) / 2)
    if (name === "Cedrick"){
      mod += 1
    }
    if (name === 'Maddox'){
      // improved initiative
      mod += 4
    }
    if (name === 'Grackle'){
      // improved initiative
      mod += 4
    }
    if (name === 'Robby' && hc.points > 0){
      // Swashbuckler initiative
      mod += 2
    }

    mod += age === 'Young' ? 2 : 0
    mod += age === 'Middle' ? -1 : 0
    mod += age === 'Old' ? -2 : 0
    mod += age === 'Venerable' ? -3 : 0

    mod += modifiers()


    const ogMod = mod
    if (largeMorph){
      mod -= 1
    }
    mod += enlarger ? -1 : 0
    mod += reducer ? 1 : 0

    mod += activeMutagen === 'dexterity' ? 2 : 0

    if (!style){
      return mod < 0 ? mod : `+${mod}`
    } else {
      if (ogMod > mod){
        return {color: 'maroon'}
      } else if (ogMod < mod){
        return {color: 'green'}
      } else {
        return {color: 'black'}
      }
    }
  }

  const modifiers = () => {
    let modifiers = props.character_info.bonuses.reduce((agg, b) => {
      if (b.statistic === 'Initiative'){
        agg += b.bonus
      }
      return agg
    }, 0)
    return modifiers
  }



  return (
    <div id='init' className='shadow shrink'>
      <span className='centered'>
        <div className='dull'><strong>Init</strong></div>
        <div className='enhanced' style={dexMod(true)}>{dexMod()}</div>
      </span>
    </div>
  )
}
const mapStatetoProps = (state) => {
  return {
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Initiative)
