import React from 'react'
import _ from 'lodash'

import Introduction from '../components/class_show/introduction'
import Table from '../components/class_show/table'
import Features from '../components/class_show/feature_list'
import FeatureForm from '../components/class_show/feature_form'

class Class extends React.Component {

  state ={
    klass : {},
    toggleCreateFeature: false
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
    this.setState({toggleCreateFeature: !this.state.toggleCreateFeature})
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
      this.setState({
        klass: {
          ...this.state.klass,
          klass_features: [
            ...this.state.klass.klass_features,
            data.klass_feature
          ]
        },
        toggleCreateFeature: false
      })
    })
  }







  render() {
    console.log(this.state)
    return (
      <span>
        <Introduction klass={this.state.klass}/>
        <Table klass={this.state.klass}/>
        <Features klass={this.state.klass}/>

        <button onClick={this.changeAddFeatureToggle}>{this.state.toggleCreateFeature ? "Hide new Feature Form" : "Add a new Class Feature"}</button>
        < br />
        < br />

        <FeatureForm toggleCreateFeature={this.state.toggleCreateFeature} klass={this.state.klass} renderSubmit={this.renderSubmit}/>
      </span>
    )
  }


}

export default Class
