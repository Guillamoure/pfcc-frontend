import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

const SpellSummary = props => {

  let { spell: klassSpell, spellsPerDay } = props
  // if (!klassSpell.action){
  //   klassSpell = klassSpell.spell
  // }
  const level = props.character_info.classes.find(klass => klass.id === klassSpell.klass.id).level


  const renderDC = (sp_lvl, klass_id) => {
    let bonus = 0
    let klasses = [...props.character.uniq_klasses]
    let justFeatures = klasses.map(kl => kl.klass_features)
    let features = _.flatten(justFeatures)
    const spellcasting = features.find(kf => kf.spellcasting && kf.klass_id === klass_id)
    const score = spellcasting.spellcasting.ability_score
    const mod = Math.floor((props.character_info.ability_scores[_.lowerCase(score)] - 10) / 2)
    if (props.character.name === "Persephone"){
      bonus = klassSpell.subschools.find(ss => ss.name === "Acid") ? bonus+=1 : bonus
    }
    if (klassSpell.spell.saving_throw === "none"){
      return "-"
    } else {
      return (10 + sp_lvl + mod + bonus)
    }
  }

  const renderRange = (level, spell_range, target, spellName) => {
    let newLevel = level
    if (props.character.name === "Persephone"){
      if (spellName === "Charm Person" || spellName === "Charm Monster"){
        newLevel+= 1
      }
    }
    if (newLevel%2 === 1){
      newLevel -= 1
    }
    let distance = (spell_range.feet + (newLevel * spell_range.increase_per_level))

    return distance !== 0 ? distance + " ft" : target
  }

  const renderTime = (sp_lvl, spell) => {
    if (spell.duration === "instantaneous"){
      return "Inst"
    } else {
      const startingDuration = spell.time
      let additionalTime = (spell.increase_per_level * sp_lvl) - spell.increase_per_level
      if (props.character.name === "Persephone"){
        if (spell.name === "Charm Person" || spell.name === "Charm Monster"){
          additionalTime+=spell.increase_per_level
        }
      }
      let totalTime = startingDuration + additionalTime
      return totalTime + " " + spell.unit_of_time + (totalTime > 1 ? "s" : null)
    }
  }

  const areThereRemainingSpells = () => {
    const spellLevel = klassSpell.spell_level
    const charKlass = props.character_info.classes.find(cl => cl.id === klassSpell.klass.id)
    const castSpells = charKlass.castSpells
    const charKlassLevel = charKlass.level
    const targetKlass = props.classes.find(cl => cl.id === klassSpell.klass.id)
    let copyKlass = {...targetKlass}
    let availableSpells = copyKlass.spells_per_days.find(spd => spd.spell_level === spellLevel && spd.klass_level === charKlassLevel)
    // console.log('available spells to cast', availableSpells)
    if (availableSpells === undefined && spellLevel === 0){
      availableSpells = {spells: 100}
    }
    let spellcasting = copyKlass.klass_features.find(kf => kf.name === 'Spells').spellcasting

    // can't get bonus spells per day for cantrips
    // only if spellcasting ability bonus is greater than or equal to spell level
    // not all classes allow bonus spells
    let bonus = 0
    if (bonusSPD(charKlass.id, spellLevel) && spellLevel !== 0 && spellcasting.bonus_spells){
      bonus = 1
    }
    // console.log('total number of cast spells for a given level', castSpells)
    return castSpells[spellLevel] ? castSpells[spellLevel] < (availableSpells.spells + bonus) : true

  }

  const bonusSPD = (klass_id, spell_level) => {
    // let klass = this.props.classes.find(cl => cl.id === klass_id)
    // let spellcasting = klass.klass_features.find(kf => kf.name === "Spells")
    // let ab = _.lowerCase(spellcasting.spellcasting.ability_score)
    let ab = props.character_info.classes.find(cl => cl.id === klass_id).spellcastingAbility
    return ((props.character_info.ability_scores[ab] - 10) / 2.0) >= spell_level ? true : false
  }

  const renderAction = (action) => {
    let shorthand = _.lowerCase(action.split(" ")[0])
    if (props.character_info.actions[shorthand] && (shorthand === 'standard' || shorthand === 'immediate')){
      return `cast-${shorthand}`
    }
    if (areThereRemainingSpells()){
      switch(action){
        case "Standard Action":
          return "standard"
        case "Ten Minutes" || "One Hour" || "Eight Hours" || "One Minute":
          return "long"
        case "Immediate Action":
          return "immediate"
        case "Full-Round Action":
          return 'full'
        default:
          debugger
          return "none"
      }
    } else {
      return "cannot-cast"
    }
  }

  const availableToCast = () => {
    if (areThereRemainingSpells()){
      props.renderCast(klassSpell)
    }
  }

  // when you need to do spontaneous metamagic or cure/inflict/summon nature's ally spell replacement for a prepared spell
  // have another button before the cast spell button
  // open up a tool tip or a modal
  // give you options to cast
  return (
      <tr>
        <td>{klassSpell.spell_level}</td>
        <td><button className={renderAction(klassSpell.action.name)} onClick={availableToCast}><strong>Cast</strong></button></td>
        <td className='underline-hover' onClick={() => props.editModal('spell', null, klassSpell.spell.id)}>{klassSpell.spell.name}</td>
        <td>{renderRange(level, klassSpell.spell_range, klassSpell.spell.target, klassSpell.spell.name)}</td>
        <td>{renderTime(level, klassSpell.spell)}</td>
        <td>{renderDC(klassSpell.spell_level, klassSpell.klass.id)}</td>
        <td>{klassSpell.spell.spell_resistance ? "Y" : "N"}</td>
      </tr>
    )

}

const mapStateToProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}

export default connect(mapStateToProps)(SpellSummary)
