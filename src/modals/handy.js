import React from 'react'
import Portal from '../portal'

const HandyModal = props => {

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <h3>Contents</h3>
          <ul>
            <li>Something</li>
          </ul>
        </div>
      </div>
    </Portal>
  )
}

export default HandyModal
