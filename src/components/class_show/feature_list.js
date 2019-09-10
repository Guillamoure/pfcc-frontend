import React from 'react'
// import _ from 'lodash'

import Feature from './feature'

class Features extends React.Component {

  renderFeatures = () => {
    const sortedFeatures = this.props.klass.klass_features.sort((a, b) => {
      return a.level_learned - b.level_learned
    })
    // IF I WANT TO SHOW ON A FEATURE IF IT IS LEARNED MULTIPLE TIMES
    // const multiLevelAbilities = {}
    // sortedFeatures.forEach(feature => {
    //   if (multiLevelAbilities[feature.name]){
    //     multiLevelAbilities[feature.name].push(feature.level_learned)
    //   } else {
    //     multiLevelAbilities[feature.name] = []
    //     multiLevelAbilities[feature.name].push(feature.level_learned)
    //   }
    // })
    //
    // IF I WANT TO HAVE THE FEATURE ONLY SHOW ONCE
    // const uniqueFeatures = []
    // sortedFeatures.forEach(feature => {
    //   let duplicates = 0
    //   uniqueFeatures.forEach(uniq => {
    //     if (uniq.name === feature.name && uniq.description === feature.description) {
    //       duplicates = duplicates + 1
    //     }
    //   })
    //   if (duplicates === 0){
    //     uniqueFeatures.push(feature)
    //   }
    // })

    // return uniqueFeatures.map(feature => {
    //   return <Feature key={feature.id} feature={feature}  klass_name={this.props.klass.name} renderClassFeature={this.props.renderClassFeature} multiLevelAbilities={multiLevelAbilities[feature.name]}/>
    // })

    return sortedFeatures.map(feature => {
      return <Feature key={feature.id} feature={feature} klass_name={this.props.klass.name} renderClassFeature={this.props.renderClassFeature} modal={this.props.modal} toggleModal={this.props.toggleModal}/>
    })
  }

  render () {
    return (
      <span className='show'>
        {this.props.klass.klass_features && this.renderFeatures()}
      </span>
    )
  }



}

export default Features
