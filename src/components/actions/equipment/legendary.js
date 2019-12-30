import React from 'react'
import { connect } from 'react-redux'

const Legendary = props => {
  const legendaries = []
  const name = props.character.name

  if (name === 'Cedrick'){
    const taalmon = {
      id: 101,
      name: "Ta'al'mon Ancestral Handwraps",
      description: ``,
      aura: "moderate transmutation",
      price: "priceless",
      weight: 0,
      activatable: true
    }
    legendaries.push(taalmon)
  } else if (name === 'Robby'){
    const taalmon = {
      id: 201,
      name: "Tempest Trishula",
      description: ``,
      aura: "moderate transmuation",
      price: "priceless",
      weight: 4,
      activatable: true,
      redux: 'tempest',
      max: 3
    }
    legendaries.push(taalmon)
  }
  if (props.character_info.hardcode.helmsman){
    const besmara = {
      id: 1001,
      name: "Besmara's Honourable Emissary",
      description: ``,
      aura: "moderate transmuation",
      price: "priceless",
      weight: 40000,
      activatable: true
    }
    legendaries.push(besmara)
    const sasea = {
      id: 1002,
      name: "Sasea Bitch",
      description: ``,
      aura: "-",
      price: "priceless",
      weight: 40000,
      activatable: true
    }
    legendaries.push(sasea)
  }

  const renderClick = name => {
    if (name === 'Sasea Bitch'){
      props.editModal('sasea')
    } else {
      props.editModal('curio')
    }
  }

  const renderLegendary = () => {
    return legendaries.map((r, idx) => {
      let redux = props.character_info.hardcode[r.redux] || 0
      return (
        <tr className={renderTableStyling(idx)} key={r.id*3-1}>
          <td>{r.activatable ? <button onClick={() => renderClick(r.name)}>View</button> : null}</td>
          <td><strong>{r.name}</strong>{r.redux && ` ${r.max - redux}/${r.max}`}</td>
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
