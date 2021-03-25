import React from 'react'
import _ from 'lodash'
import { actionClass } from '../../fuf'

const EquipmentItem = props => {

	let { item, index, group } = props

	const remappedActions = (actions) => {
		return actions.map(actionClass)
	}

	const renderPercentage = (magicItem) => {
		let mi = magicItem.features.find(f => f.usage)
		if (mi){
			let usage = mi.usage
			let limit = usage.limit
			if ((limit === 1 && usage.destroy_after_use) || limit === 1000){
				return null
			}
			let cmifus = this.props.character.character_magic_item_feature_usages
			let fu = cmifus.find(fu => fu.feature_usage_id === usage.id) || 0
			let currentUsage = fu.current_usage || 0
			let remaining = limit - currentUsage
			return ` (${remaining}/${limit})`
		} else {
			return null
		}
	}

	const isThisStored = (item, group) => {
		if (group === 'magic_item'){
			return item.stored_character_magic_item
		}
		// ADD NEW STORAGE METHODS FOR NEW ITEM WHEN YOU GET TO IT
		// debugger
		return null
	}



	const renderTitle = () => {

		console.log("specific item in equipment tab", props)


		let keyWord = group
		keyWord = group === 'Wondrous Item' || group === "Magic Item"? 'magic_item' : keyWord

		let known = (group === 'Magic Item' || group === "Potion" || group === "Scroll" || group === "Wand") && !item.known ? false : true
		// debugger
		let name = known ? item.name || item[keyWord.toLowerCase()]?.name || item?.spell?.name : item.false_desc ?? "Unknown"
		if (item.masterwork && !item.name){name = "mwk " + name}
		if (item.potion_or_oil && known){name = `${_.capitalize(item.potion_or_oil)} of ${item.spell.name}`}
		if (item.scroll_type && known){name = `Scroll of ${item.spell.name}`}
		if (item.charges && known){name = item.name || `Wand of ${item.spell.name}`}
		let percentages = known && item[keyWord]?.features ? renderPercentage(item[keyWord]) : null
		// find feature usage, find limit, and find relevant cmifu, and have a fraction of current usage
		let equipped = item.equipped
		let stored = isThisStored(item, keyWord)
		let id = item.id

		// {equipped ? <span className='equipped'>{equipped === true ? "E" : equipped[0]}</span> : null}
		// {stored ? <span className='equipped'>S</span> : null}
		return (
			<tr key={index*item.id*3-1} onClick={() => props.changeSelectedItem(item.id, group.toLowerCase(), item)}>
				<td>{name} {percentages}</td>
				<td>{group}</td>
				<td>0 lbs</td>
				<td>0 gp</td>
			</tr>
		)
	}

	const renderAction = () => {
		let known = group === 'unknown' ? false : true
		let keyWord = group
		keyWord = group === 'Wondrous Item' || group === "Potion" ? 'magic_item' : keyWord
		let actions = known && item[keyWord]?.features ? item[keyWord].features.map(f => f.action ? f.action.name : null) : []
		let mappedActions = remappedActions(actions)
		let id = item.id

		return (
			<>
				{!!actions.length && mappedActions.map((a, index) => <span key={index*3+1} className={a} style={{borderRadius: '100%', paddingLeft: '8%', margin: '1.5%'}}>{'  '}</span>)}
			</>
		)
	}

	return (
		<>
			{renderTitle()}
		</>
	)


}

export default EquipmentItem
