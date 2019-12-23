import React from 'react'
import { connect } from 'react-redux'

const Rings = props => {
  const rings = []
  const name = props.character.name

  if (name === 'Cedrick'){
    const sergeant = {
      id: 1001,
      name: "Sergeant's Command Ring",
      description: `${props.character_info.hardcode.ringPoints}/3 points. Recharge 1 pt a day if you have helped someone achieve a goal the previous day`,
      aura: "moderate enchantment",
      price: "12000 gp",
      weight: 0,
      activatable: true
    }
    rings.push(sergeant)
    const feather = {
      id: 1002,
      name: "Ring of Feather Fall",
      description: <span>Acts exactly like a <em className='underline-hover' onClick={() => props.editModal('spell', null, 18)}>feather fall</em> spell, activated immediately if the wearrer falls more than 5 ft.</span>,
      aura: "faint transmutation",
      price: "2200 gp",
      weight: 0,
      activatable: false
    }
    rings.push(feather)
  }

  if (name === 'Persephone'){
    const storing = {
      id: 2003,
      name: "Ring of Spell Storing",
      description: `A spellcaster can cast any spells into the ring, so long as the total spell levels do not add up to more than 5. Metamagic versions of spells take up storage space equal to their spell level modified by the metamagic feat. A spellcaster can use a scroll to put a spell into the ring of spell storing. The user need not provide any material components or focus to cast the spell, and there is no arcane spell failure chance for wearing armor (because the ring wearer need not gesture). The activation time for the ring is the same as the casting time for the relevant spell, with a minimum of 1 standard action.`,
      aura: "moderate evocation",
      price: "50000 gp",
      weight: 0,
      activatable: false,
    }
    rings.push(storing)
    const autumn = {
      id: 21004,
      name: "Ring of Autumn",
      description: <ul><li><strong>Summon Pumpkin</strong> - Fine (1), Diminutive (2), Tiny (3), Small (4)</li><li><strong>Cover with leaves</strong> - per 5 ft square (1)</li><li><strong>Location smells of spice blend</strong> - 60 ft cube (3), 5 ft square (1)</li><li><strong>Chilly Breeze</strong> - 100 ft cube (5)</li><li><strong>Change color of object</strong> - up to a medium object (2): auburn, brown, orange, ochre, raspberry, etc. (<em>Note: Magic Items get a Fortitude Save</em>)</li></ul>,
      aura: "faint universal",
      price: "250 gp",
      weight: 0,
      activatable: true,
      limit: 10,
      action: 'standard'
    }
    rings.push(autumn)
  }

  if (name === 'Nettie'){
    const kyton = {
      id: 3005,
      name: "Kyton Ring",
      description: <span><p>This rusty iron ring looks like a twisted chain.</p><p>On command, the ring can produce a rusty, clanky length of iron chain (hardness 10, 5 hp, break DC 26). The ring can create no more than 100 feet of chain in this way. This total length can be split among many uses, but must be spent in 10-foot increments. When the ring’s daily allotment of chain is renewed, any previously conjured chain rusts away.</p><p>Once per day as a standard action, the user can shoot a chain from the ring as though it were a grappling hook, except the range increment is 50 feet. Whatever length of chain she shoots out counts against ring’s daily allotment.</p></span>,
      aura: "moderate conjuration",
      price: "1000 gp",
      weight: 0,
      activatable: false,
    }
    rings.push(kyton)
    const swimming = {
      id: 3006,
      name: "Ring of Swimming",
      description: 'This silver ring usually has fishlike designs and motifs etched into the band. It continually grants the wearer a +5 competence bonus on Swim checks.',
      aura: "faint transmutation",
      price: "2500 gp",
      weight: 0,
      activatable: false,
    }
    rings.push(swimming)
    const psychopomp = {
      id: 3007,
      name: "Ring of Summoning Affinity (Psychopomp)",
      description: 'This silver ring is marked with a skull emblem. If the wearer can cast summon monster spells, the wearer adds nosoi to the 3rd-level list of monsters he can summon with those spells, adds catrina to the 4th-level list, adds vanth to the 6th-level list, and adds morrigna to the 9th-level list. Also, once per day on command the wearer can use this ring to summon a nosoi, as if by the summon monster III spell.',
      aura: "faint conjuration",
      price: "7600 gp",
      weight: 0,
      activatable: true,
      limit: 1,
      action: 'full'
    }
    rings.push(psychopomp)
  }

  const renderClick = (name, limit, startingValue) => {
    if (name === "Sergeant's Command Ring"){
      props.editModal('command ring')
    }
    if (name === "Ring of Autumn"){
      props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})
    }
    if (name === "Ring of Summoning Affinity (Psychopomp)"){
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
    if (name === "Ring of Summoning Affinity (Psychopomp)"){
      props.dispatch({type: 'TRIGGER ACTION', action: 'full'})
    }
  }

  const renderRings = () => {
    return rings.map((r, idx) => {
      let limits = props.character_info.hardcode.limits
      let amount
      if (limits && r.limit){
        let found = limits.find(l => l.name === r.name)
        if (r.starting){
          amount = found ? r.starting - found.cast : r.starting
        } else {
          amount = found ? r.limit - found.cast : r.limit
        }
      } else {
        amount = r.starting ? r.starting : r.limit
      }
      return (
        <tr className={renderTableStyling(idx)} key={r.id*3-1}>
          <td>{r.activatable ?  <button className={r.action && !props.character_info.actions[r.action] ? r.action : 'cannot-cast'} onClick={() => renderClick(r.name, r.limit, r.starting)}>Use</button> : null}</td>
          <td><strong>{r.name}</strong>{r.limit ? `(${amount}/${r.limit})` : null}</td>
          <td>{r.weight} lb{(r.weight > 1 || r.weight === 0) ? "s" : null}</td>
          <td>{r.price}</td>
          <td>{r.description}</td>
        </tr>
      )
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-rings" : "odd-row"
  }

  return (
    <React.Fragment>
      {renderRings()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Rings)
