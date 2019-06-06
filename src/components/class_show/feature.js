import React from 'react'
import _ from 'lodash'
import FeatureForm from './feature_form'

class Feature extends React.Component {

  state ={
    toggleFeatureForm: false
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
      this.setState({toggleFeatureForm: false}, () => this.props.renderClassFeature(data.klass_feature))
    })
  }

  renderForm = () => {
    return <FeatureForm toggleFeatureForm={this.state.toggleFeatureForm} feature={this.props.feature} renderSubmit={this.renderSubmit}/>
  }

  render () {
    return (
      <span>
        <ul>
          <span><strong>{this.props.feature.name}</strong></span>
          <button onClick={this.renderClick}>Edit</button>
          <li>A {this.props.klass_name} learns this at <strong>level {this.props.feature.level_learned}</strong></li>
          <li>Description: {this.props.feature.description}</li>
          < br />
        </ul>
        {this.state.toggleFeatureForm ? this.renderForm() : null}
      </span>
    )
  }



}

export default Feature
