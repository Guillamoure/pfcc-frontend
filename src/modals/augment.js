import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const SpellAugmentModal = props => {

  const renderClick = (spellId, augment) => {
    if (!props.character_info.hardcode.augment || props.character_info.hardcode.augment.spellId !== spellId){
      props.dispatch({type: 'AUGMENT SPELL', spellId, augment})
      props.dispatch({type: 'POINTS CHANGE', amount: 'decrease'})
      props.exitModal()
    }
  }

  const renderSpells = () => {
    return props.character.known_spells.map(ks => {
      if (ks.klass.name === 'Arcanist'){
        return (
          <div key={ks.id*3-1}>
            <span>{ks.spell.name}</span>
            <button onClick={() => renderClick(ks.spell.id, 'caster')}>+1 Caster Level</button>
            {ks.spell.saving_throw ? <button onClick={() => renderClick(ks.spell.id, 'dc')}>+1 DC</button> : null}
          </div>
        )
      } else {
        return null
      }
    })
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          {renderSpells()}
        </div>
      </div>
    </Portal>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(SpellAugmentModal)
