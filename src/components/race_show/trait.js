import React from 'react'
import _ from 'lodash'
import TraitForm from './trait_form'
import { connect } from 'react-redux'

class Trait extends React.Component {

  state ={
    toggleTraitForm: false,
    deleteTraitButton: false
  }

  renderClick = (option) => {
    this.setState({toggleTraitForm: !this.state.toggleTraitForm})
  }

  renderSubmit = (e, trait) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/v1/race_traits/${this.props.trait.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        race_trait_id: this.props.trait.id,
        traits: trait
      })
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        this.setState({toggleTraitForm: false}, () => this.props.renderClassTrait(data.race_trait))
      } else {
        console.log(data.error)
      }
    })
  }

  renderForm = () => {
    return <TraitForm toggleTraitForm={this.state.toggleTraitForm} trait={this.props.trait} renderSubmit={this.renderSubmit} deleteTrait={this.deleteTrait}/>
  }

  deleteTrait = () => {
    this.setState({toggleTraitForm: !this.state.toggleTraitForm, deleteTraitButton: !this.state.deleteTraitButton })
  }

  deleteTraitConfirm = (e, answer) => {
    e.preventDefault();
    if (answer === "yes") {

      fetch(`http://localhost:3000/api/v1/race_traits/${this.props.trait.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          race_trait_id: this.props.trait.id
        })
      })
      .then(r => r.json())
      .then(id => {
        this.setState({toggleTraitForm: false, deleteTraitButton: false}, () => this.props.renderClassTrait(id))
      })
    } else if (answer === "no"){
      this.setState({toggleTraitForm: false, deleteTraitButton: false})
    }
  }

  renderDescription = () => {
    if (this.props.trait.description){

      let desc = this.props.trait.description
      desc = desc.split("\n\n")
      return desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
    }
  }

  render () {
    console.log("individual trait", this.props)
    return (
      <span className="trait">
        <ul>
          <span><strong>{this.props.trait.name}</strong></span>
          {this.state.deleteTraitButton ? <span><br/>Are you sure about that?<br/> <button onClick={(e) => this.deleteTraitConfirm(e, "no")}>No</button><button onClick={(e) => this.deleteTraitConfirm(e, "yes")}>Yes</button><br/><br/></span> : null}
          {!this.state.deleteTraitButton && this.props.admin ? <button onClick={this.renderClick}>Edit</button> : null}
          <li>A {this.props.race_name} learns this at <strong>level {this.props.trait.level_learned}</strong></li>
          <li>Description: {this.renderDescription()}</li>
        </ul>
        {this.state.toggleTraitForm ? this.renderForm() : null}
        < br />
      </span>
    )
  }
}



const mapStatetoProps = (state) => {
  return {
    currentUser: state.current,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(Trait)
