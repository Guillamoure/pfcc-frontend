import React from 'react'
import _ from 'lodash'
import localhost from '../../localhost'
import { modalAction } from '../../utils/action_creator/popups'
import { replaceCharacterAction } from '../../utils/action_creator/character'
import { postFetch } from '../../utils/fetches'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'

const AddCharacterEquipment = props => {

	let character = useSelector(state => state.character)

	const [searchString, updateSearchString] = React.useState("")
	const [loading, setLoading] = React.useState(false)
	const [items, setItems] = React.useState([])
	const [selectedItem, updateSelectedItem] = React.useState(null)
	const [customData, updateCustomData] = React.useState({
		name: "",
		description: "",
		masterwork: false
	})

	const searchBar = () => {
		console.log("searchString hook", searchString)
		return (
			<>
				<input type="text" value={searchString} onChange={(e) => updateSearchString(e.target.value)} onKeyUp={debouncer} style={{marginRight: "1%"}}/>
				{loading && displayDice()}
			</>
		)
	}

	const displayDice = () => {
		// let array = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix]
		// let index = 5
		// setInterval(() => {
		// 	console.log("I am inside the loop, here is the index", index)
		// 	index = index === 5 ? 0 : index + 1
		// }, 200)
		return <FontAwesomeIcon id="loading-dice-search" icon={faDiceD20} size="2x"/>
	}


	const debouncer = () => {
		const handle = _.debounce(fetchItems, 800)
		handle()
		if (searchString.length){
			setLoading(true)
			// this.setState({loading: true, selectedItem: null})
		} else {
			setLoading(false)
			// this.setState({loading: false})
		}
	}

	const fetchItems = () => {
		if (searchString.length){
			fetch(`${localhost}/api/v1/item_search?q=${searchString}`)
				.then(r => r.json())
				.then(data => {
					setItems(data)
					setLoading(false)
					// this.setState({items: data, loading: false, didSearch: true})
				})
		} else {
			setItems([])
		}
	}

	const renderItems = () => {
		return items.map(i => {
			let modalKeyWord = "item"
			let obj = i
			let name = i.name
			if (i.weapon_type){
				modalKeyWord = "weapon"
				obj = {weapon: i}
			}
			else if (i.max_dex_bonus){
				modalKeyWord = "armor"
				obj = {armor: i}
			}
			else if (i.affliction_type){modalKeyWord = "poison"}
			else if (i.slot){modalKeyWord = "magicItem"}
			return (
				<li>
					<span>{i.name} </span>
					<span onClick={() => modalAction(modalKeyWord, obj, {name})}><button>Info</button></span>
					<span onClick={() => updateSelectedItem({item: i, type: modalKeyWord})}><button>+</button></span>
				</li>
			)
		})
	}

	const createCharacterItem = () => {
		let formData = (
			<>
				<label htmlfor="name">
					Is there a specific name for this item? <input type="text" id="name" name="name" onChange={formHandler} value={customData.name}/>
				</label><br/>
				<label htmlfor="description">
					Is there a detailed description for this item? <input type="text" id="description" name="description" onChange={formHandler} value={customData.description}/>
				</label><br/>
				<label htmlfor="masterwork">
					Is this item a masterwork or handcrafted item? <input type="checkbox" id="masterwork" name="masterwork" onChange={formHandler} value={customData.masterwork}/>
				</label><br/>
			</>
		)
		return (
			<>
				<h3>{selectedItem.item.name}</h3>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
				<form onSubmit={renderSubmit}>
					{(selectedItem.type === "weapon" || selectedItem.type === "armor") && formData}
					<button>Add {customData.name || selectedItem.item.name}</button>
				</form>
			</>
		)
	}

	const formHandler = e => {
		let duplicateObj = {...customData}
		let key = e.target.name
		let value = e.target.value
		if (key === "name" || key === "description"){
			duplicateObj[key] = value
		} else if (key === "masterwork"){
			duplicateObj.masterwork = !duplicateObj.masterwork
		}
		updateCustomData(duplicateObj)
	}

	const renderSubmit = (e) => {
		e.preventDefault()

		let body = {
			...customData,
			known: true,
			discovered: true,
			item_id: selectedItem.item.id,
			character_id: character.id
		}
		let url = "character_"
		url += selectedItem.type === "magicItem" ? "magic_item" : selectedItem.type
		url += "s"

		postFetch(url, body)
			.then(data => {
				if (selectedItem.type === "item"){
					replaceCharacterAction("items", [...character.items, data])
				} else {
					replaceCharacterAction(url, [...character[url], data])
				}
				modalAction(selectedItem.type, data)
				updateSelectedItem(null)
				updateSearchString("")
			})
	}

	return (
		<section>
			{searchBar()}
			{!selectedItem && renderItems()}
			{selectedItem && createCharacterItem()}
		</section>
	)
}

export default AddCharacterEquipment
