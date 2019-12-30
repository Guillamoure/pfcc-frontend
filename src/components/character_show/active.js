import React from 'react'
import { connect } from 'react-redux'

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
