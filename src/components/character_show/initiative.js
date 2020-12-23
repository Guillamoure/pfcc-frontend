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

	const initiativeArray = () => {
		// NEW DATA
		let array = []
		let permanent = 0
		let temporary = 0

		let abilityMod = abilityScoreMod("dexterity")
		let permAbilityMod = abilityScoreMod("dexterity", true)

		if (permAbilityMod !== abilityMod) {
			temporary += abilityMod - permAbilityMod
			permanent += permAbilityMod
		} else {
			permanent += abilityMod
		}
		if (props.character.name === "Ildre"){
			permanent += 4
		}

		array.push(permanent)
		array.push(temporary)
		return array
	}


	const bonusPenaltyInit = () => {
		let temp = initiativeArray()[1]
		let color = "black"
		if (temp > 0){color = "green"}
		if (temp < 0){color = "maroon"}
		return color
	}

	const calculateInitiative = () => {
		let initArray = initiativeArray()
		return pluser(initArray[0] + initArray[1])
	}

	let color = bonusPenaltyInit()

  if (localStorage.computer === "true"){
    return (
      <div id='init' className='shadow shrink'>
        <span className='centered'>
          <div className='dull'><strong>Init</strong></div>
          <div className='enhanced' style={{color}}>{calculateInitiative()}</div>
        </span>
      </div>
    )
  } else if (localStorage.computer === "false"){
    return (
      <div id='init' className='shadow' style={{padding: '2%'}}>
        <span className='centered'>
          <div className='enhanced' style={{color}}>{calculateInitiative()}</div>
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
