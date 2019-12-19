import React from 'react'
import { connect } from 'react-redux'

const Rings = props => {
  const rings = []
  const name = props.character.name

  if (name === 'Cedrick'){
    const sergeant = {
      id: 1001,
      name: "Sergeant's Command Ring",
      description: `${props.character_info.hardcode.ringPoints}/3 points. Recharge 1 pt a day if you have helped someone achieve a goal the previous day`,
      aura: "moderate enchantment",
      price: "12000 gp",
      weight: 0,
      expendable: true
    }
    rings.push(sergeant)
    const feather = {
      id: 1002,
      name: "Ring of Feather Fall",
      description: <span>Acts exactly like a <em className='underline-hover' onClick={() => props.editModal('spell', null, 18)}>feather fall</em> spell, activated immediately if the wearrer falls more than 5 ft.</span>,
      aura: "faint transmutation",
      price: "2200 gp",
      weight: 0,
      expendable: false
    }
    rings.push(feather)
  }

  if (name === 'Persephone'){
    const storing = {
      id: 1003,
      name: "Ring of Spell Storing",
      description: `A spellcaster can cast any spells into the ring, so long as the total spell levels do not add up to more than 5. Metamagic versions of spells take up storage space equal to their spell level modified by the metamagic feat. A spellcaster can use a scroll to put a spell into the ring of spell storing. The user need not provide any material components or focus to cast the spell, and there is no arcane spell failure chance for wearing armor (because the ring wearer need not gesture). The activation time for the ring is the same as the casting time for the relevant spell, with a minimum of 1 standard action.`,
      aura: "moderate evocation",
      price: "50000 gp",
      weight: 0,
      expendable: false
    }
    rings.push(storing)
    const autumn = {
      id: 1004,
      name: "Ring of Autumn",
      description: `Grab details`,
      aura: "moderate evocation",
      price: "50000 gp",
      weight: 0,
      expendable: false
    }
    rings.push(autumn)
  }

  const renderClick = name => {
    if (name === "Sergeant's Command Ring"){
      props.editModal('command ring')
    }
  }

  const renderRings = () => {
    return rings.map((r, idx) => {
      return (
        <tr className={renderTableStyling(idx)} key={r.id*3-1}>
          <td>{r.expendable ? <button onClick={() => renderClick(r.name)}>Use</button> : null}</td>
          <td><strong>{r.name}</strong></td>
          <td>{r.weight} lb{(r.weight > 1 || r.weight === 0) ? "s" : null}</td>
          <td>{r.price}</td>
          <td>{r.description}</td>
        </tr>
      )
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-rings" : "odd-row"
  }

  return (
    <React.Fragment>
      {renderRings()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Rings)
