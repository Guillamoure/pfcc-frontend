import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

import WeaponSummary from '../components/weapon_summary'

class WeaponModal extends React.Component {

  findItem = () => {
    return this.props.character.character_weapons.find(cw => cw.id === this.props.characterItemID)
  }

  render(){
    return (
      <Portal>
      <div className="page-dimmer" onClick={this.props.clickOut}>
        <div id='spell-desc' name="background">
          <WeaponSummary item={this.findItem().weapon} cw={this.findItem()} editModal={this.props.editModal} exitModal={this.props.exitModal}/>
        </div>
      </div>
      </Portal>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(WeaponModal)
