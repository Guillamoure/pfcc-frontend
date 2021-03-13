import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../localhost'
import { th } from '../fuf'

import UserItemAdjustment from './user_item_adjustment'

const ArmorSummary = props => {

  const renderDescription = (desc) => {
    let descArray = desc.split("\n\n")
    return descArray.map((para, idx) => {
      return <p key={idx*3+1}>{para}</p>
    })
  }

  const ca = props.characterArmor

  // const renderMI = () => {
  //   return (
  //     <React.Fragment>
  //       {props.cw.name ? <h3 style={{display: 'inline-block'}}><em>{props.cw.name}</em> ({props.cw.masterwork && 'mwk '}{item.name})</h3> : <h3 style={{display: 'inline-block'}}>{item.name}</h3>}
  //
  //       <UserItemAdjustment characterItem={props.cw} item={props.item} exitModal={props.exitModal} editModal={props.editModal} url='character_weapon'/>
  //
  //       <div>{item.category} {item.proficiency} {item.weapon_type} Weapon; <strong>Price</strong> {item.price_in_gp} gp; <strong>Weight</strong> {item.weight} lb;</div>
  //
  //       <div><strong>Damage</strong> {item.num_of_dice}d{item.damage_dice} {item.damage_type}; {item.critical_range !== 20 ? item.critical_range + `-20/` : null}x{item.critical}; {!!item.range && <><strong>Range</strong> {item.range} ft.</>}</div>
  //
  //       <br/>
  //       <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
  //
  //       {!!props.cw.description && <><em>{renderDescription(props.cw.description)}</em><br/></>}
  //
  //       {renderDescription(item.description)}
  //
  //     </React.Fragment>
  //   )
  // }

  const renderArmor = () => {
    let armorName = ca.masterwork ? `mwk ${ca.armor.name}` : ca.armor.name
    let name = ca.name ? <h3 style={{display: 'inline-block'}}><em>{ca.name}</em> (armorName)</h3> : <h3 style={{display: 'inline-block'}}>{armorName}</h3>

    return (
      <React.Fragment>
        {name}
        {ca.name && <UserItemAdjustment characterItem={ca} item={ca.armor} url='character_armor'/>}
        <div>{ca.armor.proficiency} {ca.armor.bonus_type}; <strong>Price</strong> {ca.armor.price_in_gp} gp; <strong>Weight</strong> {ca.armor.weight} lb;</div>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
				{ca.description && <div><em>{renderDescription(ca.description)}</em></div>}
				<div>{renderDescription(ca.armor.description)}</div>
      </React.Fragment>
    )
  }

  console.log('Armor Info', ca)
  return (
    <div>
      {renderArmor()}
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(ArmorSummary)
