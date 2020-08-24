import React from 'react'
import { connect } from 'react-redux'
import { abilityScoreMod } from '../../helper_functions/calculations/ability_scores'
import { pluser } from '../../fuf'

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

	const calculateInitiative = () => {
		let dex = abilityScoreMod("dexterity")
		let bonuses = 0
		return pluser(dex + bonuses)
	}


  if (localStorage.computer === "true"){
    return (
      <div id='init' className='shadow shrink'>
        <span className='centered'>
          <div className='dull'><strong>Init</strong></div>
          <div className='enhanced' style={dexMod(true)}>{calculateInitiative()}</div>
        </span>
      </div>
    )
  } else if (localStorage.computer === "false"){
    return (
      <div id='init' className='shadow' style={{padding: '2%'}}>
        <span className='centered'>
          <div className='enhanced' style={dexMod(true)}>{calculateInitiative()}</div>
          <div className='dull'><strong>Init</strong></div>
        </span>
      </div>
    )
  }

}
const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Initiative)
