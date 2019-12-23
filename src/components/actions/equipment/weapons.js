import React from 'react'
import { connect } from 'react-redux'

const Weapons = props => {
  const weapons = []
  const name = props.character.name

  if (name === 'Persephone'){
    const lightCrossbow = {
      id: 200,
      name: "Light Crossbow",
      description: `Normally, operating a light crossbow requires two hands. However, you can shoot, but not load, a light crossbow with one hand at a –2 penalty on attack rolls.`,
      aura: "-",
      price: "35gp",
      weight: 4,
      activatable: false
    }
    weapons.push(lightCrossbow)
  }

  const renderClick = name => {
  }

  const renderWeapons = () => {
    return weapons.map((w, idx) => {
      return (
        <tr className={renderTableStyling(idx)} key={w.id*3-1}>
          <td>{w.activatable ? <button onClick={() => renderClick(w.name)}>View</button> : null}</td>
          <td><strong>{w.name}</strong></td>
          <td>{w.weight} lb{(w.weight > 1 || w.weight === 0) ? "s" : null}</td>
          <td>{w.price}</td>
          <td>{w.description}</td>
        </tr>
      )
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-weapons" : "odd-row"
  }

  return (
    <React.Fragment>
      {renderWeapons()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Weapons)
