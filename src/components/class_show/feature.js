import React from 'react'
import _ from 'lodash'
import FeatureForm from './feature_form'
import { connect } from 'react-redux'

class Feature extends React.Component {

  state ={
    toggleFeatureForm: false,
    deleteFeatureButton: false,
    showEffects: false
  }

  renderClick = (option) => {
    this.setState({toggleFeatureForm: !this.state.toggleFeatureForm})
  }

  renderSubmit = (e, feature) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/v1/klass_features/${this.props.feature.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_feature_id: this.props.feature.id,
        features: feature
      })
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        this.setState({toggleFeatureForm: false}, () => this.props.renderClassFeature(data.klass_feature))
      } else {
        console.log(data.error)
      }
    })
  }

  renderForm = () => {
    return <FeatureForm toggleFeatureForm={this.state.toggleFeatureForm} feature={this.props.feature} renderSubmit={this.renderSubmit} deleteFeature={this.deleteFeature}/>
  }

  deleteFeature = () => {
    this.setState({toggleFeatureForm: !this.state.toggleFeatureForm, deleteFeatureButton: !this.state.deleteFeatureButton })
  }

  deleteFeatureConfirm = (e, answer) => {
    e.preventDefault();
    if (answer === "yes") {

      fetch(`http://localhost:3000/api/v1/klass_features/${this.props.feature.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          klass_feature_id: this.props.feature.id
        })
      })
      .then(r => r.json())
      .then(id => {
        this.setState({toggleFeatureForm: false, deleteFeatureButton: false}, () => this.props.renderClassFeature(id))
      })
    } else if (answer === "no"){
      this.setState({toggleFeatureForm: false, deleteFeatureButton: false})
    }
  }

  renderDescription = () => {
    if (this.props.feature.description){

      let desc = this.props.feature.description
      desc = desc.split("\n\n")
      return desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
    }
  }

  effectsButton = () => {
    if (
      this.props.feature.spellcasting
      && this.props.admin
    ){
      return <button onClick={() => this.setState({showEffects: !this.state.showEffects})}>Toggle Linked Effects</button>
    }
  }

  showEffects = () => {
    let display = []
    if (this.props.feature.spellcasting){
      const sp = this.props.feature.spellcasting
      display.push(`Spellcasting: ${sp.ability_score}, ${sp.limited ? "Limited Spells" : "All Spells"}, ${sp.prepared ? "Prepared" : "Spontaneous"}`)
    }
    return (
      <ul>
        {display.map(effect => <li>{effect}</li>)}
      </ul>
    )
  }

  render () {
    return (
      <span>
        <ul>
          <span><strong>{this.props.feature.name}</strong></span>

          {this.state.deleteFeatureButton ? <span><br/>Are you sure about that?<br/> <button onClick={(e) => this.deleteFeatureConfirm(e, "no")}>No</button><button onClick={(e) => this.deleteFeatureConfirm(e, "yes")}>Yes</button><br/><br/></span> : null}
          {!this.state.deleteFeatureButton && this.props.admin ? <button onClick={this.renderClick}>Edit</button> : null}
          {this.props.admin && <button onClick={() => this.props.toggleModal(this.props.feature.id)}>Toggle Feature Effect</button>}

          <li>A {this.props.klass_name} learns this at <strong>level {this.props.feature.level_learned}</strong></li>
          <li>Description: {this.renderDescription()}</li>
          {this.effectsButton()}
          {this.state.showEffects && this.showEffects()}
        </ul>
        {this.state.toggleFeatureForm ? this.renderForm() : null}
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

export default connect(mapStatetoProps)(Feature)
