import React from 'react'

import Tab from '../components/character_show/tab'

const CampaignShowTabs = props => {
	return (
		<span className="tab-list">
			<Tab label="Characters" renderTabClick={props.renderTabClick} activeTab={props.activeTab} />
			<Tab label="Details" renderTabClick={props.renderTabClick} activeTab={props.activeTab} />
			<Tab label="Creatures" renderTabClick={props.renderTabClick} activeTab={props.activeTab} />
		</span>
	)
}

export default CampaignShowTabs
