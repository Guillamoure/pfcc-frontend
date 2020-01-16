import React from 'react'
import { connect } from 'react-redux'

import Rings from './equipment/rings'
import Legendary from './equipment/legendary'
import Weapons from './equipment/weapons'
import Magic from './equipment/magic'
import Poisons from './equipment/poisons'
import Armor from './equipment/armor'

const Equipment = props => {

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <Legendary editModal={props.editModal}/>
          <Magic editModal={props.editModal}/>
          <Rings editModal={props.editModal}/>
          <Weapons editModal={props.editModal}/>
        </tbody>
      </table>
      <Armor editModal={props.editModal} renderTooltip={props.renderTooltip} mouseOut={props.mouseOut}/>
      <Poisons editModal={props.editModal}/>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Equipment)
