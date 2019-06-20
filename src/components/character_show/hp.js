import React from 'react'
import _ from 'lodash'

class HP extends React.Component {

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

  conMod = () => {
    let con = this.props.character.constitution
    this.props.character.race.race_ability_score_modifiers.forEach(mod => {
      if ('Constitution' === mod.ability_score){
        con += mod.bonus
      }
    })
    if (this.props.character.anyBonus === 'Constitution'){
      con +=2
    }
    return Math.floor((con - 10) / 2)
  }

  firstClass = () => {
    let firstClassHD = this.props.character.klasses[0].hit_die
    return firstClassHD + this.conMod()
  }

  renderCharacterHP = () => {
    let totalHP = 0
    let klass_ids = {}
    this.props.character.character_klasses.forEach(klass => {
      klass_ids[klass.klass_id] = klass.level
    })
    totalHP += this.firstClass()
    let firstID = this.props.character.klasses[0].id
    klass_ids[firstID] = klass_ids[firstID] - 1
    this.props.character.klasses.forEach(klass => {
      let hpPerLvl = (klass.hit_die/ 2) + 0.5
      totalHP += (hpPerLvl * klass_ids[klass.id])
      totalHP += (this.conMod() * klass_ids[klass.id])
    })
    return (
      <span className='centered'>
        <div className='dull'><strong>Hit Points</strong></div>
        <div className='enhanced'>{Math.floor(totalHP)}</div>
      </span>
    )
    // this.props.character.klasses.map(klass => {
    //   if (klass.id <= klass_ids[feature.klass_id]){
    //     return (
    //       <li data-id={feature.id} onClick={this.changeActiveFeature} className='highlight'>
    //         <strong data-id={feature.id}>{feature.name}</strong>
    //         {this.state.activeFeature === feature.id && <div style={{color: '#000'}}>{feature.description}</div>}
    //       </li>
    //     )
    //   }
    //
    // })
  }

  // renderHP = (max_lvl, id) => {
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
      <div className='hp'>
      {this.renderCharacterHP()}
      </div>
    )
  }
}

export default HP
