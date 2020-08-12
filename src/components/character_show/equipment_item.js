import React from 'react'

const EquipmentItem = props => {

	let { item, index, group } = props

	const remappedActions = (actions) => {
		return actions.map(a => {
			switch(a){
				case 'Standard Action':
					return 'standard'
				case 'Swift Action':
					return 'swift'
				case 'Move Action':
					return 'move'
				case 'Full-Round Action':
					return 'full'
				case 'Immediate Action':
					return 'immediate'
				case 'Free Action':
					return 'free'
				default:
					return a
			}
		})
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

	let keyWord = group
	keyWord = group === 'Wondrous Item' ? 'magic_item' : keyWord

	let known = group === 'unknown' ? false : true
	let actions = known && item[keyWord].features ? item[keyWord].features.map(f => f.action ? f.action.name : null) : []
	let name = known ? item.name || item[keyWord].name : item.false_desc
	let percentages = known && item[keyWord].features ? renderPercentage(item[keyWord]) : null
	// find feature usage, find limit, and find relevant cmifu, and have a fraction of current usage
	let mappedActions = remappedActions(actions)
	let equipped = item.equipped
	let stored = isThisStored(item, keyWord)
	let id = item.id

	return (
		<>
			<li className='noStyleLi' style={{fontSize: 'smaller'}} key={index*item.id*3-1} onClick={() => props.changeSelectedItem(id, group, item)}>
				{name}{percentages}{equipped ? <span className='equipped'>{equipped[0]}</span> : null}{stored ? <span className='equipped'>S</span> : null}
				{!!actions.length && mappedActions.map((a, index) => <span key={index*3+1} className={a} style={{borderRadius: '100%', paddingLeft: '8%', margin: '1.5%'}}>{'  '}</span>)}
			</li>
		</>
	)


}

export default EquipmentItem
