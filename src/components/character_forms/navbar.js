import React from 'react'

const Navbar = props => {

	const renderTabs = () => {
		// {renderTab("Skills")}
		// {renderTab("Feats")}
		// {renderTab("Gold & Equipment")}
		return (
			<ul>
				{renderTab("Home")}
				{renderTab("Ancestry")}
				{renderTab("Class")}
				{renderTab("Ability Scores")}
				{renderTab("Details")}
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
