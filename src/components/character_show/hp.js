import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import HPChanges from '../hp_changes'
import { abilityScoreMod } from '../../helper_functions/calculations/ability_scores'


const HP = props => {

  const [mobileHPChange, setMobileHPChange] = React.useState(false);

  // const conMod = () => {
  //   let con = props.character_info.ability_scores.constitution
  //   const age = props.character.name === 'Maddox' && props.character_info.hardcode.age
  //   const activeMutagen = props.character_info.hardcode.activeMutagen ? props.character_info.hardcode.mutagen : false
	//
  //   con += age === 'Young' ? -2 : 0
  //   con += age === 'Middle' ? -1 : 0
  //   con += age === 'Old' ? -2 : 0
  //   con += age === 'Venerable' ? -3 : 0
	//
  //   con += activeMutagen === 'constitution' ? 4 : 0
	//
  //   return Math.floor((con  - 10) / 2)
  // }


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

	const renderClick = () => {
		props.dispatch({type: "MODAL", detail: "hitPoints"})
	}

  const renderCharacterHP = () => {
		// NEW DATA
		let totalHP = 0
		let additionalTempHP = 0

		// STORED DATA
		let storedLethalDamage = props.character.lethal_damage
		let storedTemporary = props.character.temp_hp
 		let hitPointBonuses =  props.character_info.temporaryHitPoints

		// CALCULATED DATA
		const conMod = abilityScoreMod("constitution")

    props.character.character_klasses.forEach(klass => {
      if (klass.hp !== null) {
        totalHP += klass.hp
      }
      totalHP += conMod
    })
		hitPointBonuses.forEach(bonus => {
			additionalTempHP += bonus.bonus - bonus.damage
		// 	if (bonus.bonus_multiplier){
		// 		let multiplier = 0
		// 		if (bonus.bonus_multiplier === "level"){
		// 			if (bonus.bonus_multiplier_based_on_feature_level){
		// 				let ability = props.character[bonus.source.source].find(a => a.id === bonus.source.sourceId)
		// 				if (ability.klass_id){
		// 					multiplier = props.character_info.classes.find(cl => cl.id === ability.klass_id).level
		// 				}
		// 			}
		// 		}
		// 		if (bonus.bonus_type === "temporary"){
		// 			additionalTempHP += multiplier * bonus.bonus
		// 		}
		// 	}
		})
		if (props.character.name === "Fire-Roasted Tomatoes"){
			totalHP += 6
		}

		let currentHP = totalHP - storedLethalDamage + storedTemporary + additionalTempHP
		console.log(currentHP)

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

    if (localStorage.computer === "true"){
      return (
        <span className='centered'>
          <div className='dull'><strong>Hit Points</strong></div>
          <div className='middle'>
            <span id={renderDamaged()} className='enhanced'>{currentHP}</span>
            <span className='enhanced'>/{totalHP}</span>
            <span><button className='spacing' style={{boxShadow: "1px 1px 2px #000", borderRadius: ".5em"}} onClick={renderClick}>Adjust</button></span>
          </div>
          {!!props.character.non_lethal_damage && <div><small>Non-Lethal: {props.character.non_lethal_damage}</small></div>}
        </span>
      )
    } else {
      // currentHP is equal to the total amount hp you have, minus lethal damage, plus temp hp
      // however, for this health bar calculation, we want temp hp to be separate
      let noTempCurrentHP = currentHP - props.character.temp_hp

      let percentageHP = (noTempCurrentHP/totalHP) * 100
      let tempPercentage = (props.character.temp_hp/totalHP) * 100

      let color = 'green'
      // v if you have more than full hp through temp hp, change color to electric blue
      color = percentageHP+tempPercentage > 100 ? '#0892D0' : color
      percentageHP = percentageHP+tempPercentage > 100 ? 100 : percentageHP
      // ^ and make it equal to 100 so it doesn't overflow the width
      // v if HP is less than half, make it yellow
      color = percentageHP <= 50 && percentageHP > 25 ? 'yellow' : color
      // v if HP is less than 25%, make it red
      color = percentageHP <= 25 ? 'red' : color

      // objective:
      // if character has damage, and they also have temp hp
      // part of their hp bar is green/yellow/red, and part is electric blue
      //
      return (
        <section onClick={() => setMobileHPChange(true)}>
          <span>
            <div className='health-box'>
              <span className='green-health-bar' style={{background: `linear-gradient(to right, ${color} ${percentageHP}%, #0892D0 ${percentageHP}%, #0892D0 ${percentageHP+tempPercentage}%, white ${percentageHP+tempPercentage}%)`}}/>
            </div>
          </span>
          <span style={{textAlign: 'center', display: 'inline-block', width: '18%'}}>
            {currentHP}/{totalHP}
          </span>
        </section>
      )
    }
  }

  const closeHPChanges = () => {
    setMobileHPChange(false)
  }

  return (
    <div className='hp shadow' style={{boxShadow: `5px 4px 2px #${props.settings.shadeColor}`, opacity: "0.95", backgroundColor: `#${props.settings.bubbleColor}`, borderColor: `#${props.settings.borderColor}`}}>
      {renderCharacterHP()}
      {mobileHPChange && <HPChanges renderEdit={props.renderEdit} closeHPChanges={closeHPChanges}/>}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info,
		settings: state.settings
  }
}

export default connect(mapStateToProps)(HP)
