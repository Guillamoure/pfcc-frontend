import React from 'react'
import _ from 'lodash'

import Feature from './feature'

class Features extends React.Component {

  renderFeatures = () => {
    const sortedFeatures = this.props.klass.klass_features.sort((a, b) => {
      return a.level_learned - b.level_learned
    })
    return sortedFeatures.map(feature => {
      return <Feature key={feature.id} feature={feature} klass_name={this.props.klass.name} />
    })
  }

  render () {
    return (
      <span>
        {this.props.klass.klass_features && this.renderFeatures()}
      </span>
    )
  }



}

export default Features
