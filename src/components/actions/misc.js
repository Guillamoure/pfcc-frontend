import React from 'react'
import { connect } from 'react-redux'

const Misc = props => {

  const name = props.character.name

  const renderCharacter = () => {
    let misc = []
    switch(name){
      // case "Nettie":
      //   return nettie()
      // case "Merg":
      //   return merg()
      // case "Cedrick":
      //   return cedrick()
      // case "Persephone":
      //   return pepper()
      // case 'Maddox':
      //   return maddox()
      case 'Robby':
        misc = robby()
        break
      default:
        break
    }
    return misc
  }

  const robby = () => {
    return [
      {id: 6000, name: 'Rope, Hempen (50 ft.)', weight: 10, price: '1 gp', description: 'The DC to escape hemp rope bonds is equal to 20 + the CMB of the creature that tied the bonds. Ropes do not need to make a check every round to maintain the pin. If the DC to escape is higher than 20 + the tying creatures CMB, the tied up creature cannot escape from the bonds, even with a natural 20 on the check. This rope has 2 hit points and can be burst with a DC 23 Strength check.'},
      {id: 6001, name: 'Grappling Hook', weight: 4, price: '1 gp', description: 'Throwing a grappling hook requires a ranged Attack Roll, treating the hook as a thrown weapon with a range increment of 10 feet. Objects with ample places to catch the hook are AC 5.'},
      {id: 6002, name: 'Bandana', weight: 0, price: '-', description: ''},
      {id: 6003, name: 'Boots', weight: 0, price: '-', description: ''},
      {id: 6004, name: 'Tan Pants', weight: 0, price: '-', description: ''},
      {id: 6005, name: 'Burgundy Ragged Naval Coat', weight: 2, price: '-', description: ''},
      {id: 6006, name: 'Pirate Flowey Shirt', weight: 0, price: '-', description: ''},
      {id: 6007, name: 'Sulfur', weight: 0, price: '5 sp', description: 'Sulfur has a distinctive odor and caustic properties.'},
      {id: 6008, name: 'Thieves Tool, Common', weight: 1, price: '30 gp', description: 'This kit contains lockpicks and other tools you need to use the Disable Device skill. Without these tools, you must use improvised tools, and you take a –2 circumstance penalty on Disable Device checks.'},
      {id: 6009, name: 'Asmodeus Pendants (12)', weight: 1, price: '5 sp', description: "Asmodeus' symbol: a downward pointing pentagram"},
      {id: 6010, name: 'Ball Bearings', weight: 2, price: '1 gp', description: "As a standard action, you can spill these tiny metal balls from their pouch to cover a level, 10 ft square. A creature moving across the covered area must succeed on a DC 10 Reflex saving throw or fall prone. A creature moving through the area at half speed doesn't need to make the save."},
      {id: 6011, name: 'Dynamite', weight: 1, price: '100 gp', description: "This hollow clay container holds a small charge of black powder and a slow-burning fuse. Lighting the fuse is move action; 1d3 rounds later the dynamite explodes, dealing 2d6 points of bludgeoning damage and 1d6 points of fire damage in a 10-foot-radius burst (Reflex DC 15 halves). You throw dynamite as if it were a splash weapon."},
      {id: 6012, name: 'Purple Dust', weight: 0, price: '-', description: ""},
      {id: 6013, name: 'Blue & White Mushroom', weight: 0, price: '-', description: ""},
    ]
  }

  const renderMisc = () => {
    return renderCharacter().map((m, idx) => {
      return (
        <tr className={renderTableStyling(idx)} key={m.key*idx*3-1}>
          <td>{m.name}</td>
          <td>{m.weight} lb{(m.weight > 1 || m.weight === 0) ? "s" : null}</td>
          <td>{m.price}</td>
          <td>{m.description}</td>
        </tr>
      )
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-misc" : "odd-row"
  }


  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {renderMisc()}
        </tbody>
      </table>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Misc)
