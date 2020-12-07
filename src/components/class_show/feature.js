import React from 'react'
import _ from 'lodash'
import FeatureForm from './feature_form'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import { descriptionParser } from '../../utils/fuf'

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
    fetch(`${localhost}/api/v1/klass_features/${this.props.feature.id}`, {
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

      fetch(`${localhost}/api/v1/klass_features/${this.props.feature.id}`, {
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
      return descriptionParser(desc)
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
    return <ul>{display.map(effect => <li>{effect}</li>)}</ul>
  }

  startingLevel = (feature) => {
    let startingLevel = 20
    feature.feature_levels.forEach(fl => {
      if (fl.level < startingLevel){
        startingLevel = fl.level
      }
    })
    return startingLevel
  }

  render () {
		let slug = this.props.feature.name.toLowerCase().split(" ").join("-")
    return (
      <>
        <li id={slug} className="feature-title"><strong>{this.props.feature.name}</strong></li>

        {this.state.deleteFeatureButton ? <span><br/>Are you sure about that?<br/> <button onClick={(e) => this.deleteFeatureConfirm(e, "no")}>No</button><button onClick={(e) => this.deleteFeatureConfirm(e, "yes")}>Yes</button><br/><br/></span> : null}
        {!this.state.deleteFeatureButton && this.props.admin ? <button onClick={this.renderClick}>Edit</button> : null}
        {this.props.admin && <button onClick={() => this.props.toggleModal(this.props.feature.id)}>Toggle Feature Effect</button>}

        <li>{this.renderDescription()}</li>
        {this.effectsButton()}
        {this.state.showEffects && this.showEffects()}
        {this.state.toggleFeatureForm ? this.renderForm() : null}
      </>
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
