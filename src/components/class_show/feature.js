import React from 'react'
import _ from 'lodash'
// import EditFeature from './edit_feature'

class Feature extends React.Component {

  renderClick = (option) => {
    console.log(option)
    console.log("the id for this feature is", this.props.feature.id)
  }

  render () {
    return (
      <span>
        <ul>
          <span><strong>{this.props.feature.name}</strong></span>
          <button onClick={() => this.renderClick("edit")}>Edit</button>
          <button onClick={() => this.renderClick("delete")}>Delete</button>
          <li>A {this.props.klass_name} learns this at <strong>level {this.props.feature.level_learned}</strong></li>
          <li>Description: {this.props.feature.description}</li>
          < br />
        </ul>
      </span>
    )
  }



}

export default Feature
