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
      action: 'move'
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
  }

  if (name === "Cedrick"){
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
  }
  if (name === "Maddox"){
    const sizeStaff = {id: 3010, name: "Staff of Size Alteration", description: <span>This staff of dark wood is stouter and sturdier than most magical staves, with a gnarled and twisted knot of wood at the top end. It allows use of the following spells: <em className='underline-hover' onClick={() => props.editModal('spell', null, 64)}>enlarge person</em> (1 charge), <em>reduce person</em> (1 charge), <em>shrink item</em> (2 charges), <em>mass enlarge person</em> (3 charges), <em>mass reduce person</em>(3 charges)</span>, aura: "moderate transmutation", price: "26150 gp", weight: '5', limit: 10, redux: 'sizeStaff' }
    magicItems.push(sizeStaff)
  }

  const renderClick = (name, limit, startingValue, expendable) => {
    if (name === "Rod of Grasping Hexes" || name === 'Wand of Unseen Servant' || name === "Staff of Size Alteration"){
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
            } else if (found.cast < limit){
              props.dispatch({type: 'LIMIT CASTING', name})
            }
          } else {
            props.dispatch({type: 'LIMIT CASTING', name})
          }
        } else {
          props.dispatch({type: 'LIMIT CASTING', name})
        }
      }
    }
    if (name === "Quick-Change Mask" ){
      props.dispatch({type: 'TRIGGER ACTION', action: 'move'})
    }
    if (name === "Bag of Tricks (Grey)" || name === 'Wand of Unseen Servant'){
      props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})
    }
    if (expendable){
      props.dispatch({type: 'USED ITEM', name})
    }
  }

  const renderMagicItems = () => {
    return magicItems.map((mi, idx) => {
      let limits = props.character_info.hardcode.limits
      let amount
      if (limits && mi.limit){
        let found = limits.find(l => l.name === mi.name)
        if (mi.starting){
          amount = found ? mi.starting - found.cast : mi.starting
        } else {
          amount = found ? mi.limit - found.cast : mi.limit
        }
      } else {
        amount = mi.starting ? mi.starting : mi.limit
      }
      let used = props.character_info.hardcode.usedItems
      if (used && used.includes(mi.name)){
        return null
      } else {
        console.log(props.character_info.hardcode.sizeStaff)
        return (
          <tr className={renderTableStyling(idx)} key={mi.id*3-1}>
            <td>{mi.activatable ? <button className={mi.action && !props.character_info.actions[mi.action] ? mi.action : 'cannot-cast'} onClick={() => renderClick(mi.name, mi.limit, mi.starting, mi.expendable)}>Use</button> : null}</td>
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
