import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../../localhost'

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
    message: ''
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  fetchItem = (character_id) => {
    let info = {
      character_id,
      item: this.state.selectedItem,
      desc: this.state.message,
      current_user: this.props.currentUser.id
    }
    this.setState({successfulAddition: false})
    fetch(`${localhost}/api/v1/character_items`, {
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
        this.setState({successfulAddition: true, message: ''})
        this.props.dispatch({type: 'SIGNIN', user: data.current_user, admin: data.current_user.admin })
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
            {this.state.selectedItem && this.state.selectedItem.name === i.name && <br/>}
            <span>{this.state.selectedItem && this.state.selectedItem.name === i.name && this.renderFalseDescription()}</span>
            <span>{this.state.selectedItem && this.state.selectedItem.name === i.name && !!this.state.message.length && this.renderPlayers()}</span>
          </li>
        )
      })
    }
  }

  deployItem = (i) => {
    this.setState({selectedItem: i, successfulAddition: false})
  }

  renderPlayers = () => {
    return this.props.currentUser.characters.map((ch, idx) => {
      return (
        <button onClick={() => this.fetchItem(ch.id)}>{ch.name}</button>
      )
    })
  }

  renderFalseDescription = () => {
    return (
      <label>
        Desc:
        <input type="text" name="message" value={this.state.message} onChange={this.renderChange}/>
      </label>
    )
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
      <section>
        {this.renderForm()}
        {this.state.loading ? <React.Fragment><FontAwesomeIcon id='loading-dice' icon={faDiceOne} size='5x'/><FontAwesomeIcon id='loading-dice' icon={faDiceTwo} size='5x'/><FontAwesomeIcon id='loading-dice' icon={faDiceThree} size='5x'/><FontAwesomeIcon id='loading-dice' icon={faDiceFour} size='5x'/><FontAwesomeIcon id='loading-dice' icon={faDiceFive} size='5x'/><FontAwesomeIcon id='loading-dice' icon={faDiceSix} size='5x'/></React.Fragment> : null}
        <ul>
          {this.renderItems()}
        </ul>
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
