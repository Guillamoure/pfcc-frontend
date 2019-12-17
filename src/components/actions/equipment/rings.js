import React from 'react'
import { connect } from 'react-redux'

const Rings = props => {
  const rings = []
  const name = props.character.name

  if (name === 'Cedrick'){
    const sergeant = {
      name: "Sergeant's Command Ring",
      description: `${props.character_info.hardcode.ringPoints}/3 points. Recharge 1 pt a day if you have helped someone achieve a goal the previous day`,
      aura: "moderate enchantment",
      price: "12000 gp",
      weight: 0,
      expendable: true
    }
    rings.push(sergeant)
    const feather = {
      name: "Ring of Feather Fall",
      description: <span>Acts exactly like a <em className='underline-hover' onClick={() => props.editModal('spell', null, 18)}>feather fall</em> spell, activated immediately if the wearrer falls more than 5 ft.</span>,
      aura: "faint transmutation",
      price: "2200 gp",
      weight: 0,
      expendable: false
    }
    rings.push(feather)
  }

  const renderClick = name => {
    if (name === "Sergeant's Command Ring"){
      props.editModal('command ring')
    }
  }

  const renderRings = () => {
    return rings.map(r => {
      return (
        <tr>
          <td>{r.expendable ? <button onClick={() => renderClick(r.name)}>Use</button> : null}</td>
          <td><strong>{r.name}</strong></td>
          <td>{r.weight} lb{(r.weight > 1 || r.weight === 0) ? "s" : null}</td>
          <td>{r.price}</td>
          <td>{r.description}</td>
        </tr>
      )
    })
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
