import React from 'react'
import { connect, useDispatch } from 'react-redux'
import _ from 'lodash'

import { changeAmmo } from '../../dispatch'

const Attack = props => {

  const dispatch = useDispatch()


  let {characterWeapon: cw, critical, additionalInfo} = props.content

  let weapon = cw.weapon

  let name = cw.name === "" ? weapon.name : cw.name
  let damage = weapon.num_of_dice + "d" + weapon.damage_dice + " " + weapon.damage_type
  if (weapon.double_weapon){
    damage += "/" + weapon.double_num_of_dice + "d" + weapon.double_damage_dice + " " + weapon.double_damage_type
  }

  let range = weapon.range ? weapon.range + " ft" : null

  let validAmmo = null
  if (weapon.ammunition_type){
    validAmmo = props.character.character_weapons.filter(cw => cw.weapon.ammunition && cw.weapon.ammunition_type === weapon.ammunition_type)
    // make a collection select of all weapons
    // need event to handle changing collection select
    // makes a fetch, and updates redux

  }

  const ammos = () => {
    // searching through redux because this select tag's value isn't updating when I update redux
    // since it's getting it's data from the a different part of redux
    let characterWeapon = props.character.character_weapons.find(charW => charW.id === cw.id)
    return (
      <select className="mobile-dropdown" value={`${characterWeapon.character_weapon_ammunition_id}`} onChange={(e) => dispatch(changeAmmo(cw, e.target.value))}>
        <option value="">No Ammo</option>
        {validAmmo.map(a => <option value={a.id}>{a.name === "" ? a.weapon.name : a.name} ({a.ammunition_amount})</option>)}
        {(cw.weapon.name === "Sling" || cw.weapon.name === "Halfling Sling Staff") && <option value="0">Improvised</option>}
      </select>
    )
  }

  return (
    <section style={{padding: '2%'}}>
      <ul style={{listStyleType: 'none', paddingLeft: '0', margin: '1%'}}>
        <li>{name}</li>
        <li>{weapon.category} {weapon.proficiency} Weapon</li>
        <li>{damage} ({critical}){range && " | Range: " + range}</li>
        {validAmmo && ammos()}
        <li><u>Details</u>:</li>
        {additionalInfo.map(ai => <li>- {ai.name}: {ai.tooltip}</li>)}
        {weapon.weapon_qualities.map(wq => <li>- {_.capitalize(wq.name)}: {wq.description}</li>)}
      </ul>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Attack)
