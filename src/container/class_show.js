import React from 'react'
import _ from 'lodash'

import Introduction from '../components/class_show/introduction'
import Table from '../components/class_show/table'
import Features from '../components/class_show/feature_list'
import FeatureForm from '../components/class_show/feature_form'

class Class extends React.Component {

  state ={
    klass : {},
    toggleFeatureForm: false
  }

  renderURL = () => {
    let url = window.location.href
    let urlArray = url.split("/")
    return urlArray[urlArray.length - 1]
  }

  componentDidMount() {
    const klass = this.renderURL()
    fetch(`http://localhost:3000/api/v1/klasses/${klass}`)
    .then(r => r.json())
    .then(data => this.setState({klass: data}))
  }









  changeAddFeatureToggle = () => {
    this.setState({toggleFeatureForm: !this.state.toggleFeatureForm})
  }

  renderSubmit = (e, feature) => {
    e.preventDefault()

    fetch('http://localhost:3000/api/v1/klass_features', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_id: this.state.klass.id,
        features: feature
      })
    })
    .then(r => r.json())
    .then(data => {
      this.renderClassFeature(data)
    })
  }

  renderClassFeature = (newData) => {
    let remappedFeatures
    if (Number.isInteger(newData)) {
      remappedFeatures = this.state.klass.klass_features.filter(feature => {
        return feature.id !== newData
      })
    } else if (!this.state.klass.klass_features.find(el => el.id === newData.klass_feature.id)){
      remappedFeatures = this.state.klass.klass_features
      remappedFeatures.push(newData.klass_feature)
    } else if (typeof newData === 'object'){
      remappedFeatures = this.state.klass.klass_features.map(feature => {
        return feature.id === newData.id ? newData : feature
      })
    }

    return this.setState({
      klass: {
        ...this.state.klass,
        klass_features: remappedFeatures
      },
      toggleFeatureForm: false
    })
  }







  render() {
    console.log(this.state)
    return (
      <span>
        <Introduction klass={this.state.klass}/>
        <Table klass={this.state.klass}/>
        <Features klass={this.state.klass} renderClassFeature={this.renderClassFeature} />

        <button onClick={this.changeAddFeatureToggle}>{this.state.toggleFeatureForm ? "Hide new Feature Form" : "Add a new Class Feature"}</button>
        < br />
        < br />

        <FeatureForm toggleFeatureForm={this.state.toggleFeatureForm} renderSubmit={this.renderSubmit}/>
      </span>
    )
  }


}

export default Class
