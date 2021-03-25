import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import SpellDescription from '../../spell_description'
import { getFetch, postFetch } from '../../../utils/fetches'
import { sortedSpellsByLevelAndName } from '../../../utils/fuf'
import { sendCampaignWebsocket } from '../../../utils/websocket/campaign'

const PotionsScrollsWandsCreator = props => {

	const { spells } = useSelector(state => state)

	const [itemType, setItemType] = React.useState("scroll")
	const [viewedSpells, setViewedSpells] = React.useState([])
	const [potionsSpells, setPotionsSpells] = React.useState([])
	const [selectedSpell, setSelectedSpell] = React.useState({})
	const [spellDetails, setSpellDetails] = React.useState({})
	const [customData, updateCustomData] = React.useState({
		caster_level: 1,
		potion_or_oil: "potion",
		scroll_type: "arcane",
		spell_level: 0,
		charges: 50,
		name: "",
		description: "",
		known: false,
		discovered: false
	})
	const [searchTerm, setSearchTerm] = React.useState("")
	const [loading, toggleLoading] = React.useState(false)
	const [searchAttempt, updateSearchAttempt] = React.useState({})

	React.useEffect(() => {
		if (itemType === "potion" && potionsSpells.length === 0){
			getFetch("potion_spells")
				.then(data => {
					setPotionsSpells(data)
					console.log("got em")
				})
		}
	}, [itemType])

	const createFetch = (e, character_id) => {
		e.preventDefault()
		let body = {
			...customData,
			character_id,
			spell_id: selectedSpell.id
		}
		postFetch(`character_${itemType}s`, body)
			.then(data => {
				if (data.status === 404 || data.status ===  500){
	        console.log(data)
	      } else {
	        updateCustomData({caster_level: 1, potion_or_oil: "potion",	known: false, discovered: false, spell_level: 0, scroll_type: "arcane", charges: 50, name: "", description: ""})
					setSelectedSpell({})
					//send the item, itemType to the character if they are online
					sendCampaignWebsocket({message: "Your DM gave you an item!", reciever_id: character_id, itemType, data}, {dm: true}, {toggleable: true})
	      }
			})
	}

	const renderOptions = () => {
		return (
			<>
				<label>
					<input type="radio" name="itemType" value="scroll" checked={itemType === "scroll"} onChange={() => setItemType("scroll")}/>
					Scroll
				</label>
				<label>
					<input type="radio" name="itemType" value="potion" checked={itemType === "potion"} onChange={() => setItemType("potion")}/>
					Potion
				</label>
				<label>
					<input type="radio" name="itemType" value="Wand" checked={itemType === "wand"} onChange={() => setItemType("wand")}/>
					Wand
				</label>
			</>
		)
	}

	const findSpell = () => {
		if (itemType === "potion"){
			return displaySpells(potionsSpells)
		} else {
			return (
				<div>
					<label>
						Item Search:
						<input type="text" name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyUp={debouncer}/>
					</label>
					{displaySpells(viewedSpells)}
				</div>
			)
		}
	}

	const fetchSpells = () => {
		if (searchTerm.length){
			getFetch(`spells?q=${searchTerm}`)
				.then(data => {
					setViewedSpells(data)
					toggleLoading(false)
				})
		} else {
			setViewedSpells([])
		}
	}

	// const handle = _.debounce(fetchSpells, 800)

	const debouncer = () => {
		// handle()
		// everything on the right side of this assignment is a callback
		// it won't be activated until it gets evoked
		let search = _.debounce(fetchSpells, 800)

		// we store previous attempts here
		updateSearchAttempt(previousAttempt => {
			// and cancel them if they exist
			if (previousAttempt.cancel){
				previousAttempt.cancel()
			}
			return search
		})

		if (searchTerm.length){
			toggleLoading(true)
			setSelectedSpell({})
			// after setting an attempt in our useState
			// we evoke it
			// which may get canceled if the above code is executed again
			search()
		} else {
			toggleLoading(false)
		}
	}

	const displaySpells = (spellArray) => {
		let spellsWithSpellLevel = spellArray.map(sp => {
			let lowestLevel = sp.spell_list_spells.map(sls => sls.spell_level).sort()[0]
			return {...sp, spell_level: lowestLevel}
		})
		let sortedSpells = sortedSpellsByLevelAndName(spellsWithSpellLevel)
		let spellElements = sortedSpells.map(sp => {
			return (
				<tr>
					<td>{sp.spell_level}</td>
					<td className="underline-hover" onClick={() => setSpellDetails(sp)}>{sp.name}</td>
					<td><button onClick={() => setSelectedSpell(sp)}>Select</button></td>
				</tr>
			)
		})

		return (
			<aside>
				<table>
					<thead>
						<tr>
							<th>Lvl</th>
							<th>Name</th>
							<th></th>
						</tr>
					</thead>
				</table>
				<div style={{overflowY: "scroll", height: "70vh"}}>
					<table>
						<tbody>
							{spellElements}
						</tbody>
					</table>
				</div>
			</aside>
		)
	}

	const creationForm = () => {

			// caster_level, known, discovered, character_id, spell_id, potion_or_oil
			let selected = null
			if (Object.keys(selectedSpell).length){
				if (itemType === "potion"){selected = <p>You are turning <strong>{selectedSpell.name}</strong> into a potion/oil</p>}
				if (itemType === "scroll"){selected = <p>You are writing the <strong>{selectedSpell.name}</strong> spell onto a scroll</p>}
				if (itemType === "wand"){selected = <p>You are imbuing the <strong>{selectedSpell.name}</strong> spell into a wand</p>}
			}
			return (
				<section>
					{selected}
					{(itemType === "potion" || itemType === "wand") && <><label>
						What is the caster level for this {itemType}? (Typically its the lowest)<input type="number" name="caster_level" value={customData.caster_level} onChange={formHandler}/>
					</label><br/></>}
					{itemType === "potion" && <><label>
						Is this a potion or an oil? (Potion is imbibed, oil is applied)<input type="text" name="potion_or_oil" value={customData.potion_or_oil} onChange={formHandler}/>
					</label><br/></>}
					{itemType === "wand" && <><label>
						How many charges does this wand have?<input type="number" name="charges" value={customData.charges} max="50" min="1" onChange={formHandler}/>
					</label><br/></>}
					{itemType === "scroll" && <><label>
						What spell level is this?<select name="spell_level" value={customData.spell_level} onChange={formHandler}>
		          <option value="0">0</option>
		          <option value="1">1</option>
		          <option value="2">2</option>
		          <option value="3">3</option>
		          <option value="4">4</option>
		          <option value="5">5</option>
		          <option value="6">6</option>
		          <option value="7">7</option>
		          <option value="8">8</option>
		          <option value="9">9</option>
		        </select>
					</label><br/></>}
					{itemType === "scroll" && <><label>
						What kind of magic is inscribed on this scroll<select name="scroll_type" value={customData.scroll_type} onChange={formHandler}>
		          <option value="arcane">Arcane</option>
		          <option value="divine">Divine</option>
		          <option value="psychic">Psychic</option>
		        </select>
					</label><br/></>}
					{itemType === "wand" && <><label>
						Does this wand have a name?<input type="text" name="name" value={customData.name} onChange={formHandler} />
					</label><br/></>}
					{itemType === "wand" && <><label>
						What does this wand look like?<input type="text" name="description" value={customData.description} onChange={formHandler} />
					</label><br/></>}
					<label>
						Does the player known what this item is? <input type="checkbox" name="known" onChange={formHandler} value={customData.known}/>
					</label><br/>
					<label>
						Has the player discovered that this item is on their character sheet? (Typically, no they need to recieve it in the settings)<input type="checkbox" name="discovered" onChange={formHandler} value={customData.discovered}/>
					</label><br/><br/>
					{selected ? props.campaign.characters.map((ch, idx) => <button onClick={(e) => createFetch(e, ch.id)}>{ch.name}</button>) : <p>Please pick a spell first!</p>}
				</section>
			)
	}

	const formHandler = (e) => {
		let duplicateObj = {...customData}
		let key = e.target.name
		let value = e.target.value
		if (key === "caster_level" || key === "potion_or_oil" || key === "scroll_type" || key === "spell_level" || key === "charges" || key === "name" || key === "description"){
			duplicateObj[key] = value
		} else if (key === "known" || key === "discovered"){
			duplicateObj[key] = !duplicateObj[key]
		}
		updateCustomData(duplicateObj)
	}

	return (
		<article>
			{renderOptions()}
			<div style={{display: "grid", gridTemplateColumns: "1fr 2fr 2fr"}}>
				{findSpell()}
				{creationForm()}
				{Object.keys(spellDetails).length > 0 && <SpellDescription spell={spellDetails} />}
			</div>
		</article>
	)
}

export default PotionsScrollsWandsCreator
