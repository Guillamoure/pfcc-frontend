import React from 'react'
import { connect } from 'react-redux'

const NewNote = props => {


  return (
    <div>
      nnnnnn
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(NewNote)
