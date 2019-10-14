import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

const SpellSummary = props => {

  const { spell: klassSpell } = props
  const level = props.character_info.classes.find(klass => klass.id === klassSpell.klass.id).level


  const renderDC = (sp_lvl, klass_id) => {
    const spellcasting = props.character.klass_features.find(kf => kf.spellcasting && kf.klass_id === klass_id)
    const score = spellcasting.spellcasting.ability_score
    const mod = Math.floor((props.character_info.ability_scores[_.lowerCase(score)] - 10) / 2)
    return (10 + sp_lvl + mod)
  }

  const renderRange = (level, spell_range, target) => {
    let newLevel = level
    if (level%2 === 1){
      newLevel -= 1
    }
    const distance = (spell_range.feet + (newLevel * spell_range.increase_per_level))
    return distance !== 0 ? distance + " ft" : target
  }

  const renderTime = (sp_lvl, spell) => {
    if (spell.duration === "instantaneous"){
      return "inst"
    } else {
      const startingDuration = spell.time
      const additionalTime = (spell.increase_per_level * sp_lvl) - 1
      let totalTime = startingDuration + additionalTime
      return totalTime + " " + spell.unit_of_time + (totalTime > 1 ? "s" : null)
    }
  }

  return (
      <tr>
        <td><button onClick={() => props.renderEdit({id: 1}, "cast_spell")}>Cast</button></td>
        <td>{klassSpell.spell.name}</td>
        <td>{renderRange(level, klassSpell.spell_range, klassSpell.spell.target)}</td>
        <td>{renderTime(level, klassSpell.spell)}</td>
        <td>{renderDC(klassSpell.spell_level, klassSpell.klass.id)}</td>
        <td>{klassSpell.spell.spell_resistance ? "Y" : "N"}</td>
      </tr>
    )

}

const mapStateToProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStateToProps)(SpellSummary)
