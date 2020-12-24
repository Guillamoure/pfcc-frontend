import React from 'react'
// import _ from 'lodash'
import { sortCompositeKlassFeatures } from '../../utils/calculations/class'

import Feature from './feature'

const Features = props => {

  const renderFeatures = () => {
		const sortedFeatures = sortCompositeKlassFeatures(props.klass.klass_features, props.chosenArchetypes)

    return sortedFeatures.map(feature => {
      return <Feature key={feature.id} feature={feature} klass_name={props.klass.name} renderClassFeature={props.renderClassFeature} modal={props.modal} toggleModal={props.toggleModal}/>
    })
  }

  return (
    <ul className='show'>
      {props.klass.klass_features && renderFeatures()}
    </ul>
  )

}

export default Features
