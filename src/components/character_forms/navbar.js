import React from 'react'

const Navbar = props => {

	const renderTabs = () => {
		return (
			<ul>
				{renderTab("Home")}
				{renderTab("Ancestry")}
				{renderTab("Class")}
				{renderTab("Abilities")}
				{renderTab("Skills")}
				{renderTab("Details")}
				{renderTab("Gold & Equipment")}
				{renderTab("Create Character")}
			</ul>
		)
	}

	const renderTab = (name) => {
		let style = props.activeTab === name ? "character-creation-tab active-tab" : "character-creation-tab"
		return (
			<li className={style} onClick={() => props.renderTabClick(name)}>{name}</li>
		)
	}

	return (
		<nav id="character-creation-tabs">
			{renderTabs()}
		</nav>
	)
}

export default Navbar
