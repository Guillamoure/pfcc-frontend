import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const SpellPreparationCard = props => {

  const properSpellLevelRange = () => {
    return props.availableSpellLevels.filter(asl => {
      if (asl < props.knownSpell.klass_spell.spell_level) {
        return false
      } else {
        return true
      }
    })
  }

  const isThisTargeted = () => {
    return (
      <div>
          <label>
            Spell Level:
            <select name="level" value={props.spellLevel} onChange={props.renderSpellLevelEdit}>
              <option value="-"> - </option>
              {properSpellLevelRange().map(asl => <option value={asl}>{asl}</option>)}
            </select>
          </label>
      </div>
    )
  }

  const toggleClick = () => {
    if (props.activeSpell === props.knownSpell.spell.id){
      props.renderClick(0)
    } else {
      props.renderClick(props.knownSpell.spell.id)
    }
  }

  const chosen = () => {
    let prepared = false
    props.preparedSpells.forEach(psp => {
      if (props.knownSpell.spell.id === psp.spell.id){
        prepared = true
      }
    })
    props.goingToBePreparedSpells.forEach(gtbps => {
      if (props.knownSpell.spell.id === gtbps.spell_id){
        prepared = true
      }
    })

    return prepared ? <FontAwesomeIcon icon={faCheck} size='1x'/> : ''
  }


  return (
    <tr>
      <td className='bordered-table'>{props.knownSpell.klass_spell.spell_level}</td>
      <td className='bordered-table'>{chosen()}</td>
      <td className='bordered-table' onClick={toggleClick}>{props.knownSpell.spell.name}</td>
      <td className='bordered-table'>{props.activeSpell === props.knownSpell.spell.id && isThisTargeted()}</td>
      {(props.spellLevel >= 0 && props.spellLevel <= 9) && props.activeSpell === props.knownSpell.spell.id && <td><button onClick={props.renderSelectedSpell}>Prepare</button></td>}
    </tr>
  )
}

export default (SpellPreparationCard)
