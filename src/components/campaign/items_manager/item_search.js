import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../../../localhost'
import { sendCampaignWebsocket } from '../../../utils/websocket/campaign'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne } from '@fortawesome/free-solid-svg-icons'
import { faDiceTwo } from '@fortawesome/free-solid-svg-icons'
import { faDiceThree } from '@fortawesome/free-solid-svg-icons'
import { faDiceFour } from '@fortawesome/free-solid-svg-icons'
import { faDiceFive } from '@fortawesome/free-solid-svg-icons'
import { faDiceSix } from '@fortawesome/free-solid-svg-icons'

class ItemSearch extends React.Component {

  state = {
    searchTerm: '',
    items: [],
    loading: false,
    didSearch: false,
    selectedItem: null,
    successfulAddition: false,
		customData: {
			name: "",
			description: "",
			masterwork: false,
			false_desc: "",
			known: false,
			discovered: false
		}
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  fetchItem = (e, character_id, itemType) => {
		e.preventDefault();
    let info = {
			...this.state.customData,
      character_id,
			item_id: this.state.selectedItem.id
    }
    this.setState({successfulAddition: false})
    fetch(`${localhost}/api/v1/character_${itemType}s`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(r => r.json())
    .then(data => {
      if (data.status === 404 || data.status ===  500){
        console.log(data)
      } else {
        this.setState({successfulAddition: true, selectedItem: '', customData: {name: "", description: "", masterwork: false, false_desc: "", known: false, discovered: false}})
				//send the item, itemType to the character if they are online
				sendCampaignWebsocket({message: "Your DM gave you an item!", reciever_id: character_id, itemType, data}, {dm: true}, {toggleable: true})
      }
    })
  }

  // debounce = (func, milli, immediate) => {
  //   var timeout
  //   return function () {
  //     var context = this;
  //     var args = arguments;
  //
  //     debugger
  //
  //     var later = function() {
  //       timeout = null;
  //       if (!immediate) func.apply(context, args);
  //     };
  //     if (immediate && !timeout) func.apply(context, args);
  //
  //
  //     clearTimeout(timeout);
  //
  //     timeout = setTimeout(later, milli);
  //   };
  // }

  fetchItems = () => {
    if (this.state.searchTerm.length){
      fetch(`${localhost}/api/v1/item_search?q=${this.state.searchTerm}`)
        .then(r => r.json())
        .then(data => {
          this.setState({items: data, loading: false, didSearch: true})
        })
    } else {
      this.setState({items: []})
    }
  }

  renderItems = () => {
    if (!this.state.items.length && this.state.didSearch){
      return <p>¯\_(ツ)_/¯</p>
    } else {
      return this.state.items.map(i => {
        return (
          <li key={i.id*3-1}>
            <span>{i.name}</span>
            <span>{<button onClick={() => this.deployItem(i)}>Add Item</button>}</span>{this.state.successfulAddition && this.state.selectedItem === i && <span className='plus-one'>+1</span>}
          </li>
        )
      })
    }
  }

	renderSelectedItem = () => {
		if (!this.state.selectedItem){ return }

		let { name, weapon_type, max_dex_bonus, affliction_type, slot } = this.state.selectedItem
		let itemType = "item"
		if (weapon_type){
			itemType = "weapon"
		}
		else if (max_dex_bonus){
			itemType = "armor"
		}
		else if (affliction_type){itemType = "poison"}
		else if (slot){itemType = "magic_item"}

		const formData = (
			<>
				<label htmlFor="name">
					Is there a specific name for this item? <input type="text" id="name" name="name" onChange={this.formHandler} value={this.state.customData.name}/>
				</label><br/>
				<label htmlFor="description">
					Is there a detailed description for this item? <input type="text" id="description" name="description" onChange={this.formHandler} value={this.state.customData.description}/>
				</label><br/>
				<label htmlFor="masterwork">
					Is this item a masterwork or handcrafted item? <input type="checkbox" id="masterwork" name="masterwork" onChange={this.formHandler} value={this.state.customData.masterwork}/>
				</label><br/>
			</>
		)

		const formDataMagicItem = (
			<>
				<label htmlFor="false_desc">
					Is there a false description for this Magic Item? <input type="text" id="false_desc" name="false_desc" onChange={this.formHandler} value={this.state.customData.false_desc}/>
				</label><br/>
			</>
		)

		return (
			<div>
				<h3>{name}</h3>
				<div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
				<form>
					{itemType === "magic_item" && formDataMagicItem}
					{(itemType === "weapon" || itemType === "armor") && formData}
					<label htmlFor="known">
						Does the player known what this item is? <input type="checkbox" id="known" name="known" onChange={this.formHandler} value={this.state.customData.known}/>
					</label><br/>
					<label htmlFor="discovered">
						Has the player discovered that this item is on their character sheet? (Typically, no they need to recieve it in the settings)<input type="checkbox" id="discovered" name="discovered" onChange={this.formHandler} value={this.state.customData.discovered}/>
					</label><br/><br/>
					<p>Give Item to Whom?</p>
					{this.props.campaign.characters.map((ch, idx) => <button onClick={(e) => this.fetchItem(e, ch.id, itemType)}>{ch.name}</button>)}
				</form>
			</div>
		)
	}

  deployItem = (i) => {
    this.setState({selectedItem: i, successfulAddition: false})
  }

	formHandler = e => {
		let duplicateObj = {...this.state.customData}
		let key = e.target.name
		let value = e.target.value
		if (key === "name" || key === "description" || key === "false_desc"){
			duplicateObj[key] = value
		} else if (key === "masterwork" || key === "known" || key === "discovered"){
			duplicateObj[key] = !duplicateObj[key]
		}
		this.setState({customData: duplicateObj})
	}

  handle = _.debounce(this.fetchItems, 800)

  debouncer = () => {
    this.handle()
    if (this.state.searchTerm.length){
      this.setState({loading: true, selectedItem: null})
    } else {
      this.setState({loading: false})

    }
  }

  renderForm = () => {
    return (
      <form>
        <label>
          Item Search:
          <input type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.renderChange} onKeyUp={this.debouncer}/>
        </label>
      </form>
    )
  }

  render(){
    return (
      <section style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
				<div>
	        {this.renderForm()}
	        <ul>
	          {this.renderItems()}
	        </ul>
				</div>
				{this.renderSelectedItem()}
      </section>
    )
  }

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(ItemSearch)
