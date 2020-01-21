import React from 'react'
import { connect } from 'react-redux'
import NewNote from '../notes/new_note'
import Note from '../notes/note'

const Notes = props => {


  return (
    <div>
      hhhhhh
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Notes)
