import React from 'react'
import { connect } from 'react-redux'

const Misc = props => {

  const name = props.character.name

  const renderCharacter = () => {
    let misc = []
    switch(name){
      // case "Nettie":
      //   return nettie()
      case "Merg":
        misc = merg()
        break
      case "Cedrick":
        misc = cedrick()
        break
      // case "Persephone":
      //   return pepper()
      case 'Maddox':
        misc = maddox()
        break
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
      {id: 5999, name: 'Dragon Egg', weight: 10, price: 'priceless', description: 'Glossy and smooth, this appear to made of solid gold.'},
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

  const merg = () => {
    return [
      {id: 2000, name: 'Sunrod', weight: 1, price: '2 gp', description: 'This 1-foot-long, gold-tipped, iron rod glows brightly when struck as a standard action. It sheds normal light in a 30-foot radius and increases the light level by one step for an additional 30 feet beyond that area (darkness becomes dim light and dim light becomes normal light). A sunrod does not increase the light level in normal light or bright light. It glows for 6 hours, after which the gold tip is burned out and worthless.'},
      {id: 2001, name: 'Holy Water', weight: 1, price: '25 gp', description: 'Holy water damages undead creatures and evil outsiders almost as if it were acid. A flask of holy water can be thrown as a splash weapon. Treat this attack as a ranged touch attack with a range increment of 10 feet. A flask breaks if thrown against the body of a corporeal creature, but to use it against an incorporeal creature, you must open the flask and pour the holy water out onto the target. Thus, you can douse an incorporeal creature with holy water only if you are adjacent to it. Doing so is a ranged touch attack that does not provoke attacks of opportunity. A direct hit by a flask of holy water deals 2d4 points of damage to an undead creature or an evil outsider. Each such creature within 5 feet of the point where the flask hits takes 1 point of damage from the splash. Temples to good deities sell holy water at cost (making no profit). Holy water is made using the bless water spell.'},
      {id: 2002, name: 'Acid Flask', weight: 1, price: '10 gp', description: 'You can throw a flask of acid as a splash weapon. Treat this attack as a ranged touch attack with a range increment of 10 feet. A direct hit deals 1d6 points of acid damage. Every creature within 5 feet of the point where the acid hits takes 1 point of acid damage from the splash.'},
      {id: 2003, name: '10 Torches', weight: 10, price: '10 cp', description: 'A torch burns for 1 hour, shedding normal light in a 20-foot radius and increasing the light level by one step for an additional 20 feet beyond that area (darkness becomes dim light and dim light becomes normal light). A torch does not increase the light level in normal light or bright light. If a torch is used in combat, treat it as a one-handed improvised weapon that deals bludgeoning damage equal to that of a gauntlet of its size, plus 1 point of fire damage.'},
      {id: 2004, name: 'Tindertwig', weight: 0, price: '1 gp', description: 'The alchemical substance on the end of this small, wooden stick ignites when struck against a rough surface. Creating a flame with a tindertwig is much faster than creating a flame with Flint and Steel (or a magnifying glass) and tinder. Lighting a torch with a tindertwig is a Standard Action (rather than a full-round action), and lighting any other fire with one is at least a Standard Action.'},
      {id: 2005, name: '5 Lamp Oil Flasks', weight: 5, price: '5 sp', description: 'A pint of lamp oil burns for 6 hours in a common lantern or lamp. You can also use a flask of lamp oil as a splash weapon. Use the rules for alchemist’s fire, except that it takes a full-round action to prepare a flask with a fuse. Once it is thrown, there is a 50% chance of the flask igniting successfully. You can pour a pint of oil on the ground to cover an area 5 feet square, provided that the surface is smooth. If lit, the oil burns for 2 rounds and deals 1d3 points of fire damage to each creature in the area.'},
      {id: 2006, name: 'Robe', weight: 6, price: '12 gp', description: 'A glamorous red robe with white mink and gold thread trim. Has seen better days.'},
      {id: 2007, name: 'Common Backpack', weight: 2, price: '2 gp', description: 'This leather knapsack has one large pocket that closes with a buckled strap and holds about 2 cubic feet of material. Some may have one or more smaller pockets on the sides.'},
    ]
  }

  const cedrick = () => {
    return [
      {id: 3000, name: 'Dragon Egg', weight: 10, price: 'priceless', description: 'Made of, or covered with, broad green leaves.'}
    ]
  }

  const maddox = () => {
    return [
      {id: 5010, name: 'Books', weight: 18, price: '-', description: <p>Titles:<ul><li>Rarity of Antiques in Antiquity</li><li>Connection of Ley and Fey</li><li>The Ruins of the 2nd Age, v3</li><li>Thynne's Travels, v11</li><li>Imbuing with Natural Magics, v1</li><li>History of Trans-Planar Portals</li><li>Early Catrography of 3rd Age, v3</li><li>1st and 2nd Age Written Secrets</li></ul></p>}
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
