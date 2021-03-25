import React from 'react'

import ItemSearch from './item_search'
import PotionsScrollsWandsCreator from './potions_scrolls_wands_creator'

const ItemsManager = props => {

	const [selectedComponent, setSelectedComponent] = React.useState("itemSearch")

	const renderButtons = () => {

		const handleClick = (name) => {
			if (selectedComponent !== name){
				setSelectedComponent(name)
			}
		}

		return (
			<nav>
				<button onClick={() => handleClick("itemSearch")}>Item Search</button>
				<button onClick={() => handleClick("potionsScrollsWands")}>Potions, Scrolls, Wands</button>
			</nav>
		)
	}

	const renderSelectedComponent = () => {
		switch(selectedComponent){
			case "itemSearch":
				return <ItemSearch campaign={props.campaign}/>
			case "potionsScrollsWands":
				return <PotionsScrollsWandsCreator campaign={props.campaign}/>
			default:
				return null
		}
	}

	return (
		<main>
			{renderButtons()}
			{renderSelectedComponent()}
		</main>
	)
}

export default ItemsManager
