import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

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
    // let klass_ids = {}
    // this.props.character.character_klasses.forEach(klass => {
    //   klass_ids[klass.klass_id] = klass.level
    // })
    let klasses = [...this.props.character.uniq_klasses]
    let justFeatures = klasses.map(kl => kl.klass_features)
    let features = _.flatten(justFeatures)
    return features.map(feature => {
      let level = this.props.character_info.classes.find(cl => cl.id === feature.klass_id).level
      let startingLevel = 20
      feature.feature_levels.forEach(fl => {
        if (fl.level < startingLevel){
          startingLevel = fl.level
        }
      })
      if (startingLevel <= level){
        return (
          <li data-id={feature.id} onClick={this.changeActiveFeature} className='highlight'>
            <strong data-id={feature.id}>{feature.name}</strong>
            {this.state.activeFeature === feature.id && <div style={{color: '#000'}}>{feature.description}</div>}
          </li>
        )
      } else {
        return null
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character_info: state.character_info,
    classes: state.classes
  }
}


export default connect(mapStateToProps)(Features)
