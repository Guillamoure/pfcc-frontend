import React from 'react'

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
    if (props.activeSpell === props.knownSpell.spell.id){
      return (
        <div>
          <span>
            <button onClick={props.renderSelectedSpell}>Prepare</button>
          </span>
          <span>
            <label>
              Spell Level:
              <select name="level" value={props.spellLevel} onChange={props.renderSpellLevelEdit}>
                <option value="-"> - </option>
                {properSpellLevelRange().map(asl => <option value={asl}>{asl}</option>)}
              </select>
            </label>
          </span>
        </div>
      )
    }
  }

  const toggleClick = () => {
    if (props.activeSpell === props.knownSpell.spell.id){
      props.renderClick(0)
    } else {
      props.renderClick(props.knownSpell.spell.id)
    }
  }

  return (
    <div>
      <span onClick={toggleClick}>{props.knownSpell.spell.name}</span>
      {isThisTargeted()}
    </div>
  )
}

export default (SpellPreparationCard)
