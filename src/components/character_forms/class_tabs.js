import React from 'react'
import Tab from '../character_show/tab'

const ClassTabs = props => {

	const tabOptions = () => {
		let array = ["Base Features", "Archetypes"]
		if (props.optionsTabName){
			array.push(props.optionsTabName)
		}
		return array.map(lbl => {
			return <Tab label={lbl} renderTabClick={props.renderTabClick} activeTab={props.activeTab}/>
		})
	}

	return(
		<span className='tab-list'>
			{tabOptions()}
		</span>
	)
}

export default ClassTabs
