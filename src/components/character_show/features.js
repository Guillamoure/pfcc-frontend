import React from 'react'
import _ from 'lodash'

class Features extends React.Component {

  state = {
    activeFeature: 0
  }

  changeActiveFeature = (e) => {
    let id = _.parseInt(e.target.dataset.id)
    if (this.state.activeFeature === id) {
      this.setState({activeFeature: 0})
    } else {
      this.setState({activeFeature: id})
    }
  }

  renderClassFeatures = () => {
    let klass_ids = {}
    this.props.character.character_klasses.forEach(klass => {
      klass_ids[klass.klass_id] = klass.level
    })
    return this.props.character.klass_features.map(feature => {
      if (feature.level_learned <= klass_ids[feature.klass_id]){
        return (
          <li data-id={feature.id} onClick={this.changeActiveFeature} className='highlight'>
            <strong data-id={feature.id}>{feature.name}</strong>
            {this.state.activeFeature === feature.id && <div style={{color: '#000'}}>{feature.description}</div>}
          </li>
        )
      }

    })
  }

  // renderFeatures = (max_lvl, id) => {
  //   this.props.character.klass_features.map(feature => {
  //     if (feature.level_learned <= max_lvl && feature.klass_id === id){
  //       return (
  //         <div>
  //           <span>{feature.name}</span>
  //           <span>{feature.description}</span>
  //         </div>
  //       )
  //     }
  //   })
  // }

  render () {
    return(
      <div style={{padding: '1em'}}>
      {this.renderClassFeatures()}
      </div>
    )
  }
}

export default Features
