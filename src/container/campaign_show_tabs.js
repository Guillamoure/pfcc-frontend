import React from 'react'

import Tab from '../components/character_show/tab'

const CampaignShowTabs = props => {
	let encounterTab = null
	if (props.encounter.id){
		encounterTab = <Tab label={props.encounter.name} renderTabClick={props.renderTabClick} activeTab={props.activeTab}/>
	}
	return (
		<span className="tab-list">
			<Tab label="Characters" renderTabClick={props.renderTabClick} activeTab={props.activeTab} />
			<Tab label="Item Search" renderTabClick={props.renderTabClick} activeTab={props.activeTab} />
			<Tab label="Details" renderTabClick={props.renderTabClick} activeTab={props.activeTab} />
			<Tab label="Creatures" renderTabClick={props.renderTabClick} activeTab={props.activeTab} />
			<Tab label="Encounters" renderTabClick={props.renderTabClick} activeTab={props.activeTab} />
			{encounterTab}
		</span>
	)
}

export default CampaignShowTabs
