import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'
import localhost from '../localhost'

import MagicItemSummary from '../components/magic_item_summary'

class MagicItemModal extends React.Component {

  findItem = () => {
    return this.props.character.character_magic_items.find(cmi => cmi.id === this.props.cmiId)
  }

  render(){
    return (
      <Portal>
      <div className="page-dimmer" onClick={this.props.clickOut}>
        <div id='spell-desc' name="background">
          <MagicItemSummary item={this.findItem().magic_item} cmi={this.findItem()} editModal={this.props.editModal} exitModal={this.props.exitModal}/>
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

export default connect(mapStatetoProps)(MagicItemModal)
