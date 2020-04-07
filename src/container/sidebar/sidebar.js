import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import Attack from './attack'

const SideBar = props => {

  let {position, description, content} = props.sidebar

  const [isThisBeingRemoved, setRemoval] = React.useState('slide-in')
  const [isThisBeingRemovedTab, setRemovalTab] = React.useState('slide-in-folder-tab')
  const [style, setStyle] = React.useState(null)
  const [exitStyle, setExitStyle] = React.useState(null)

  // add a lifecycle method
  // after the animation (set timeout, see below for inspiration)
  // remove classes so there less clutter on the dom

  if (position === 'bottom'){
    if (!style){
      setStyle({width: '98%', height: '50%', bottom: '0px', zIndex: '1'})
      setExitStyle({zIndex: '2', bottom: `${window.innerHeight/2 + 1}px`, width: '20%', textAlign: 'center', borderBottom: 'none', left: '10%'})
    }
  }

  const exiting = (e) => {
    e.preventDefault()
    setRemoval('slide-out')
    setRemovalTab('slide-out-folder-tab')
    setTimeout(() => setStyle({display: 'none'}), 775)
    setTimeout(() => setExitStyle({display: 'none'}), 775)
    setTimeout(() => {
      props.editSidebar(false, 'left', null)
    }, 800)

  }

  return (
    <>
      <aside id='sidebar' className={isThisBeingRemoved} style={style}>
      <div id='sidebar-exit' className={isThisBeingRemovedTab} style={exitStyle} onClick={exiting}><FontAwesomeIcon icon={faChevronDown}/></div>
        {description === 'attack' && <Attack content={content}/>}
      </aside>
    </>
  )
}

export default (SideBar)
