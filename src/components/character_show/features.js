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
    features = this.circumventFeatures(this.props.character.name, features)
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

  circumventFeatures = (name, features) => {
    let newFeatures = []
    let replacedFeatures = []
    let addedFeatures = []
    if (name === 'Nettie'){
      replacedFeatures = ["Bardic Knowledge", "Well-Versed", "Versatile Performance"]
      addedFeatures = [
        {
          id: 1001,
          actions: [],
          description: 'A chronicler of worlds can take 10 on Religion checks. A number of times per day equal to her Intelligence modifier, she can take 20 on a Religion check. This ability stacks with that gained by lore master at 5th level.\n\nA chronicler of worlds can attempt all Knowledge checks untrained.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 10,
          name: "Planar Lore",
          spellcasting: null
        },
        {
          id: 1002,
          actions: [],
          description: 'A chronicler of worlds rejects cosmic morality. At 2nd level, she does not take penalties imposed by planar alignment traits, and she gains a +4 bonus on saving throws against spells and effects that vary based on their target’s alignment.',
          feature_levels: [{level: 2}],
          feature_options: [],
          klass_id: 10,
          name: "Amoral Scholar",
          spellcasting: null
        },
        {
          id: 1003,
          actions: [],
          description: 'A chronicler of worlds seeks to emulate history’s greatest scribe; gaining insight into widely varying subjects, from anatomy to discourse. At 2nd level, a chronicler of worlds selects a skill from the following list: Bluff, Diplomacy, Finesse, Heal, Intimidate, Profession (scribe), Sense Motive, or Survival. When attempting skill checks of that type, a chronicler can use her Linguistics skill bonus in place of her bonus with the chosen skill. At 6th level and every 4 levels thereafter, a chronicler of worlds selects an additional skill to gain this benefit.',
          feature_levels: [{level: 2}, {level: 6}, {level: 10}, {level: 14}, {level: 18}],
          feature_options: [],
          klass_id: 10,
          name: "Scrivener’s Versatility",
          spellcasting: null
        }
      ]
    }
    newFeatures = features.filter(f => !replacedFeatures.includes(f.name))
    addedFeatures.forEach(af => newFeatures.push(af))
    return newFeatures
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
