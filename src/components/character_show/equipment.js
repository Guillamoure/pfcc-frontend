import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import { modalAction } from '../../utils/action_creator/popups'

import MagicItemSummary from '../magic_item_summary'
import EquipmentItem from './equipment_item'


class Equipment extends React.Component {

  state = {
    activeItemGroup: null,
    itemObject: null,
    descriptionAvailable: false
  }

  changeActiveFeature = (name) => {
    if (this.state.activeItemGroup === name) {
      this.setState({activeItemGroup: null})
    } else {
      this.setState({activeItemGroup: name, descriptionAvailable: false})
    }
  }

  changeSelectedItem = (cmiID, detail, obj) => {
    if (this.props.cmidId === cmiID) {
      this.props.exitModal()
      // this.setState({itemObject: null})
    } else {
      let changingState = 'magic item'
      changingState = detail === 'weapon' ? 'weapon' : changingState
      changingState = detail === 'armor' ? 'armor' : changingState
			changingState = ["unknown", "weapon", "armor", "harrow", "magic item", "Wondrous Item"].includes(detail) ? changingState : "item"
      this.props.editModal(changingState, null, cmiID)
      if (detail === 'armor'){
        this.props.dispatch({type: "MODAL", detail: "armor", obj: obj})
      } else if (changingState === "item"){
				modalAction("item", obj)
			}
      // this.setState({itemObject: obj, descriptionAvailable: false})
    }
  }

  renderEquipment = () => {

    let cmis = this.props.character.character_magic_items.filter(cmi => cmi.discovered)
    let cws = this.props.character.character_weapons.filter(cw => cw.discovered)
    let cas = this.props.character.character_armors.filter(cw => cw.discovered)
    let weapons = cws.map(w => w.weapon)
		let items = this.props.character.items
		let itemGroups = _.uniq(items.map(i => i.category))

    let equipment = [...cmis]
    let cmifus = this.props.character.character_magic_item_feature_usages
    let unknowns = equipment.filter(eq => !eq.known)
    let knowns = equipment.filter(eq => eq.known)
    let magicalItems = knowns.map(cmi => cmi.magic_item)
    let groupings = _.uniq(magicalItems.map(mi => mi.group))
    if (unknowns.length){
      groupings.push('unknown')
    }
    if (cws.length){groupings.push('weapon')}
    if (cas.length){groupings.push('armor')}
		groupings = [...groupings, ...itemGroups]

		// HARDCODE
		if (this.props.character.name === "Majestik"){groupings.push("harrow")}
		// if (this.props.character.name === "Natesse"){groupings.push("wand")}
		// if (this.props.character.name === "Natesse"){groupings.push("scroll")}
		// if (this.props.character.name === "Dz'eyn"){groupings.push("poison")}
		// HARDCODE

    return groupings.map((group, idx) => {

			if (group === "harrow"){
				return (<div><strong onClick={() => modalAction("harrow", {})}>Harrow Deck</strong></div>)
			}




      let groupedItems = cmis.filter(cmi => cmi.magic_item.group === group)
      groupedItems = group === 'unknown' ? unknowns : groupedItems
      groupedItems = group === 'weapon' ? cws : groupedItems
      groupedItems = group === 'armor' ? cas : groupedItems

      // remove unarmed as a valid weapon
      if (group === "weapon"){ groupedItems = groupedItems.filter(gi => gi.weapon.name !== "Unarmed") }

			if (!groupedItems.length){groupedItems = items.filter(i => i.category === group)}

      let chosen = this.state.activeItemGroup === group
			let label = ["unknown", "weapon", "armor", "harrow"].includes(group) ? group + "s" : group
			// if (!["unknown", "weapon", "armor", "harrow"].includes(group)){label = group}
      return (
        <div key={idx * 6 - 1} label={label}>
          <div key={idx*3-1} onClick={() => this.changeActiveFeature(group)}><strong>{_.capitalize(label)} ({groupedItems.length})</strong></div>
          {chosen && <ul style={{margin: '0', padding: '0'}}>
            {groupedItems.map((i, idx) => {

							return <EquipmentItem item={i} index={idx} group={group} changeSelectedItem={this.changeSelectedItem}/>

            })}
          </ul>}
        </div>
      )
      // display grouping in a div
      // i.e. Potions (1) or Wondrous Items (4)
      // if div is clicked, change state
      // display all items in a list
      // if that item is clicked, display item details on right side of the box
    })
    // return traits.map(trait => {
    //     return (
    //       <li data-id={trait.id} onClick={this.changeActiveFeature} className='highlight'>
    //         <strong data-id={trait.id}>{trait.name}</strong>
    //         {this.state.activeItemGroup === trait.id && <div style={{color: '#000'}}>{trait.description}</div>}
    //       </li>
    //     )
    //
    // })
  }


  render(){
    return(
      <div style={{padding: '1em', display: 'grid', gridTemplateColumns: '40% 60%'}} className={localStorage.computer === "false" ? 'mobile-tab-selected-tab-container mobile-tab-bottom shadow' : 'none'}>
        {this.renderEquipment()}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Equipment)
