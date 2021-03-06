import React from 'react'
import { connect } from 'react-redux'

const HardcodeSpells = props => {

  const condor = props.character_info.hardcode.minor === 'Condor - Minor'
  const cedrick = props.character.name === "Cedrick"
  const pepper = props.character.name === "Persephone"
  const maddox = props.character.name === "Maddox"
  const robby = props.character.name === "Robby"
  const grackle = props.character.name === "Grackle"

  const spells = () => {
    let availableSpells = []
    // let allSpells = [...props.spells]
    if (condor || pepper){
      let feather_fall = {
        id: 18,
        level: 0,
        action: 'immediate',
        name: 'Feather Fall',
        range: 'self',
        duration: 'until landing or 7 rounds',
        dc: '-',
        sr: false,
        source: condor ? 'Condor Aspect' : 'Flight Hex'
      }
      availableSpells.push(feather_fall)
    }
    if (cedrick){
      let haste = {
        id: 9,
        level: 3,
        action: 'standard',
        name: 'Haste',
        range: 'self or touch',
        duration: '7 rounds',
        dc: 'Fort 15',
        sr: false,
        commandRing: 1,
        source: "Sergeant's Command Ring"
      }
      availableSpells.push(haste)
      let slow = {
        id: 27,
        level: 3,
        action: 'standard',
        name: 'Slow',
        range: 'self or touch',
        duration: '7 rounds',
        dc: 'Will 15',
        sr: true,
        commandRing: 1,
        source: "Sergeant's Command Ring"
      }
      availableSpells.push(slow)
      let master = {
        id: 28,
        level: 3,
        action: 'immediate',
        name: 'Bleed for your Master',
        range: 'touch',
        duration: 'inst',
        dc: 'none',
        sr: false,
        commandRing: 2,
        source: "Sergeant's Command Ring"
      }
      availableSpells.push(master)
      let dominate = {
        id: 29,
        level: 5,
        action: 'full',
        name: 'Dominate Person',
        range: 'touch',
        duration: '7 days',
        dc: 'Will 15',
        sr: true,
        commandRing: 3,
        source: "Sergeant's Command Ring"
      }
      availableSpells.push(dominate)
      let punch = {
        id: 59,
        level: 3,
        action: 'standard',
        name: 'Force Punch',
        range: 'touch',
        duration: 'instantaneous',
        dc: 'Fort 13',
        sr: true,
        limit: 2,
        source: "Ta'al'mon Ancestral Handwraps"
      }
      availableSpells.push(punch)
      if (props.character_info.hardcode.minor === 'Chameleon - Minor'){
        let presti = {id: 13, level: 0, action: "standard", name: "Prestidigitation", range: "10 ft.", duration: "1 hour", dc: "-", source: "Chameleon Aspect Minor Form"}
        availableSpells.push(presti)
      }
    }
    if (pepper){
      let levitate = {
        id: 56,
        level: 2,
        action: "standard",
        name: "Levitate",
        range: "personal",
        duration: "5 minutes",
        dc: "-",
        sr: false,
        limit: 1,
        source: 'Flight Hex'
      }
      availableSpells.push(levitate)
      let fly = {
        id: 57,
        level: 3,
        action: "standard",
        name: "Fly",
        range: "personal",
        duration: "5 minutes",
        dc: "-",
        sr: false,
        source: 'Flight Hex'
      }
      availableSpells.push(fly)
    }
    if (maddox) {
      let enlargePerson = {id: 64, level: 1, action: "full", name: "Enlarge Person", range: "40 ft", duration: "7 minutes", dc: "Fort 16", sr: true, source: 'Staff of Size Alteration'}
      availableSpells.push(enlargePerson)
      let reducePerson = {id: 65, level: 1, action: "full", name: "Reduce Person", range: "40 ft", duration: "7 minutes", dc: "Fort 16", sr: true, source: 'Staff of Size Alteration'}
      availableSpells.push(reducePerson)
      let shrinkItem = {id: 66, level: 3, action: "standard", name: "Shrink Item", range: "touch", duration: "7 days", dc: "Will 18", sr: true, source: 'Staff of Size Alteration'}
      availableSpells.push(shrinkItem)
      let massEnlargePerson = {id: 67, level: 4, action: "full", name: "Mass Enlarge Person", range: "40 ft", duration: "7 minutes", dc: "Fort 19", sr: true, source: 'Staff of Size Alteration'}
      availableSpells.push(massEnlargePerson)
      let massReducePerson = {id: 68, level: 4, action: "full", name: "Mass Reduce Person", range: "40 ft", duration: "7 minutes", dc: "Fort 19", sr: true, source: 'Staff of Size Alteration'}
      availableSpells.push(massReducePerson)
      let fireball3 = {id: 69, level: 3, action: "standard", name: "Fireball 3d6", range: "70 ft", duration: "instantaneous", dc: "Ref 14", sr: true, limit: 4, expendable: true, source: 'Necklace of Fireballs III'}
      availableSpells.push(fireball3)
      let fireball5 = {id: 69, level: 3, action: "standard", name: "Fireball 5d6", range: "70 ft", duration: "instantaneous", dc: "Ref 14", sr: true, limit: 2, expendable: true, source: 'Necklace of Fireballs III'}
      availableSpells.push(fireball5)
      let fireball7 = {id: 69, level: 3, action: "standard", name: "Fireball 7d6", range: "70 ft", duration: "instantaneous", dc: "Ref 14", sr: true, limit: 1, expendable: true, source: 'Necklace of Fireballs III'}
      availableSpells.push(fireball7)
      // has a limit
      // if the last limit is used, expend it by its id not name
       // check fir expendibility, but keep track of limits throughout
       let augury = {id: 74, level: 2, action: "long", name: "Augury", range: "personal", duration: "instantaneous", dc: "-", source: 'Zamantash Delta Chronometer'}
       availableSpells.push(augury)
       let comprehend = {id: 106, level: 1, action: "standard", name: "Comprehend Languages", range: "self", duration: "70 minutes", dc: "-", source: 'Samsaran Magic', limit: 1}
       availableSpells.push(comprehend)
       let deathwatch = {id: 107, level: 1, action: "standard", name: "Deathwatch", range: "self", duration: "70 minutes", dc: "-", source: 'Samsaran Magic', limit: 1}
       availableSpells.push(deathwatch)
       let stabilize = {id: 99, level: 0, action: "standard", name: "Stabilize", range: "40 ft", duration: "instantaneous", dc: "Will 14", sr: true, source: 'Samsaran Magic', limit: 1}
       availableSpells.push(stabilize)
    } else if (robby){
      let dancingLights = {id: 20, level: 0, action: "standard", name: "Dancing Lights", range: "170 ft", duration: "1 minute (D)", dc: "-", limit: 3, source: 'Magical Tail'}
      availableSpells.push(dancingLights)
      let disguiseSelf = {id: 55, level: 1, action: "standard", name: "Disguise Self", range: "you", duration: "70 minutes (D)", dc: "-", limit: 2, source: 'Magical Tail'}
      availableSpells.push(disguiseSelf)
      let charmPerson = {id: 1, level: 1, action: "standard", name: "Charm Person", range: "40 ft", duration: "7 hours", dc: "Will 16", limit: 2, source: 'Magical Tail'}
      availableSpells.push(charmPerson)
      let misdirection = {id: 47, level: 2, action: "standard", name: "Misdirection", range: "40 ft", duration: "7 hours", dc: "Will 17", limit: 2, source: 'Magical Tail'}
      availableSpells.push(misdirection)
      let touchSea = {id: 70, level: 1, action: "standard", name: "Touch of the Sea", range: "self", duration: "7 minutes", dc: "-", limit: 1, dependent: 'Expeditious Retreat', source: "Pirate's Eye Patch"}
      availableSpells.push(touchSea)
      let expeditious = {id: 52, level: 1, action: "standard", name: "Expeditious Retreat", range: "self", duration: "7 minutes", dc: "-", limit: 1, dependent: 'Touch of the Sea', source: "Pirate's Eye Patch"}
      availableSpells.push(expeditious)
      let obscuring = {id: 63, level: 1, action: "standard", name: "Obscuring Mist", range: "20 ft", duration: "7 minutes", dc: "-", redux: 'tempest', cost: 1, max: 3, source: 'Tempest Trishula'}
      availableSpells.push(obscuring)
      let hydraulic = {id: 71, level: 1, action: "standard", name: "Hydraulic Mist", range: "40 ft", duration: "inst", dc: "-", sr: true, redux: 'tempest', cost: 1, max: 3, source: 'Tempest Trishula'}
      availableSpells.push(hydraulic)
      let gustWind = {id: 72, level: 2, action: "standard", name: "Gust of Wind", range: "60 ft", duration: "1 round", dc: "Fort 16", sr: true, redux: 'tempest', cost: 2, max: 3, source: 'Tempest Trishula'}
      availableSpells.push(gustWind)
      let slipstream = {id: 73, level: 2, action: "standard", name: "Slipstream", range: "60 ft", duration: "70 minutes", dc: "Ref 16", redux: 'tempest', cost: 2, max: 3, source: 'Tempest Trishula'}
      availableSpells.push(slipstream)
      let elements = {id: 75, level: 1, action: "move", name: "Endure Elements", range: "self", duration: "1 hour", dc: "-", limit: 1, source: 'Brass Griffin Cloak'}
      availableSpells.push(elements)
    } else if (grackle){
      let deathwatch = {id: 107, level: 1, action: "standard", name: "Deathwatch", range: "30 ft", duration: "70 minutes", dc: "-", source: 'Soul Seer'}
      availableSpells.push(deathwatch)
    }

    if (props.character_info.hardcode.helmsman || props.character_info.hardcode.crew){
      let airBubble = {id: 77, level: 1, action: "standard", name: "Air Bubble", range: "self", duration: "7 minutes", dc: "-", source: "Besmara's Honourable Emissary"}
      availableSpells.push(airBubble)
      let enhanceWater = {id: 78, level: 1, action: "full", name: "Enhance Water", range: "touch", duration: "inst", dc: "-", source: "Besmara's Honourable Emissary"}
      availableSpells.push(enhanceWater)
      let fabricate = {id: 79, level: 1, action: "standard", name: "Fabricate Disguise", range: "self", duration: "inst", dc: "-", source: "Besmara's Honourable Emissary"}
      availableSpells.push(fabricate)
    }


    return availableSpells.map((sp, idx) => {
      const hc = props.character_info.hardcode
      let limits = hc.limits
      let amount
      if (limits && sp.limit){
        let found = limits.find(l => (l.name === sp.name || l.name === sp.dependent))
        if (sp.starting){
          amount = found ? sp.starting - found.cast : sp.starting
        } else {
          amount = found ? sp.limit - found.cast : sp.limit
        }
      } else {
        amount = sp.starting ? sp.starting : sp.limit
      }
      if (amount <= 0 && sp.expendable){
        return null
      } else {
        return (
          <tr className={renderTableStyling(idx)} key={sp.id*3-1}>
            <td>{sp.level}</td>
            <td >
              <button className={className(sp)} onClick={() => dispatchCasting(className(sp), sp)}>
                <strong>
                  Cast{sp.commandRing && ` (${sp.commandRing})`}{sp.limit ? `(${amount}/${sp.limit})` : null}{sp.cost && `(${sp.cost})`}
                </strong>
              </button>
            </td>
            <td className='underline-hover' onClick={() => props.editModal('spell', null, sp.id)}>{sp.name}</td>
            <td>{sp.range}</td>
            <td>{sp.duration}</td>
            <td>{sp.dc}</td>
            <td>{sp.sr ? "Y" : "N"}</td>
            <td>{sp.source}</td>
          </tr>
        )
      }
    })
  }

  const className = (spell) => {
    let action = spell.action
    let commandRing = spell.commandRing
    let limit = spell.limit
    let name = spell.name
    let dependent = spell.dependent
    let redux = spell.redux

    let actions = props.character_info.actions
    let unavailableAction = actions[action]
    unavailableAction = action === 'full' && (actions.standard || actions.move || actions.swift) ? true : unavailableAction
    // are the number of ring points left less than the number of points it costs to cast
    // is the limited number of times you can cast this spell greater or equal to the number of times you already cast it?
    if (commandRing || limit){
      // if limited spells have already been cast, return true, otherwise, there have been no limited spell cast
      let unableToCast = props.character_info.hardcode.limits
      if (unableToCast){
        // find that spell, and see if the max limit is less or equal to the number of times its been cast
        // if it is maxed out, you cannot-cast it
        unableToCast = !!props.character_info.hardcode.limits.find(l => (l.name === name || l.name === dependent) && limit <= l.cast)
      }
      if (props.character_info.hardcode.ringPoints < commandRing || unableToCast){
        return 'cannot-cast'
      }
    }
    if (redux && !unavailableAction){
      // if spell has a redux and is it available to cast
      // if the remainder (maximum minus number cast) is greater or equal to cost
      // you can cast (unavailableAction is false)
      // else, you cannot (unavailableAction is true)
      unavailableAction = spell.max - (props.character_info.hardcode[redux] || 0) >= spell.cost ? false : true
    }
    return unavailableAction ? 'cannot-cast' : action
  }

  const dispatchCasting = (action, spell) => {
    let limit = spell.limit
    let name = spell.name
    let starting = spell.starting

    let enlargePerson = (name === 'Enlarge Person' && (!props.character_info.hardcode.sizeStaff || props.character_info.hardcode.sizeStaff <= 9))
    let reducePerson = (name === 'Reduce Person' && (!props.character_info.hardcode.sizeStaff || props.character_info.hardcode.sizeStaff <= 9))
    let shrinkItem = (name === 'Shrink Item' && (!props.character_info.hardcode.sizeStaff || props.character_info.hardcode.sizeStaff <= 8))
    let massEnlargePerson = (name === 'Mass Enlarge Person' && (!props.character_info.hardcode.sizeStaff || props.character_info.hardcode.sizeStaff <= 7))
    let massReducePerson = (name === 'Mass Reduce Person' && (!props.character_info.hardcode.sizeStaff || props.character_info.hardcode.sizeStaff <= 7))
    if (action !== 'cannot-cast'){
      if (enlargePerson || reducePerson || shrinkItem || massEnlargePerson || massReducePerson){
        props.dispatch({type: 'TRIGGER ACTION', action})
      } else if (!enlargePerson && !reducePerson && !shrinkItem && !massEnlargePerson && !massReducePerson){
        if (action !== 'long'){
          props.dispatch({type: 'TRIGGER ACTION', action})
        }
      }
    }
    if (limit){
      renderLimits(name, limit, starting)
    }
    if (name === "Fly"){
      props.dispatch({type: 'I CAN FLY'})
    }
    if (enlargePerson || reducePerson){
      props.dispatch({type: 'SIZE STAFF', amount: 1})
    }
    if (shrinkItem){
      props.dispatch({type: 'SIZE STAFF', amount: 2})
    }
    if (massEnlargePerson || massReducePerson){
      props.dispatch({type: 'SIZE STAFF', amount: 3})
    }
    if (spell.redux === 'tempest'){
      props.dispatch({type: 'TEMPEST', amount: spell.cost})
    }
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-general" : "odd-row-general"
  }

  const renderLimits = (name, limit, startingValue) => {
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

  return (
    <table>
      <thead>
        <tr >
          <th>Lvl</th>
          <th>Action</th>
          <th>Name</th>
          <th>Range</th>
          <th>Duration</th>
          <th>Hit / DC</th>
          <th>SR</th>
        </tr>
      </thead>
      <tbody>
        {spells().filter(sp => sp !== null)}
      </tbody>
    </table>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
    spells: state.spells
  }
}

export default connect(mapStatetoProps)(HardcodeSpells)
