import React from 'react'
import { connect } from 'react-redux'

class PrepareSpells extends React.Component {
  render(){
    return (
      <div>
        <p>Did it work?</p>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(PrepareSpells)
