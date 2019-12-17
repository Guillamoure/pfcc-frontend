import React from 'react'
import { connect } from 'react-redux'

import Rings from './equipment/rings'
import Legendary from './equipment/legendary'

const Equipment = props => {

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <Legendary editModal={props.editModal}/>
          <Rings editModal={props.editModal}/>
        </tbody>
      </table>
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
