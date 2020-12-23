import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { renderSave, bonusPenaltySave } from '../../helper_functions/calculations/saving_throws'

const Saves = props => {

  // const renderSave = (num, save) => {
  //   if (save === 0.5){
  //     return _.floor(num * save) + 2
  //   } else if (save === 0.34){
  //     return _.floor(num * save)
  //   }
  // }
	//
  // const renderCharacterSave = (save, score, style) => {
  //   if (!props.character.uniq_klasses.length){
  //     return null
  //   } else {
  //     let totalSavingThrow = 0
	//
  //     props.character_info.classes.forEach(klass => {
  //       let currentClass = findCurrentClass(klass.id)
  //       totalSavingThrow += renderSave(klass.level, currentClass[save])
  //     })
  //     const hc = props.character_info.hardcode
  //     const age = props.character.name === 'Maddox' && hc.age
	//
  //     let abilityScore = props.character_info.ability_scores[score]
  //     if (score === 'dexterity'){
  //       abilityScore += age === 'Young' ? 2 : 0
  //       abilityScore += age === 'Middle' ? -1 : 0
  //       abilityScore += age === 'Old' ? -2 : 0
  //       abilityScore += age === 'Venerable' ? -3 : 0
  //     } else if (score === 'constitution'){
  //       abilityScore += age === 'Young' ? -2 : 0
  //       abilityScore += age === 'Middle' ? -1 : 0
  //       abilityScore += age === 'Old' ? -2 : 0
  //       abilityScore += age === 'Venerable' ? -3 : 0
  //     } else if (score === 'wisdom'){
  //       abilityScore += age === 'Young' ? -2 : 0
  //       abilityScore += age === 'Middle' ? 1 : 0
  //       abilityScore += age === 'Old' ? 1 : 0
  //       abilityScore += age === 'Venerable' ? 1 : 0
  //     }
  //     const mod = Math.floor((abilityScore - 10) / 2)
  //     totalSavingThrow += mod
  //     if (save === 'reflex' && props.character.name === "Cedrick"){
  //       totalSavingThrow += 1
  //     }
  //     const ogST = totalSavingThrow
  //     // hardcoding
	//
  //     if (save === 'will' && hc.rage){
  //       totalSavingThrow += 2
  //     }
  //     const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major', 'Chameleon - Major'].includes(hc.major)
  //     const enlarger = hc.enlarge
  //     const reducer = hc.reduce
  //     const charmedActive = hc.charmedActive
  //     const stealTime = hc.stealTime
  //     const activeMutagen = hc.activeMutagen ? hc.mutagen : false
  //     if (save === 'reflex'){
  //       if (largeMorph){
  //         totalSavingThrow += -1
  //       }
  //       totalSavingThrow += enlarger ? -1 : 0
  //       totalSavingThrow += reducer ? 1 : 0
  //       totalSavingThrow += stealTime ? 1 : 0
	//
  //       totalSavingThrow += activeMutagen === 'dexterity' ? 2 : 0
  //     } else if (save === 'will'){
  //       totalSavingThrow += activeMutagen === 'dexterity' ? -1 : 0
  //     } else if (save === 'fortitude'){
  //       totalSavingThrow += activeMutagen === 'constitution' ? 2 : 0
  //     }
  //     totalSavingThrow += charmedActive ? 4 : 0
  //     if (!style){
  //       return totalSavingThrow < 0 ? totalSavingThrow : `+${totalSavingThrow}`
  //     } else {
  //       if (ogST > totalSavingThrow){
  //         return {color: 'maroon'}
  //       } else if (ogST < totalSavingThrow){
  //         return {color: 'green'}
  //       } else {
  //         return {color: 'black'}
  //       }
  //     }
  //   }
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
  // }

  const findCurrentClass = (klassId) => {
    return props.character.uniq_klasses.find(ck => ck.id === klassId)
  }

  // let ast = props.character.name === 'Robby' ? '*' : null
  // ast = props.character_info.hardcode.quick ? '*' : ast
	// ast means asterix
  const ast = (type) => {
    let ast = false

    let validBonuses = props.character_info.bonuses.filter(b => b.statistic === type)
    ast = !!validBonuses.length ? true : ast

    if (type === 'Save'){
      if (props.character.name === 'Robby' || props.character.name === "Natesse"){
        ast = true
      }
    } else if (type === 'Reflex'){
      if (props.character_info.hardcode.quick){
        ast = true
      }
    }
    if (ast){
      return '*'
    }
  }

  const renderTooltip = (e, type) => {
    let comment = ''

    let validBonuses = props.character_info.bonuses.filter(b => b.statistic === type)
    validBonuses.forEach(b => {
      if (b.conditions.length){
        comment = `${b.bonus < 0 ? b.bonus : `+${b.bonus}`} ${b.bonus_type} for ${b.conditions.map(c => c.condition).join(', ')}`
      }
    })

    if (props.character.name === 'Robby'){
      if (type === 'all'){
        comment = '+1 to fear and mind-affecting effects'
      } else if (type === 'Reflex'){
        comment = 'If you succeed on a saving throw to take half damage, take no damage instead'
      }
    } else if (props.character_info.hardcode.quick && type === 'Reflex'){
      comment = 'Advantage on Reflex saving throws'
    } else if (props.character.name === "Natesse"){
			if (type === "all"){
				comment = "Constructed: +4 to mind-affecting effects, paralysis, poison, and stun"
			}
		}
    if (!!comment){
      props.renderTooltip(e, comment)
    }
  }

  const modifiers = () => {
    let modifiers = props.character_info.bonuses.reduce((agg, b) => {
      if (b.statistic === 'Save'){
        if (!b.conditions.length){
          agg += b.bonus
        }
      }
      return agg
    }, 0)
    return modifiers
  }

	const displayIndividualSave = (isAComputer) => {
		// NEW DATA
		let saveDetails = [
			{save: "fortitude", ability: "constitution"},
			{save: "reflex", ability: "dexterity"},
			{save: "will", ability: "wisdom"}
		]
		// STORED DATA
		// CALCULATED DATA

		return saveDetails.map((saveDetail, i) => {
			let capitalizedSave = _.capitalize(saveDetail.save)
			let color = bonusPenaltySave(saveDetail.save, saveDetail.ability)
			return (
	      <span key={i*3+1} className='centered' >
	        <div className='enhanced' style={{color}}>{renderSave(saveDetail.save, saveDetail.ability)}</div>
	        <div className='muted'><strong>{capitalizedSave}</strong></div>
	      </span>
			)
		})
	}

	const displaySaves = () => {
		// NEW DATA
		let className = "shadow"
		let savingThrowTitle = <div id="saving-throw-title">Saving Throws</div>

		// STORED DATA
		// CALCULATED DATA
		let isAComputer = localStorage.computer === "true"

		if (isAComputer) {
			className += " container-3 shrink"
		} else {
			className += " mobile-centering"
		}

		return (
			<div id="saves" className={className}>
			{isAComputer && savingThrowTitle}
			{displayIndividualSave(isAComputer)}
			</div>
		)
	}

  // if (localStorage.computer === "true"){
  //   return (
  //     <div id='saves' className='container-3 shadow shrink' >
  //       <div id='saving-throw-title' onMouseOver={e => renderTooltip(e, 'Save')} onMouseOut={props.mouseOut}>Saving Throws{ast('Save')}</div>
  //       <span className='centered' >
  //         <div className='enhanced' style={renderCharacterSave('fortitude', 'constitution', true)}>{renderCharacterSave('fortitude', 'constitution')}</div>
  //         <div className='muted'><strong>Fortitude</strong></div>
  //       </span>
  //       <span className='centered' onMouseOver={e => renderTooltip(e, 'Reflex')} onMouseOut={props.mouseOut}>
  //         <div className='enhanced' style={renderCharacterSave('reflex', 'dexterity', true)}>{renderCharacterSave('reflex', 'dexterity')}{ast('Reflex')}</div>
  //         <div className='muted'><strong>Reflex</strong></div>
  //       </span>
  //       <span className='centered' >
  //         <div className='enhanced' style={renderCharacterSave('will', 'wisdom', true)}>{renderCharacterSave('will', 'wisdom')}</div>
  //         <div className='muted'><strong>Will</strong></div>
  //       </span>
  //     </div>
  //   )
  // } else if (localStorage.computer === "false"){
  //   return (
  //     <div id='saves' className='shadow mobile-centering'>
  //       {/* when implementing tooltips, also include renderTooltip (e, 'Save'), because I removed the Saving Throw title */}
  //       {/* the title has that feature */}
  //       <span className='centered' style={{display: 'inline-block', margin: '0.3em'}}>
  //         <div className='enhanced' style={renderCharacterSave('fortitude', 'constitution', true)}>{renderCharacterSave('fortitude', 'constitution')}</div>
  //         <div className='muted'><strong>Fort</strong></div>
  //       </span>
  //       <span className='centered' style={{display: 'inline-block', margin: '0.3em'}} onMouseOver={e => renderTooltip(e, 'Reflex')} onMouseOut={props.mouseOut}>
  //         <div className='enhanced' style={renderCharacterSave('reflex', 'dexterity', true)}>{renderCharacterSave('reflex', 'dexterity')}{ast('Reflex')}</div>
  //         <div className='muted'><strong>Refl</strong></div>
  //       </span>
  //       <span className='centered' style={{display: 'inline-block', margin: '0.3em'}}>
  //         <div className='enhanced' style={renderCharacterSave('will', 'wisdom', true)}>{renderCharacterSave('will', 'wisdom')}</div>
  //         <div className='muted'><strong>Will</strong></div>
  //       </span>
  //     </div>
  //   )
  // }

	return (
		<>
			{displaySaves()}
		</>
	)


}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}


export default connect(mapStateToProps)(Saves)
