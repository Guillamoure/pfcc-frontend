import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { faFistRaised } from '@fortawesome/free-solid-svg-icons'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'

const MobileTabs = props => {

  const isThisTabActive = (tab) =>{
    let className = 'mobile-tab-li'
    if (tab === props.mobileTab){
      className += ' mobile-active-tab'
    }
    return className
  }

  return (
    <nav id='mobile-tabs'>
      <ul style={{display: 'flex', padding: 0, margin: 0}}>
        <li className={isThisTabActive('adventure')} onClick={() => props.changeActiveMobileTab('adventure')}><FontAwesomeIcon icon={faMap} size='3x'/></li>
        <li className={isThisTabActive('combat')} onClick={() => props.changeActiveMobileTab('combat')}><FontAwesomeIcon icon={faFistRaised} size='3x'/></li>
        <li className={isThisTabActive('character')} onClick={() => props.changeActiveMobileTab('character')}><FontAwesomeIcon icon={faUserAlt} size='3x'/></li>
        <li className={isThisTabActive('settings')} onClick={() => props.changeActiveMobileTab('settings')}><FontAwesomeIcon icon={faDiceD20} size='3x'/></li>
      </ul>
    </nav>
  )
}

export default MobileTabs
