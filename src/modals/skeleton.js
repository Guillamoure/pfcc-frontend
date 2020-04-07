import React from 'react'
import Portal from '../portal'

import HPChanges from '../components/hp_changes'

const ModalSkeleton = (props) => {

  const renderComponent = (modal) => {
    switch(modal){
      case 'hitPoints':
        return <HPChanges exitModal={props.exitModal} editModal={props.editModal} clickOut={props.clickOut} renderEdit={props.renderEdit}/>
    }
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          {renderComponent(props.modal)}
        </div>
      </div>
    </Portal>
  )

}

export default ModalSkeleton
