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
  if (name === 'Maddox'){
    const quarter = {
      id: 2002,
      name: "Quarterstaff",
      description: `A quarterstaff is a simple piece of wood, about 5 feet in length.`,
      aura: "-",
      price: "-",
      weight: 4,
      activatable: false
    }
    weapons.push(quarter)
    const dagger = {
      id: 2003,
      name: "Dagger",
      description: `A dagger has a blade that is about 1 foot in length. You get a +2 bonus on Sleight of Hand skill checks made to conceal a dagger on your body.`,
      aura: "-",
      price: "2gp",
      weight: 1,
      activatable: false
    }
    weapons.push(dagger)
    const flamingCestus = {
      id: 2004,
      name: "+1 Flaming Cestus",
      description: `Considered armed is wielded.`,
      aura: "moderate evocation",
      price: "8305gp",
      weight: 1,
      activatable: false
    }
    weapons.push(flamingCestus)
  }
  if (name === 'Merg'){
    const orcDouble = {
      id: 3002,
      name: "+3 unholy Orc Doubleaxe",
      description: `A cruel weapon with blades placed at opposite ends of a long haft, an orc double axe is a double weapon. An unholy weapon is imbued with unholy power. This power makes the weapon evil-aligned and thus bypasses the corresponding damage reduction. It deals an extra 2d6 points of damage against all creatures of good alignment. It bestows one permanent negative level on any good creature attempting to wield it. The negative level remains as long as the weapon is in hand and disappears when the weapon is no longer wielded. This negative level cannot be overcome in any way (including restoration spells) while the weapon is wielded.`,
      aura: "moderate evocation (evil)",
      price: "50360gp",
      weight: 15,
      activatable: false
    }
    weapons.push(orcDouble)
    const dagger = {
      id: 3003,
      name: "Dagger",
      description: `A dagger has a blade that is about 1 foot in length. You get a +2 bonus on Sleight of Hand skill checks made to conceal a dagger on your body.`,
      aura: "-",
      price: "2gp",
      weight: 1,
      activatable: false
    }
    weapons.push(dagger)
    const morningstar = {
      id: 3004,
      name: "Bane (Construct) Morningstar",
      description: `A morningstar is a spiked metal ball, affixed to the top of a long handle. A bane weapon excels against certain foes. Against a designated foe, the weapon’s enhancement bonus is +2 better than its actual bonus. It also deals an extra 2d6 points of damage against the foe.`,
      aura: "moderate conjuration",
      price: "2308gp",
      weight: 6,
      activatable: false
    }
    weapons.push(morningstar)
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
