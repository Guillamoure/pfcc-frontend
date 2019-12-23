import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const Curio = props => {

  let curio = {}

  switch(props.character.name){
    case 'Cedrick':
      curio = {
        name: "Ta'al'mon Ancestral Handwraps",
        description: "This thick woven bandages are off white, but unblemished. They are 4 inches by 10 ft, and are meant to be wrapped around a creature’s limbs to provide a barrier and brace when fighting. There are faint relief carvings in the bandages themselves, large pictographs of martial arts poses and forms.",
        warranty: "All curios can be broken voluntarily by its wielder, after possessing it for at least 1 day. Once broken, they can cast the spell attributed to it. The curio becomes inert, and must be repaired. Once repaired, it can only be reactivated at another altar.",
        hp: "Hardness 12, Hit Points 30",
        effects: [
          "This curio gives the wielder a +2 enhancement bonus to Dexterity.",
          'This curio counts a +1 magic weapon, giving a +1 enhancement bonus to unarmed or natural weapons that it is wrapped around, affecting the attack rolls and damage rolls.',
          <span>This curio counts as having the ominous weapon enchantment <small>(An ominous weapon trails a shadowy haze behind every stroke, and moans a menacing dirge in battle. An ominous weapon adds its enhancement bonus on Intimidate checks made by the wielder. In addition, when an ominous weapon confirms a critical hit, the target is shaken for 1 minute (DC 13 Will negates); if the weapon’s critical multiplier is greater than x2, this condition lasts 1 additional minute per multiple over x2. A creature that gains the shaken condition from an ominous weapon cannot gain that condition again from the same weapon for 24 hours.)</small></span>,
          'Once per day, as a swift action, the wielder can reroll their initiative check with an enhancement bonus equal to their dexterity modifier. This does not allow the weidler to act twice within a given round, their initiative takes effect during the following round.',
          'Once a day, the wielder can make their next attack action, if it hits, deal twice the number of damage dice used instead of the normal amount. This feature does not affect precision damage, but it does count in additional to a critical hit’s dice damage increase. This feature does not stack with the vital strike feat or similar abilities.',
          'If the wielder makes a successful unarmed attack against a creature, if that creature’s size is the same as theirs or smaller, the wielder can, as a swift action, teleport to the square opposite where they were relative to the damaged creature. This square is where an ally would be if the wielder was flanking the enemy. If that square is occupied, the wielder may teleport to an adjacent square, but still in a threat range of the enemy. If these squares are occupied, they cannot use this feature.',
          <span>Twice per day, the wielder can cast <em>force punch</em>, using their class level as their caster level.</span>,
          <span>When it breaks, the wielder can cast <em>greater magic fang</em> - standard action (Caster Level is equal to the wielder’s class level)</span>
        ]
      }
      break
    default:
      break
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <h3>{curio.name}</h3>
          <p>{curio.description}</p>
          <p>{curio.warranty}</p>
          <div>{curio.hp}</div>
          <ul>
            {curio.effects.map(effect => <li>{effect}</li>)}
          </ul>
        </div>
      </div>
    </Portal>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Curio)
