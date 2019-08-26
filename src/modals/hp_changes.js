import React from 'react'
import Portal from '../portal'
import _ from 'lodash'
import { connect } from 'react-redux'

class HPChanges extends React.Component {

  state = {

  }
  render() {
    return (
      <Portal>
      <div className="page-dimmer" onClick={this.props.clickOut}>
        <div className="edit-form" name="background">
          Oof
        </div>
      </div>
      </Portal>
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

export default connect(mapStatetoProps)(HPChanges)
