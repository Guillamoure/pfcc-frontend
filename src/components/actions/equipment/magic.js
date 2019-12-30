import React from 'react'
import { connect } from 'react-redux'

const MagicItems = props => {
  const magicItems = []
  const name = props.character.name

  if (name === 'Persephone'){
    const tricks = {
      id: 1000,
      name: "Bag of Tricks (Grey)",
      description: <span>This small sack appears empty. Anyone reaching into the bag feels a small, fuzzy ball. If the ball is removed and tossed up to 20 feet away, it turns into an animal. The animal serves the character who drew it from the bag for 10 minutes (or until slain or ordered back into the bag), at which point it disappears. It can follow any of the commands described in the Handle Animal skill. <table><thead><tr><th>d%</th><th>Animal</th></tr></thead><tbody><tr><td>01-30</td><td>Bat</td></tr><tr><td>31-60</td><td>Rat</td></tr><tr><td>61-75</td><td>Cat</td></tr><tr><td>76-90</td><td>Weasel</td></tr><tr><td>91-100</td><td>Riding Dog</td></tr></tbody></table> <span>Animals produced are always random, and only one may exist at a time. Up to 10 Animals can be drawn from the bag each week, but no more than two per day.</span></span>,
      aura: "faint conjuration",
      price: "3400 gp",
      weight: 0,
      activatable: true,
      action: 'standard'
    }
    magicItems.push(tricks)
    const grasping = {
      id: 1001,
      name: "Rod of Grasping Hexes",
      description: 'This rod is crafted from a gnarled branch covered in sharp thorns. Three times per day when a wielder of this rod uses a hex (but not an advanced hex or grand hex), she can use this rod’s power to double the range of the hex, so long as the hex has a range measured in feet.',
      aura: "strong (no school)",
      price: "11000 gp",
      weight: 5,
      activatable: true,
      limit: 3,
      action: 'free'
    }
    magicItems.push(grasping)
    const quickChangeMask = {
      id: 1002,
      name: "Quick-Change Mask",
      description: <span>A wearer can remove this mask as a move action to change his appearance as if using <em className='underline-hover' onClick={() => props.editModal('spell', null, 55)}>disguise self</em>. The effect persists for 10 minutes. A vigilante can instead remove a quick-change mask to switch his identity as a move action. If the mask is used in this way, the effect functions just like changing identities normally (except faster), and doesn’t have a limited duration. Regardless of which way he is using a quick-change mask, the user can attempt a Bluff check to create a diversion so he can use Stealth as part of the same move action he uses to activate the mask. The mask dissolves when used.</span>,
      aura: "faint illusion",
      price: "650 gp",
      weight: '-',
      activatable: true,
      action: 'move',
      expendable: true
    }
    magicItems.push(quickChangeMask)
    const vastIntelligence = {
      id: 1003,
      name: "Headband of Vast Intelligence +2",
      description: <span>This intricate gold headband is decorated with several small blue and deep purple gemstones.The headband grants the wearer an enhancement bonus to Intelligence of +2. A <em>headband of vast intelligence</em> has one skill associated with it: <strong>Religion</strong>. The headband grants a number of skill ranks in Religion equal to the wearer’s total Hit Dice (<strong>7 skill ranks</strong>). These ranks <strong>do not</strong> stack with the ranks a creature already possesses.</span>,
      aura: "moderate transmutation",
      price: "4000 gp",
      weight: '1',
      activatable: false
    }
    magicItems.push(vastIntelligence)
    const wandUnseenServant = {
      id: 1004,
      name: "Wand of Unseen Servant",
      description: <span>Cast <em className='underline-hover' onClick={() => props.editModal('spell', null, 62)}>unseen servant</em> 50 times</span>,
      aura: "faint conjuration",
      price: "750 gp",
      weight: '-',
      activatable: true,
      action: 'standard',
      limit: 50,
      starting: 49
    }
    magicItems.push(wandUnseenServant)
  } else if (name === "Cedrick"){
    const spiderClimb = {
      id: 22000,
      name: "Slippers of Spider Climb",
      description: 'When worn, a pair of these slippers enables movement on vertical surfaces or even upside down along ceilings, leaving the wearer’s hands free. Her climb speed is 20 feet. Severely slippery surfaces—icy, oiled, or greased surfaces—make these slippers useless. The slippers can be used for 10 minutes per day, split up as the wearer chooses (minimum 1 minute per use).',
      aura: "faint transmutation",
      price: "4800 gp",
      weight: '.5',
      activatable: false
    }
    magicItems.push(spiderClimb)
    const potCureModerate = {
      id: 22022,
      name: "Potion of Cure Moderate Wounds",
      description: 'Heal 2d8+3',
      aura: "faint conjuration",
      price: "300 gp",
      weight: '-',
      activatable: true,
      action: 'standard',
      expendable: true
    }
    magicItems.push(potCureModerate)
    const eek = {id: 22023, name: "Pint of Eek", description: 'After consuming, you immediately breath out a blast of sonic energy in a 30 ft line. All affected creatures take 3d6 sonic damage, or half that if they succeed at a DC 15 Reflex save.', aura: "moderate evocation", price: "???", weight: '-', activatable: true, action: 'standard', expendable: true}
    magicItems.push(eek)
  } else if (name === "Maddox"){
    const sizeStaff = {id: 3010, name: "Staff of Size Alteration", description: <span>This staff of dark wood is stouter and sturdier than most magical staves, with a gnarled and twisted knot of wood at the top end. It allows use of the following spells: <em className='underline-hover' onClick={() => props.editModal('spell', null, 64)}>enlarge person</em> (1 charge), <em className='underline-hover' onClick={() => props.editModal('spell', null, 65)}>reduce person</em> (1 charge), <em className='underline-hover' onClick={() => props.editModal('spell', null, 66)}>shrink item</em> (2 charges), <em className='underline-hover' onClick={() => props.editModal('spell', null, 67)}>mass enlarge person</em> (3 charges), <em className='underline-hover' onClick={() => props.editModal('spell', null, 67)}>mass reduce person</em> (3 charges)</span>, aura: "moderate transmutation", price: "26150 gp", weight: '5', limit: 10, redux: 'sizeStaff' }
    magicItems.push(sizeStaff)
    const fireballNecklace = {id: 3011, name: "Necklace of Fireballs III", description: <span><p>This item appears to be a string or cluster of spherical beads, sometimes with the ends tied together to form a necklace.</p><p>(It does not count as an item worn around the neck for the purpose of determining which of a character’s worn magic items is effective.) If a character holds it, however, all can see the strand as it really is—a golden chain from which hang a number of golden spheres. The spheres are detachable by the wearer (and only by the wearer), who can easily hurl one of them up to 70 feet. When a sphere arrives at the end of its trajectory, it detonates as a <em className='underline-hover' onClick={() => props.editModal('spell', null, 66)}>fireball</em> spell (Reflex DC 14 half).</p><p>Spheres come in different strengths, ranging from those that deal 2d6 points of fire damage to those that deal 10d6. The market price of a sphere is 150 gp for each die of damage it deals.</p><p>Each necklace of fireballs contains a combination of spheres of various strengths. Some traditional combinations, designated types I through VII, are detailed above.</p><p>If the necklace is being worn or carried by a character who fails her saving throw against a magical fire attack, the item must make a saving throw as well (with a save bonus of +7). If the necklace fails to save, all its remaining spheres detonate simultaneously, often with regrettable consequences for the wearer.</p></span>, aura: "moderate evocation", price: "4350 gp", weight: 1}
    magicItems.push(fireballNecklace)
    const handy = {id: 3012, name: "Handy Haversack", description: 'A backpack of this sort appears to be well made, well used, and quite ordinary. It is constructed of finely tanned leather, and the straps have brass hardware and buckles. It has two side pouches, each of which appears large enough to hold about a quart of material. In fact, each is like a bag of holding and can actually hold material of as much as 2 cubic feet in volume or 20 pounds in weight. The large central portion of the pack can contain up to 8 cubic feet or 80 pounds of material. Even when so filled, the backpack always weighs only 5 pounds. While such storage is useful enough, the pack has an even greater power. When the wearer reaches into it for a specific item, that item is always on top. Thus, no digging around and fumbling is ever necessary to find what a haversack contains. Retrieving any specific item from a haversack is a move action, but it does not provoke the attacks of opportunity that retrieving a stored item usually does.', aura: "moderate conjuration", price: "2000 gp", weight: 5, activatable: true, action: 'move', modal: 'handy'}
    magicItems.push(handy)
  } else if (name === 'Merg'){
    const elixirFire = {id: 2004, name: "Elixir of Fire Breath", description: 'This strange bubbling elixir bestows upon the drinker the ability to spit gouts of flame. He can breathe fire up to three times, each time dealing 4d6 points of fire damage to a single target up to 25 feet away. The victim can attempt a DC 13 Reflex save for half damage. Unused blasts of fire dissipate 1 hour after the liquid is consumed.', aura: "moderate evocation", price: "1100 gp", weight: '-', activatable: true, action: 'standard', expendable: true}
    magicItems.push(elixirFire)
  } else if (name === 'Robby'){
    const pirates = {id: 3000, name: "Pirate's Eye Patch", description: <span>This black silk eye patch is adorned by a skull and crossbones worked in silver thread. The wearer of this patch gains a +2 competence bonus on Swim and Climb checks. In addition, once per day, the wearer of this eye patch can gain the effects of either <em className='underline-hover' onClick={() => props.editModal('spell', null, 70)}>touch of the sea</em> or <em className='underline-hover' onClick={() => props.editModal('spell', null, 52)}>expeditious retreat</em> on command (wearer’s choice).</span>, aura: "faint transmutation", price: '2600 gp', weight: '-'}
    magicItems.push(pirates)
    const quickShirt = {id: 3001, name: "Quick Runner's Shirt", description: `This shirt is made of light, gossamer-thin fabric embroidered with arrangements of winged feet. Once per day as a swift action, the wearer can take an additional move action to move (${props.character_info.hardcode.speed} ft) and then immediately end his turn, losing any unspent actions. A character must wear this shirt continuously for 24 hours before he can activate this ability.`, aura: "faint transmutation", price: "1000 gp", weight: '-', activatable: true, action: 'swift', limit: 1}
    magicItems.push(quickShirt)
    const jabberjaw = {id: 3002, name: "Jabberjaw Gems", description: `When a gem is held, your spokemon language (heard and mouthed) appear as if you were speaking the gem's associated language. Whoever is wielding the gem or touching the wielder can hear the actual langueg spoken. If you hold multiple gems, your language is an amalgam of all the gems. For listeners who know all of the languages spoken, they must make a DC 15 Linguistics check to comprehend the speaker. For each language a listener doesn't know, increase the DC by 5.`, aura: "moderate transmutation", price: "6000 gp", weight: '-'}
    magicItems.push(jabberjaw)
    const origami = {id: 3003, name: "Origami Boat", description: 'If this makes contact with water, it gradually (over the course of 5 minutes) increase its size until it becomes a row boat with a space of 20 ft by 10 ft in the same shape as the paper. After 2 hours, the boat gradually (over the course of 10 minutes) shrinks back to its smaller form. This transmation resets after 12 hours.', aura: "moderate transmutation", price: "6000 gp", weight: '-'}
    magicItems.push(origami)
    const brassCloak = {id: 3004, name: "Brass Griffin Cloak", description: <span>While wearing this cloak, if the wearer is damaged by fire damage, they are not affected by it; the cloak draws the energy towards it. Once the clock has absorbed 50 damage this way, the cloak bruns up and is destroyed, and any excess damage is dealt to the wearer. Once a day, as a move action, you may  be affected by the spell <em className='underline-hover' onClick={() => props.editModal('spell', null, 75)}>endure elements</em>. The duration of this effect is 1 hour.</span>, aura: "moderate transmutation", price: "6000 gp", weight: '-'}
    magicItems.push(brassCloak)
  }

  const renderClick = (name, limit, startingValue, expendable, modal) => {
    if (name === "Rod of Grasping Hexes" || name === 'Wand of Unseen Servant' || name === "Staff of Size Alteration" || name === "Quick Runner's Shirt"){
      if (limit){
        // if limits exist in redux
        let limits = props.character_info.hardcode.limits
        // if limits doesn't exist, dispatch
        // if limits does exist, try to find the specifc one
        // if that one isn't found, dispatch
        // if that one is found, check to see if the number of casts is equal to the limit
        // if casts is less than limit, dispatch
        // if casts is equal to limit, don't
        if (limits){
          let found = props.character_info.hardcode.limits.find(l => l.name === name)
          if (found){
            if (startingValue && found.cast < startingValue){
              props.dispatch({type: 'LIMIT CASTING', name})
              if (name === "Quick Runner's Shirt"){
                props.dispatch({type: 'TRIGGER ACTION', action: 'full'})
              }
            } else if (found.cast < limit){
              props.dispatch({type: 'LIMIT CASTING', name})
              if (name === "Quick Runner's Shirt"){
                props.dispatch({type: 'TRIGGER ACTION', action: 'full'})
              }
            }
          } else {
            props.dispatch({type: 'LIMIT CASTING', name})
            if (name === "Quick Runner's Shirt"){
              props.dispatch({type: 'TRIGGER ACTION', action: 'full'})
            }
          }
        } else {
          props.dispatch({type: 'LIMIT CASTING', name})
          if (name === "Quick Runner's Shirt"){
            props.dispatch({type: 'TRIGGER ACTION', action: 'full'})
          }
        }
      }
    }
    if (name === "Quick-Change Mask"){
      props.dispatch({type: 'TRIGGER ACTION', action: 'move'})
    }
    if (name === "Bag of Tricks (Grey)" || name === 'Wand of Unseen Servant'){
      props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})
    }
    if (expendable){
      props.dispatch({type: 'USED ITEM', name})
    }
    if (modal){
      props.editModal(modal)
    }
  }

  const renderMagicItems = () => {
    return magicItems.map((mi, idx) => {
      let limits = props.character_info.hardcode.limits
      let amount = true
      if (limits && mi.limit){
        let found = limits.find(l => l.name === mi.name)
        if (mi.starting){
          amount = found ? mi.starting - found.cast : mi.starting
        } else {
          amount = found ? mi.limit - found.cast : mi.limit
        }
      } else {
        if (mi.limit){
          amount = mi.starting ? mi.starting : mi.limit
        }
      }
      let used = props.character_info.hardcode.usedItems
      if (used && used.includes(mi.name)){
        return null
      } else {
        return (
          <tr className={renderTableStyling(idx)} key={mi.id*3-1}>
            <td>{mi.activatable ? <button className={mi.action && !props.character_info.actions[mi.action] && amount ? mi.action : 'cannot-cast'} onClick={() => renderClick(mi.name, mi.limit, mi.starting, mi.expendable, mi.modal)}>Use</button> : null}</td>
            <td><strong>{mi.name}</strong>{mi.limit && mi.activate ? `(${amount}/${mi.limit})` : null}{mi.redux ? `(${mi.limit - props.character_info.hardcode[mi.redux] || 10}/${mi.limit})` : null}</td>
            <td>{mi.weight} lb{(mi.weight > 1 || mi.weight === 0) ? "s" : null}</td>
            <td>{mi.price}</td>
            <td>{mi.description}</td>
          </tr>
        )
      }
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-magic" : "odd-row"
  }

  return (
    <React.Fragment>
      {renderMagicItems()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(MagicItems)
