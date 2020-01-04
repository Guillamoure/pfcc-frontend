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
    const augmented = {
      id: 2005,
      name: "Augmented Shortsword AN-7f",
      description: `Polished shortsword that is made of individual inch-long blades. In between seeps out cold mist. Gives off a white-blue glow when the segments are slack.`,
      aura: "faint necromancy",
      price: "2010gp",
      weight: 2,
      activatable: false
    }
    weapons.push(augmented)
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
  } else if (name === 'Robby'){
    const cane = {
      id: 4000,
      name: "Cane Sword",
      description: `This slender light blade lies within a wooden container that serves as both its scabbard and hiding place. An observer must make a DC 20 Perception check to realize an undrawn sword cane is a weapon rather than a walking stick; the DC decreases to 10 if the observer is able to handle the weapon. You can’t wield a sword cane in two hands in order to apply 1-1/2 times your Strength modifier to damage.`,
      price: "45gp",
      weight: 4,
      activatable: false
    }
    weapons.push(cane)
    const longbow = {
      id: 4001,
      name: "Longbow",
      description: `At almost 5 feet in height, a longbow is made up of one solid piece of carefully curved wood. You need two hands to use a bow, regardless of its size. A longbow is too unwieldy to use while you are mounted. If you have a penalty for low Strength, apply it to damage rolls when you use a longbow. If you have a Strength bonus, you can apply it to damage rolls when you use a composite longbow (see below), but not when you use a regular longbow.`,
      price: "75gp",
      weight: 3,
      activatable: false
    }
    weapons.push(longbow)
    const harpoon = {
      id: 4002,
      name: "Harpoon",
      description: `A harpoon is a barbed spear with an attached rope 50 feet or less in length. Most harpoons have metal points, but some use ivory or are made entirely of wood. If you are proficient in the harpoon, it is a grappling weapon. A harpoon’s weight includes 10 pounds for the weight of 50 feet of hemp rope. The weight can be reduced by using shorter or lighter rope. If you are not proficient with a harpoon, treat it like a spear.`,
      price: "5gp",
      weight: 16,
      activatable: false
    }
    weapons.push(harpoon)
    const net = {
      id: 4003,
      name: "Net",
      description: <span><p>When you throw a net, you make a ranged touch attack against your target. A net’s maximum range is 10 feet. If you hit, the target is entangled.</p><p>If you control the trailing rope by succeeding on an opposed Strength check while holding it, the entangled creature can move only within the limits that the rope allows. If the entangled creature attempts to cast a spell, it must make a concentration check with a DC of 15 + the spell’s level or be unable to cast the spell.</p><p>An entangled creature can escape with a DC 20 Escape Artist check (a full-round action). The net has 5 hit points and can be burst with a DC 25 Strength check (also a full-round action). A net is useful only against creatures within one size category of you.</p><p>A net must be folded to be thrown effectively. The first time you throw your net in a fight, you make a normal ranged touch attack roll. After the net is unfolded, you take a –4 penalty on attack rolls with it. It takes 2 rounds for a proficient user to fold a net and twice that long for a non-proficient one to do so.</p></span>,
      price: "20gp",
      weight: 6,
      activatable: false
    }
    weapons.push(net)
    const lasso = {
      id: 4004,
      name: "Lasso",
      description: <span><p>This thrown weapon is a length of rope with a simple open knot on one end that allows you to entangle a foe like you would using a net.</p><p>On a successful hit, the lasso tightens; to use it again you must spend a standard action sliding the knot to enlarge the loop.</p><p>The DC to cast a spell while entangled with a lasso is 10 + the spell level being cast. An entangled creature can slip free with a successful DC 15 Escape Artist check as a full-round action. The lasso has 2 hit points and AC 10, and requires a DC 23 Strength check to break.</p></span>,
      price: "1sp",
      weight: 5,
      activatable: false
    }
    weapons.push(lasso)
    const revolver = {
      id: 4005,
      name: "Revolver",
      description: 'A revolver is a pistol with a revolving cylinder containing six chambers. Each chamber can hold a metal cartridge, and when one cartridge is shot, the cylinder automatically rotates (no extra hand or action required), readying the next chamber for firing. A revolver uses metal cartridges as ammunition.',
      price: "4000gp",
      weight: 4,
      activatable: false
    }
    weapons.push(revolver)
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
