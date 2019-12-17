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

  return (
    <div id='active' className='shadow shrink'>
      <ul>
        {props.character_info.conditions.map(c => <li>{c}</li>)}
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
