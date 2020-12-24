import React from 'react'

import Tab from '../components/character_show/tab'

const CharacterShowTabs = (props) => {
	return (
		<span className='tab-list'>
			<Tab label="Combat" activeTab={props.activeTab} renderTabClick={props.renderTabClick}/>
			<Tab label="Adventure" activeTab={props.activeTab} renderTabClick={props.renderTabClick}/>
			<Tab label="Character" activeTab={props.activeTab} renderTabClick={props.renderTabClick}/>
		</span>
	)
}

export default CharacterShowTabs
