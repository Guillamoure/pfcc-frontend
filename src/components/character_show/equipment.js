import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../../localhost'

import MagicItemSummary from '../magic_item_summary'


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

  changeSelectedItem = (cmiID, detail) => {
    if (this.props.cmidId === cmiID) {
      this.props.exitModal()
      // this.setState({itemObject: null})
    } else {
      let changingState = 'magic item'
      changingState = detail === 'weapon' ? 'weapon' : changingState
      this.props.editModal(changingState, null, cmiID)
      // this.setState({itemObject: obj, descriptionAvailable: false})
    }
  }

  remappedActions = (actions) => {
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

  renderEquipment = () => {

    let cmis = this.props.character.character_magic_items.filter(cmi => cmi.discovered)
    let cws = this.props.character.character_weapons.filter(cw => cw.discovered)
    let weapons = cws.map(w => w.weapon)

    let equipment = [...cmis]
    let cmifus = this.props.character.character_magic_item_feature_usages
    let unknowns = equipment.filter(eq => !eq.known)
    let knowns = equipment.filter(eq => eq.known)
    let magicalItems = knowns.map(cmi => cmi.magic_item)
    let groupings = _.uniq(magicalItems.map(mi => mi.group))
    if (unknowns.length){
      groupings.push('unknown')
    }
    if (cws.length){
      groupings.push('weapon')
    }

    return groupings.map((group, idx) => {
      let groupedItems = cmis.filter(cmi => cmi.magic_item.group === group)
      groupedItems = group === 'unknown' ? unknowns : groupedItems
      groupedItems = group === 'weapon' ? cws : groupedItems

      let chosen = this.state.activeItemGroup === group
      return (
        <div label={group + 's'}>
          <div key={idx*3-1} onClick={() => this.changeActiveFeature(group)}><strong>{_.capitalize(group) + 's'} ({groupedItems.length})</strong></div>
          {chosen && <ul style={{margin: '0', padding: '0'}}>
            {groupedItems.map((i, idx) => {

              let keyWord = group
              keyWord = group === 'Wondrous Item' ? 'magic_item' : keyWord

              let known = group === 'unknown' ? false : true
              let actions = known && i[keyWord].features ? i[keyWord].features.map(f => f.action ? f.action.name : null) : []
              let name = known ? i.name || i[keyWord].name : i.false_desc
              let percentages = known && i[keyWord].features ? this.renderPercentage(i[keyWord]) : null
              // find feature usage, find limit, and find relevant cmifu, and have a fraction of current usage
              let remappedActions = this.remappedActions(actions)
              let equipped = i.equipped
              let stored = this.isThisStored(i, keyWord)
              let id = i.id

              return (
                <>
                  <li className='noStyleLi' style={{fontSize: 'smaller'}} key={idx*i.id*3-1} onClick={() => this.changeSelectedItem(id, group)}>
                    {name}{percentages}{equipped ? <span className='equipped'>E</span> : null}{stored ? <span className='equipped'>S</span> : null}
                    {!!actions.length && remappedActions.map((a, idx) => <span key={idx*3+1} className={a} style={{borderRadius: '100%', paddingLeft: '8%', margin: '1.5%'}}>{'  '}</span>)}
                  </li>
                </>
              )
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

  renderPercentage = (magicItem) => {
    let mi = magicItem.features.find(f => f.usage)
    if (mi){
      let usage = mi.usage
      let limit = usage.limit
      if ((limit === 1 && usage.destroy_after_use) || limit === 1000){
        return null
      }
      let cmifus = this.props.character.character_magic_item_feature_usages
      let fu = cmifus.find(fu => fu.feature_usage_id === usage.id)
      let currentUsage = fu.current_usage || 0
      let remaining = limit - currentUsage
      return ` (${remaining}/${limit})`
    } else {
      return null
    }
  }

  isThisStored = (item, group) => {
    if (group === 'magic_item'){
      return item.stored_character_magic_item
    }
    // ADD NEW STORAGE METHODS FOR NEW ITEM WHEN YOU GET TO IT
    // debugger
    return null
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
