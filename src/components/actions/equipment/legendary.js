import React from 'react'
import { connect } from 'react-redux'

const Legendary = props => {
  const legendaries = []
  const name = props.character.name

  if (name === 'Cedrick'){
    const sergeant = {
      id: 101,
      name: "Ta'al'mon Ancestral Handwraps",
      description: ``,
      aura: "moderate enchantment",
      price: "priceless",
      weight: 0,
      activatable: true
    }
    legendaries.push(sergeant)
  }

  const renderClick = name => {
    props.editModal('curio')
  }

  const renderLegendary = () => {
    return legendaries.map((r, idx) => {
      return (
        <tr className={renderTableStyling(idx)} key={r.id*3-1}>
          <td>{r.activatable ? <button onClick={() => renderClick(r.name)}>View</button> : null}</td>
          <td><strong>{r.name}</strong></td>
          <td>{r.weight} lb{(r.weight > 1 || r.weight === 0) ? "s" : null}</td>
          <td>{r.price}</td>
          <td>{r.description}</td>
        </tr>
      )
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-weapons" : "odd-row"
  }

  return (
    <React.Fragment>
      {renderLegendary()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Legendary)
