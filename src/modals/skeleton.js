import React from 'react'
import Portal from '../portal'
import { connect } from 'react-redux'
import { exitModal } from '../dispatch'

import HPChanges from '../components/hp_changes'
import Armor from '../components/armor_summary'

const ModalSkeleton = (props) => {

  const renderComponent = (modal) => {
    let m = modal
    if (modal !== "hitPoints"){m = modal.detail}
    switch(m){
      case 'hitPoints':
        return <HPChanges exitModal={props.exitModal} editModal={props.editModal} clickOut={props.clickOut} renderEdit={props.renderEdit}/>
      case 'armor':
        return <Armor characterArmor={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
      default:
        console.log("Hey, It works!")
        break
    }
  }

  const clickOut = (e) => {
    if (e.target.classList[0] === 'page-dimmer'){
      exitModal()
    }
  }

  const exitModal = () => {
    props.dispatch(props.exitModal())
  }

  console.log(props)
  return (
    <Portal>
      <div className="page-dimmer" onClick={clickOut}>
        <div className="edit-form" name="background">
          {renderComponent(props.modal)}
        </div>
      </div>
    </Portal>
  )

}

const mapStatetoProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    exitModal,
    dispatch
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(ModalSkeleton)
