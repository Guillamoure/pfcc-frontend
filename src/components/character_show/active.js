import React from 'react'
import { connect } from 'react-redux'
import { featureDistribution as removeFeature } from '../../helper_functions/distributers/features'

const Active = props => {
  const hc = props.character_info.hardcode

  const performance = hc.performance
  const effects = props.activeEffects.map(ae => <li>{ae}</li>)
  const rage = hc.rage
  const power = hc.power
  const eBlood = hc.eBloodActive
  const defense = hc.fd
  const charge = hc.charge
  let combat = hc.combat
  const minor = hc.minor
  const major = hc.major
  if (combat === 'Frog - Combat'){
    combat += ` (${hc.frogCombat})`
  }
  const age = hc.age
  const augment = hc.augment ? props.character.known_spells.find(ks => ks.spell.id === hc.augment.spellId).spell.name : null
  const enlarge = hc.enlarge
  const reduce = hc.reduce
  const expeditious = hc.expeditious
  const swim = hc.swim
  const swim20 = hc.swim20
  const land10 = hc.land10
  const land20 = hc.land20
  const quick = hc.quick
  const helmsman = hc.helmsman
  const crew = hc.crew
  const stealTime = hc.stealTime
  const activeMutagen = hc.activeMutagen ? hc.mutagen : false


  const renderFeatures = () => {
    let temp = props.character_info.features.filter(f => f.duration === 'temporary')
    return temp.map(t => {
      let detail = ''
      detail = t.type === 'movement' ? `${t.movement} Speed: ${t.feet} ft` : detail

      return <li>{t.source}: {detail}</li>
    })
  }

	const renderActiveFeatures = (features) => {
		return features.map(f => {
			let foundAbility = props.character[f.source].find(ability => ability.id === f.sourceId)
			if (foundAbility){
				let foundFeature = foundAbility.features.find(feat => feat.id === f.featureId)
				let name = !foundFeature.name ? foundAbility.name : foundFeature.name

				return <li>{name} <button onClick={() => removeActiveFeature({...foundFeature, ...f})}>X</button></li>
			} else {
				return null;
			}
		})
	}

	const removeActiveFeature = (feature) => {
		removeFeature(feature)
	}

  const renderMutagen = () => {
    let positiveAbilityScore
    let negativeAbilityScore
    switch(activeMutagen){
      case "strength":
        positiveAbilityScore = 'Strength'
        negativeAbilityScore = 'Intelligence'
        break
      case "dexterity":
        positiveAbilityScore = 'Dexterity'
        negativeAbilityScore = 'Wisdom'
        break
      case "constitution":
        positiveAbilityScore = 'Constitution'
        negativeAbilityScore = 'Charisma'
        break
      default:
        break
    }
    return <li>Mutagen: +4 to {positiveAbilityScore}, -2 to {negativeAbilityScore}, +2 to AC, 70 minutes</li>
  }

  return (
    <div id='active' className='shadow shrink'>
      <ul>
        {props.character_info.conditions.map(c => <li>{c}</li>)}
        {helmsman && <li>Sasea Bitch Helmsman</li>}
        {crew && <li>Sasea Bitch Crew</li>}
        {performance && <li>Bardic Performance: {performance}</li>}
        {effects}
        {rage && <li>Raging</li>}
        {power && <li>Power Attack</li>}
        {eBlood && <li>Lesser Elemental Blood (electricity)</li>}
        {defense && <li>Fighting Defensively</li>}
        {charge && <li>Charging</li>}
        {combat && <li>{combat}</li>}
        {minor && <li>{minor}</li>}
        {major && <li>{major}</li>}
        {age && <li>Age Catergory: {age}</li>}
        {augment && <li>Augmented {augment}: {hc.augment.augment === 'dc' ? '+1 DC' : '+1 Caster Level'}</li>}
        {enlarge && <li>Affected by <em className='underline-hover' onClick={() => props.editModal('spell', null, 64)}>enlarge person</em></li>}
        {reduce && <li>Affected by <em className='underline-hover' onClick={() => props.editModal('spell', null, 65)}>reduce person</em></li>}
        {expeditious && <li>Expeditious Retreat</li>}
        {swim && <li>Swim Speed 30 ft.</li>}
        {swim20 && <li>Swim Speed 20 ft.</li>}
        {land10 && <li>Base Speed +10 ft.</li>}
        {land20 && <li>Base Speed +20 ft.</li>}
        {quick && <li>Base Speed +10 ft., +2 AC, adv. on next attack, Reflex save, Dex or Charisma check</li>}
        {stealTime && <li>+1 to AC, Reflex, +5 base speed</li>}
        {activeMutagen && renderMutagen()}
        {renderFeatures()}
				{renderActiveFeatures(props.character_info.activeFeatures)}
      </ul>
    </div>
  )
}


const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Active)
