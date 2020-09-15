import React from 'react'

import Tab from '../components/character_show/tab'

const NotificationTabs = props =>  {

  const {renderTabClick, activeTab} = props

	// <Tab label="Skills" renderTabClick={renderTabClick} activeTab={activeTab}/>
	// <Tab label="Equipment" renderTabClick={renderTabClick} activeTab={activeTab}/>
  return(
    <nav id="new-character-tab" className='tab-list'>
      <Tab label="Details" renderTabClick={renderTabClick} activeTab={activeTab}/>
      <Tab label="Ancestry" renderTabClick={renderTabClick} activeTab={activeTab}/>
      <Tab label="Class" renderTabClick={renderTabClick} activeTab={activeTab}/>
    </nav>
  )

}

export default NotificationTabs
