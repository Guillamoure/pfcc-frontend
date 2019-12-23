import React from 'react'
import { connect } from 'react-redux'

const Armor = props => {
  const armors = []
  const name = props.character.name

  if (name === 'Cedrick'){
    const wooden = {
      id: 151,
      name: "Wooden",
      description: `No ACP for swim checks`,
      type: "Light",
      price: "20 gp",
      weight: 25,
      armorBonus: 3,
      maxDex: 3,
      acp: 1,
      arcane: 15,
      speed: '30 ft/20 ft'
    }
    armors.push(wooden)
  }

  const renderClick = name => {
  }

  const renderArmor = () => {
    return armors.map((a, idx) => {
      let armor = props.character_info.hardcode.armor
      return (
        <tr className={renderTableStyling(idx)} key={a.id*3-1}>
          <td><button className='long' onClick={() => props.dispatch({type: 'ACTIVE ARMOR', name: a.name})}>{armor === a.name ? 'Doff' : 'Don'}</button></td>
          <td><strong>{a.name}</strong></td>
          <td>{a.type}</td>
          <td>+{a.armorBonus}</td>
          <td>+{a.maxDex}</td>
          <td>-{a.acp}</td>
          <td>{a.arcane}%</td>
          <td>{a.speed}</td>
          <td>{a.description}</td>
          <td>{a.weight} lb{(a.weight > 1 || a.weight === 0) ? "s" : null}</td>
          <td>{a.price}</td>
        </tr>
      )
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-armor" : "odd-row"
  }

  const renderTooltip = (e, type) => {
    let message = ''
    if (type === "Dex"){
      message = 'Your maximum bonus to Dexterity applied to your AC, even if you have a higher bonus.'
    }
    if (type === "ACP"){
      message = 'Armor Check Penalty: This is a penalty that applies to all Strength and Dexterity checks and skill checks.'
    }
    if (type === "Arcane"){
      message = 'When you cast an Arcane Spell that require a Somatic component, roll a d100. If you roll within the total Spell Failure Percentage, your spell fails and your action is wasted.'
    }
    props.renderTooltip(e, message)
  }

  return (
    <React.Fragment>
      {armors.length ? <table>
        <thead>
          <tr>
            <th>Worn</th>
            <th>Name</th>
            <th>Type</th>
            <th>Armor Bonus</th>
            <th onMouseOver={e => renderTooltip(e, 'Dex')} onMouseOut={props.mouseOut}>Max Dex.*</th>
            <th onMouseOver={e => renderTooltip(e, 'ACP')} onMouseOut={props.mouseOut}>ACP*</th>
            <th onMouseOver={e => renderTooltip(e, 'Arcane')} onMouseOut={props.mouseOut}>Arcane Failure*</th>
            <th>Speed</th>
            <th>Desc</th>
            <th>Weight</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {renderArmor()}
        </tbody>
      </table> : null}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Armor)
