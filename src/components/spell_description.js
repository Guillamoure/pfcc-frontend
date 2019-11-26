import React from 'react'
import _ from 'lodash'

const SpellDescription = props => {

  const { spell } = props

  const renderComponentItems = () => {
    // if any of the spell components have an item
    if (spell.spell_components.find(sc => sc.item !== null)){
      const { spell_components } = spell
      let filtered = spell_components.filter(sc => sc.item)
      let justItems = filtered.map(sc => sc.item)
      let uniqItems = _.uniq(justItems)
      return ` (${uniqItems.join(", ")})`
    } else {
      return null
    }
  }

  const renderFeet = () => {
    const { spell_range } = spell
    let arrayOfStrings = []
    arrayOfStrings.push(spell_range.name)
    if (spell_range.name === "Close"){
      arrayOfStrings.push("(25 ft. + 5 ft./ 2 levels)")
    } else if (spell_range.name === "Medium"){
      arrayOfStrings.push("(100 ft. + 10 ft./level)")
    } else if (spell_range.name === "Long"){
      arrayOfStrings.push("(400 ft. + 40 ft./level)")
    }
    return arrayOfStrings.join(" ")
  }

  const renderDescription = () => {
    let split = spell.description.split('\n\n')
    return split.map(desc => <p>{desc}</p>)
  }

    return (
      <ul id='description-container'>
        <li><strong>{spell.name}</strong></li>
        <li>School | {spell.magic_school.name} [{spell.subschools.map(ss => ss.name).join(", ")}]</li>
        <li>Level | {spell.klass_spells.map(ks => `${ks.klass.name} ${ks.spell_level}`).join(", ")}</li>
        <li><strong><u>Casting</u></strong></li>
        <li>Casting Time | {spell.action.name}</li>
        <li>Components | {spell.spell_components.map(sc => sc.component.abbreviation).join(", ")}{renderComponentItems()}</li>
        <li><strong>Effect</strong></li>
        <li>Range | {renderFeet()}</li>
        <li>Target | {spell.target}</li>
        <li>Duration | {spell.duration}</li>
        <li>Saving Throw | {spell.saving_throw} | Spell Resistance | {spell.spell_resistance ? "Yes" : "No"}</li>
        <li><strong>Description</strong></li>
        <li>{renderDescription()}</li>
      </ul>
    )
}

export default SpellDescription
