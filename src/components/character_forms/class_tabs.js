import React from 'react'
import Tab from '../character_show/tab'

const ClassTabs = props => {
	
	const tabOptions = () => {
		return (
			<>
				<Tab label="Base Features" renderTabClick={props.renderTabClick} activeTab={props.activeTab}/>
				<Tab label="Archetypes" renderTabClick={props.renderTabClick} activeTab={props.activeTab}/>
			</>
		)
	}

	return(
		<span className='tab-list'>
			{tabOptions()}
		</span>
	)
}

export default ClassTabs
