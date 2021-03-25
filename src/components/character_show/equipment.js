import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import { modalAction } from '../../utils/action_creator/popups'
import { calculateWeight, carryingCapacity, calculateLoad } from '../../utils/calculations/character'
import { abilityScore } from '../../utils/calculations/ability_scores'


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

  changeSelectedItem = (itemID, detail, obj) => {
    if (this.props.cmidId === itemID) {
      this.props.exitModal()
      // this.setState({itemObject: null})
    } else {
      let changingState = 'magicItem'
      changingState = detail === 'weapon' ? 'weapon' : changingState
      changingState = detail === 'armor' ? 'armor' : changingState
      changingState = detail === 'poison' ? 'poison' : changingState
      changingState = detail === 'potion' ? 'potion' : changingState
      changingState = detail === 'scroll' ? 'scroll' : changingState
			changingState = ["unknown", "weapon", "armor", "harrow", "magic item", "Wondrous Item", "poison", "potion", "scroll"].includes(detail) ? changingState : "item"
			modalAction(changingState, obj, {name: obj.name || obj.weapon?.name || obj.armor?.name || null})
			// debugger
      // this.props.editModal(changingState, null, itemID)
      // if (detail === 'armor'){
      //   modalAction("armor", obj)
      // } else if (changingState === "item"){
			// 	modalAction("item", obj)
			// }
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

	renderEquipmentList = () => {
		let items = []

		let cmis = this.props.character.character_magic_items.filter(cmi => cmi.discovered)
		let cps = this.props.character.character_potions.filter(cp => cp.discovered)
		let css = this.props.character.character_scrolls.filter(cs => cs.discovered)
		let cws = this.props.character.character_weapons.filter(cw => cw.discovered)
		let cas = this.props.character.character_armors.filter(cw => cw.discovered)

		cmis.forEach(cmi => {
			items.push({...cmi, category: "Magic Item"})
		})

		cps.forEach(cp => {
			items.push({...cp, category: "Potion"})
		})

		css.forEach(cs => {
			items.push({...cs, category: "Scroll"})
		})

		cws.forEach(cw => {
			if (cw.weapon.name !== "Unarmed"){
				items.push({...cw, category: "Weapon"})
			}
		})

		cas.forEach(ca => {
			items.push({...ca, category: "Armor"})
		})

		items = [...items, ...this.props.character.items]

		this.props.character.poisons.forEach(cp => {
			items.push({...cp, category: "Poison"})
		})

		let itemRows = items.map((item, idx) => {
			return <EquipmentItem item={item} index={idx} group={item.category} changeSelectedItem={this.changeSelectedItem}/>
		})

		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Category</th>
						<th>Weight</th>
						<th>Cost</th>
					</tr>
				</thead>
				<tbody>
					{itemRows}
				</tbody>
			</table>
		)
	}


	renderCurrency = () => {
		let { pp, gp, sp, cp } = this.props.character
		let totalGP = (pp*10) + (gp) + (sp*0.1) + (cp*0.01)
		return (
			<header style={{display: "flex", justifyContent: "space-between"}}>
				<span>
					<strong>Money</strong>: {totalGP.toFixed(2)} gp <small><em>({pp ?? 0} pp, {gp ?? 0} gp, {sp ?? 0} sp, {cp ?? 0} cp)</em></small>
        </span>
        <button onClick={() => modalAction("currency", null, {name: "Currency"})}>Manage</button>
			</header>
		)
	}

	renderCarryWeight = () => {
		let weight = calculateWeight(this.props.character, this.props.character_info)
		let cc = carryingCapacity(abilityScore("strength"))
		let load = calculateLoad(weight, abilityScore("strength"))
		return (
			<footer style={{display: "flex", justifyContent: "space-between", position: "sticky", bottom: "-5px", opacity: "0.95", backgroundColor: `#${this.props.settings.bubbleColor}`, padding: "5px"}}>
				<div>
					<strong>Carrying</strong>: {weight} lbs (<em>{load} Load</em>)
				</div>
				<table>
					<thead>
						<tr>
							<th style={{textAlign: "center", borderRight: "1px solid black"}}>Light</th>
							<th style={{textAlign: "center", borderRight: "1px solid black"}}>Medium</th>
							<th style={{textAlign: "center"}}>Heavy</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{borderRight: "1px solid black"}}>{cc[0]} lbs or less</td>
							<td style={{borderRight: "1px solid black"}}>{cc[0]+1} - {cc[1]} lbs</td>
							<td>{cc[1]+1} - {cc[2]} lbs</td>
						</tr>
					</tbody>
				</table>
			</footer>
		)
	}



  render(){
    return(
			<>
				{this.renderCurrency()}
		    <div style={{padding: '1em', display: 'grid', gridTemplateColumns: '40% 60%'}} className={localStorage.computer === "false" ? 'mobile-tab-selected-tab-container mobile-tab-bottom shadow' : 'none'}>
		      {this.renderEquipmentList()}
		    </div>
				<button onClick={() => modalAction("addEquipment", null, {name: "Add Equipment"})}>Add Equipment</button>
				{this.renderCarryWeight()}
			</>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
		settings: state.settings
  }
}

export default connect(mapStatetoProps)(Equipment)
