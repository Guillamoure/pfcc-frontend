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

  changeSelectedItem = (cmiID) => {
    if (this.props.cmidId === cmiID) {
      this.props.exitModal()
      // this.setState({itemObject: null})
    } else {
      this.props.editModal('magic item', null, cmiID)
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
    let cmifus = this.props.character.character_magic_item_feature_usages
    let unknowns = cmis.filter(cmi => !cmi.known)
    let knowns = cmis.filter(cmi => cmi.known)
    let magicalItems = knowns.map(cmi => cmi.magic_item)
    let groupings = _.uniq(magicalItems.map(mi => mi.group))
    if (unknowns.length){
      groupings.push('unknown')
    }

    return groupings.map((group, idx) => {
      let groupedItems = magicalItems.filter(mi => mi.group === group)
      groupedItems = group === 'unknown' ? unknowns : groupedItems
      let chosen = this.state.activeItemGroup === group
      return (
        <div label={group + 's'}>
          <div key={idx*3-1} onClick={() => this.changeActiveFeature(group)}><strong>{_.capitalize(group) + 's'} ({groupedItems.length})</strong></div>
          {chosen && <ul style={{margin: '0', padding: '0'}}>
            {groupedItems.map((i, idx) => {

              let known = group === 'unknown' ? false : true
              let actions = known ? i.features.map(f => f.action ? f.action.name : null) : []
              let name = known ? i.name : i.false_desc
              let percentages = known ? this.renderPercentage(i) : null
              // find feature usage, find limit, and find relevant cmifu, and have a fraction of current usage
              let remappedActions = this.remappedActions(actions)
              let equipped = known ? cmis.find(cmi => cmi.magic_item === i).equipped : i.equipped
              let stored = known ? cmis.find(cmi => cmi.magic_item === i).stored_character_magic_item : i.stored_character_magic_item
              let id = known ? cmis.find(cmi => cmi.magic_item === i).id : i.id
              
              return (
                <>
                  <li className='noStyleLi' style={{fontSize: 'smaller'}} key={idx*i.id*3-1} onClick={() => this.changeSelectedItem(id)}>
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
      let cmifus = this.props.character.character_magic_item_feature_usages
      let fu = cmifus.find(fu => fu.feature_usage_id === usage.id)
      let currentUsage = fu.current_usage || 0
      let remaining = limit - currentUsage
      return ` (${remaining}/${limit})`
    } else {
      return null
    }
  }

  renderItem = () => {
    let item = this.state.itemObject
    return (
      <div>
        <h3>{item.name}</h3>
        <span>Price {item.price_in_gp} gp; Slot {item.slot}; CL {item.caster_level}; Weight {item.weight} lb; Aura {item.aura}</span>
        {this.renderDescription(item.description)}
      </div>
    )
  }

  renderDescription = (desc) => {
    let descArray = desc.split("\n\n")
    let spellArray = this.state.itemObject.magic_item_spell_references.map(misp => {
      let spell = this.state.itemObject.spells.find(sp => sp.id === misp.spell_id)
      let spellName = _.lowerCase(spell.name)
      return spellName
    })
    return descArray.map((para, idx) => {
      let paraDupe = para
      if (spellArray.length){

        let array = ''

        spellArray.forEach(s => {

          if (array.length > 1){
            array = array.map((ar, idx) => {
              if (!spellArray.includes(ar)){

                ar = ar.split(s)

                if (ar.length > 1){
                  ar.splice(1, 0, s)
                }
                return ar

              } else {
                return ar
              }
            })
            array = _.flatten(array)
          } else {

            array = para.split(s)

            if (array.length > 1){
              array.splice(1, 0, s)
            }
          }

        })

        paraDupe = array.map(ar => {
          if (spellArray.includes(ar)){
            let spell = this.state.itemObject.spells.find(sp => _.lowerCase(sp.name) === ar)
            return <em className='underline-hover' onClick={() => this.props.editModal('spell', null, spell.id)}>{ar}</em>
          } else {
            return <React.Fragment>{ar}</React.Fragment>
          }
        })

      }
      return <p key={idx*3+1}>{paraDupe}</p>
    })

    // if (this.state.itemObject.magic_item_spell_references.length){
    //   this.state.itemObject.magic_item_spell_references.forEach(misp => {
    //     let spell = this.state.itemObject.spells.find(sp => sp.id === misp.spell_id)
    //     let spellName = _.lowerCase(spell.name)
    //     let rg = new RegExp(spellName)
    //     descArray = descArray.map(d => {
    //       // let desc = <p>{d}</p>
    //       let found = d.search(spellName)
    //
    //       if (found > -1){
    //         let spellSpan = "<em className='underline-hover' onClick={() => this.props.editModal('spell', null, spell.id)}>{spellName}</em>"
    //         d = d.replace(rg, spellSpan)
    //       }
    //       return d
    //     })
    //   })
    // }
    // return descArray.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
  }

  parseSpell = (description, spellArray, spells) => {
    let desc = description
    spellArray.forEach(sp => {
      desc = desc.split(sp)
      let spell = this.state.itemObject.spells.find(s => _.lowerCase(s.name) === sp)
      desc = desc.join(`<em className='underline-hover' onClick=${() => this.props.editModal('spell', null, spell.id)}>${sp}</em>`)
    })
    return desc
  }

  render(){
    return(
      <div style={{padding: '1em', display: 'grid', gridTemplateColumns: '40% 60%'}} >
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