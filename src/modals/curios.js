import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const Curio = props => {

  let curios = []

  let warranty = 'All curios can be broken voluntarily by its wielder, after possessing it for at least 1 day. Once broken, they can cast the spell attributed to it. The curio becomes inert, and must be repaired. Once repaired, it can only be reactivated at another altar.'

  switch(props.character.name){
    case 'Cedrick':
      curios.push({
        name: "Ta'al'mon Ancestral Handwraps",
        description: "This thick woven bandages are off white, but unblemished. They are 4 inches by 10 ft, and are meant to be wrapped around a creature’s limbs to provide a barrier and brace when fighting. There are faint relief carvings in the bandages themselves, large pictographs of martial arts poses and forms.",
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
      })
      break
    case 'Robby':
      curios.push({
        name: 'Tempest Trishula',
        description: 'Three-pointed trident, with the outer two tines curving out from the base, and back in towards the center tine, and curve the points back out. The shaft has multiple ridged bands spaced 6 inches apart. It has embossed runes all along it that give it grip and texture. Just at the top, under the points, are small three glowing gemstones, that glow on opposite sides of haft.',
        hp: 'Hardness 12, Hit Points 30',
        effects: [
          'Counts as a +1 magic weapon, so +1 enhancement bonus to Attack Rolls and Damage Rolls',
          'Counts as having the shock weapon enchantment (+1d6 electricity damage)',
          <span>Counts as having the returning weapon enchantment <small>(A returning weapon flies through the air back to the creature that threw it. It returns to the thrower just before the creature’s next turn (and is therefore ready to use again in that turn). Catching a returning weapon when it comes back is a free action. If the character can’t catch it, or if the character has moved since throwing it, the weapon drops to the ground in the square from which it was thrown.)</small></span>,
          'While wielding, the user has a swim speed of 30 ft.',
          <span>The Trishula has three glowing teal gemstones along the shaft. This trident holds 3 spell level slots, which can be spent by casting spells. For each spell level the spell has, when cast, that many gems go dormant. You cannot cast a spell that has a higher spell level the number of glowing gems on the Trishula. The Tempest Trishula has a caster level equal to your class level, and Charisma has the spellcasting score. The number of glowing gems restore to 3 at the beginning of a new day. The spells available to cast are: <em>obscuring mist</em>(1), <em>hydraulic push</em>(1), <em>gust of wind</em>(2), <em>slipstream</em>(2)</span>,
          <span>When it breaks, the wielder can cast <em>lightning bolt</em> - standard action (Caster Level is equal to the wielder’s class level)</span>
        ]
      })
      break
    case 'Maddox':
      curios.push({
        name: 'Zamantash Delta Chronometer',
        description: 'This brass contraption fits into a palm comfortably, and is heavy for its size. Shaped like a flat disk, on one side is an engraving of concentric circles of different weights and locations within the larger circle. The front has a time face, with a 24 hour clock, and this is mirrored with a hologram of the face that is 2 inches above the clock face, glowing a transparent blue.',
        hp: 'Hardness 12, Hit Points 8',
        effects: [
          'Thrice a day, the wielder can add a +2 insight bonus to any roll involving a d20. You can add this bonus after rolling, but before knowing the result of the check.',
          <span>At will, the wielder can cast <em>augury</em>, but the casting time increases to 10 minutes, using their class level as their caster level.</span>,
          'Once every three days, as a move action, the wielder, and any companion, familiar, or mount within 5 ft of them, feels as though they received an 8-hour rest. This benefit applies towards healing HP and ability damage, removing conditions, and resetting spells and abilities.',
          'Once a month, the wielder and all others can participate in a ritual that takes 20 minutes. The moment the ritual ends becomes a fixed point in time. Within 24 hours of completing this ritual, the wielder can trigger the Curio as a 3-round action that requires concentration, and provokes an attack of opportunity. Time is rewound back to the fixed point in time, which becomes no longer fixed, and all of the participants of the ritual are aware of the events that they experienced. Their spent spells, abilities, and hit points are what they were when the ritual was completed.',
          'As a standard action, the wielder can select one creature within 30 ft of them. That target gains +10 to their speed, a +2 insight bonus to their AC, and on their next attack roll, Reflex saving throw, or Dexterity-based or Charisma-based skill check, they may roll twice and take the higher of the two results. This effect lasts until the beginning of the current wielder’s next turn.',
          <span>When it breaks, the wielder can cast <em>hold person</em> - standard action (Caster Level is equal to the wielder’s class level)</span>
        ]
      })
    default:
      break
  }

  if (props.character_info.hardcode.helmsman){
    curios.push({
      name: "Besmara's Honourable Emissary",
      description: 'This ship is shallow bottom, with a chest high wall wrapped around the stern and bow only. It sits low in the water, allowing someone to sit off the edge and dip their legs in the water. The stern has a canopy with an ornately carved seat underneath, with a large helmet of sorts resting on the top of the seat. The wooden hull is smooth to touch, and the figurehead is made of mahogany, carved into the shape of a sturgeon with 6 wing-like fins.',
      hp: 'Hardness 12, Hit Points 600',
      effects: [
        'The helmsman that sits in the chair and dons the helmet controls the ship telepathically. They are considered to be concentrating, so they cannot do any other actions besides talk and move their limbs. The helmsman can move the ship up to a speed of 100 ft, accelerating by 30 ft every round.',
        'This curio normally floats about 6 inches off the ground. A helmsman can forced the boat to not be affected by this, and ground it. However, the curio resumes floating if the helmsman changes the order, or is removed from their seat.',
        'A siege weapon can be mounted in the 20 ft square space at the bow of the ship. If one is mounted, the siege weapon can be hidden in pocket dimension and withdrawn as a full-round action from within the ship. The reload and aim actions can be done in half the time (rounded up, unless it was already 1 full-round, then is it is reduced to a standard action), this can be done by one crew. Manning the siege action is a physical act, and cannot be done by an active helmsman.',
        'The ship has 10 additional extradimensional spaces that exist within the hull. In order to enter, a creature must be aware of the space and open the trapdoor on the deck to enter that space. The space is a 10 ft by 10 ft by 10 ft wooden room, with 3 portholes that look out on the water, or into the water (up to the occupant). A creature can enter any known space, but if a creature is occupied in an existing space, any additional creatures much be permitted by that other creature. A creature can force themselves into a space occupied by another creature by winning an opposed Wisdom check (ties go to occupied creatures). A creature can only attempt to breach an occupied space once a day.',
        <span>Anyone on board the ship can cast any of these spells on themselves while they are on the ship: <em>air bubble</em>, <em>enhance water</em>, <em>fabricate disguise</em>. The total number of spells that can be cast this way during a single day is equal to the helmsman’s Wisdom score (this value cannot change once a helmsman is declared for 24 hours). The caster level of this spell is equal to the class level of the helmsman (or last helmsman, within 1 hour).</span>,
        <span>When it breaks, the wielder can cast <em>fly</em> - standard action (Caster Level is equal to the wielder’s class level)</span>
      ]
    })
  }

  const renderCurios = () => {
    return curios.map(c => {
      return (
        <React.Fragment>
          <h3>{c.name}</h3>
          <p>{c.description}</p>
          <p>{warranty}</p>
          <div>{c.hp}</div>
          <ul>
            {c.effects.map(effect => <li>{effect}</li>)}
          </ul>
        </React.Fragment>
      )
    })
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          {renderCurios()}
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
