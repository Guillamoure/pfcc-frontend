import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class HP extends React.Component {

  state = {
    activeFeature: 0,
    adjustHP: null
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
    let con = this.props.character_info.ability_scores.constitution
    const age = this.props.character.name === 'Maddox' && this.props.character_info.hardcode.age

    con += age === 'Young' ? -2 : 0
    con += age === 'Middle' ? -1 : 0
    con += age === 'Old' ? -2 : 0
    con += age === 'Venerable' ? -3 : 0

    return Math.floor((con  - 10) / 2)
  }

  renderDamaged = () => {
    // oh GOD please refactor

    let id = "none"
    if (this.props.character.lethal_damage && this.props.character.temp_hp){
      id = "temp-damage"
    } else if (this.props.character.lethal_damage){
      id = "damaged"
    } else if (this.props.character.temp_hp){
      id = "temporary"
    }
    return id
  }

  // firstClass = () => {
  //   let firstClassHD = this.props.character.klasses[0].hit_die
  //   return firstClassHD + this.conMod()
  // }

  renderCharacterHP = () => {
    let totalHP = 0
    this.props.character.character_klasses.forEach(klass => {
      if (klass.hp !== null) {
        totalHP += klass.hp
      }
      totalHP += this.conMod()
    })
    // totalHP += this.firstClass()
    // let firstID = this.props.character.klasses[0].id
    // klass_ids[firstID] = klass_ids[firstID] - 1
    // this.props.character.klasses.forEach(klass => {
    //   let hpPerLvl = (klass.hit_die/ 2) + 0.5
    //   totalHP += (hpPerLvl * klass_ids[klass.id])
    // })

    // <span style={{display: "inline-block"}}> <input className="narrow taller" type="number" name="adjustHP" value={this.props.adjustHP} onChange={this.props.renderChange}/>
    // </span>
    // <span style={{display: "inline-block", marginLeft: '.5em', marginRight: '.5em'}}>
    //   <div><button className="green hp-btn">-</button></div>
    //   <div><button className="red hp-btn">+</button></div>
    //   <div><button className="blue hp-btn">t</button></div>
    // </span>


    return (
      <span className='centered'>
        <div className='dull'><strong>Hit Points</strong></div>
        <div className='middle'>
          <span id={this.renderDamaged()} className='enhanced'>{totalHP - this.props.character.lethal_damage + this.props.character.temp_hp}</span>
          <span className='enhanced'>/{totalHP}</span>
          <span><button className='spacing' style={{boxShadow: "1px 1px 2px #000", borderRadius: ".5em"}} onClick={() => this.props.editModal("hitPoints")}>Adjust</button></span>
        </div>
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
      <div className='hp shadow shrink'>
      {this.renderCharacterHP()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default withRouter(connect(mapStateToProps)(HP))
