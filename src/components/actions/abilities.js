import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class Abilities extends React.Component {

  // check all class features learned by this level (that are activatable),
  // class feature options (that are activatable),
  // racial traits (that are activatable)
  // list them with their action buttons

  renderAbilities = () => {
    // let option = this.collectClassFeatureOptions()
    switch(this.props.character.name){
      case 'Nettie':
        return this.nettie()
      case 'Merg':
        return this.merg()
      case 'Cedrick':
        return this.cedrick()
      case 'Maddox':
        return this.maddox()
      case 'Persephone':
        return this.pepper()
      default:
        return 0
    }
  }

  nettie = () => {
    const perf = this.props.character_info.hardcode.performance
    let className = 'move'
    if (perf){
      className = 'free'
    }
    let action = 'Activate'
    if (perf){
      action = 'Maintain'
    }
    return(
      <React.Fragment>
        <tr>
          <td><button className={className} onClick={() => this.props.editModal('performance', className)}><strong>{action}</strong></button></td>
          <td>Bardic Performance</td>
          <td className='table-details'>Select a performance to start</td>
        </tr>
      </React.Fragment>
    )
  }

  merg = () => {
    const power = this.props.character_info.hardcode.power
    const rage = this.props.character_info.hardcode.rage
    let powerClassName = 'free'
    if (power){
      powerClassName = 'cannot-cast'
    }
    let powerAction = 'Activate'
    if (power){
      powerAction = 'Active'
    }
    return(
      <React.Fragment>
        <tr>
          <td><button className={rage ? 'cannot-cast' : 'free'} onClick={() => this.props.editModal('rage')}><strong>{rage ? 'Active' : 'Activate'}</strong></button></td>
          <td>Rage</td>
          <td className='table-details'>+2 to melee attacks, thrown attacks, melee damage, will saves. -2 to AC. +14 temp hp</td>
        </tr>
        <tr>
          <td><button className={powerClassName} onClick={() => this.props.dispatch({type: 'POWER ATTACK'})}><strong>{powerAction}</strong></button></td>
          <td>Power Attack</td>
          <td className='table-details'>-2 to melee attacks, +4 to melee attack damage</td>
        </tr>
        {this.props.character_info.hardcode.rage && this.sparks()}
      </React.Fragment>
    )
  }

  maddox = () => {
    // const power = this.props.character_info.hardcode.power
    // let powerClassName = 'free'
    // if (power){
    //   powerClassName = 'cannot-cast'
    // }
    // let powerAction = 'Activate'
    // if (power){
    //   powerAction = 'Active'
    // }
    return(
      <React.Fragment>
        <tr>
          <td><button className='free' onClick={() => this.props.editModal('age')}><strong>Alter</strong></button></td>
          <td>Change Age</td>
          <td className='table-details'>Alter Age</td>
        </tr>
      </React.Fragment>
    )
  }

  pepper = () => {
    // const power = this.props.character_info.hardcode.power
    let hex = 'standard'
    if (this.props.character_info.actions.standard){
      hex = 'cast-standard'
    }
    let arcane = 'swift'
    if (this.props.character_info.actions.swift){
      arcane = 'cast-swift'
    }
    return(
      <React.Fragment>
        <tr>
          <td><button className={hex} onClick={() => this.props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})}><strong>Hex</strong></button></td>
          <td>Protective Luck Hex</td>
          <td className='table-details'>Target creature within 30 ft, if it's targeted by an attack roll, attacker must roll twice and take the worse result</td>
        </tr>
        <tr>
          <td><button className={hex} onClick={() => this.props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})}><strong>Hex</strong></button></td>
          <td>Fortune Hex</td>
          <td className='table-details'>Target creature within 30 ft, for one round, once a round, may reroll any ability check, attack roll, saving throw, or skill check, and take the better result. A creature can only benefit from this hex every 24 hours.</td>
        </tr>
        <tr>
          <td><button className={arcane} onClick={this.arcaneStrike}><strong>Activate</strong></button></td>
          <td>Arcane Strike</td>
          <td className='table-details'>As a swift action, you can imbue your weapons with a fraction of your power. For 1 round, your weapons deal +2 damage and are treated as magic for the purpose of overcoming damage reduction.</td>
        </tr>
      </React.Fragment>
    )
  }

  cedrick = () => {
    const power = this.props.character_info.hardcode.power
    let powerClassName = 'free'
    if (power){
      powerClassName = 'cannot-cast'
    }
    let powerAction = 'Activate'
    if (power){
      powerAction = 'Active'
    }
    return(
      <React.Fragment>
        <tr>
          <td><button className={powerClassName} onClick={() => this.props.dispatch({type: 'POWER ATTACK'})}><strong>{powerAction}</strong></button></td>
          <td>Power Attack</td>
          <td className='table-details'>-2 to melee attacks, +4 to melee attack damage</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Bull - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Bull - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Bull - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Bull - Combat Form (1 pt)</td>
          <td className='table-details'>On successful Bull Rush, make a melee attack against FF AC, push target back +5ft, and if impact hard surface deal melee attack damage (7 rounds)</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Bull - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Bull - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Bull - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Bull - Minor Form (1 pt)</td>
          <td className='table-details'>+2 bonus to Strength</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Bull - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Bull - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Bull - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Bull - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Bull</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Condor - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Condor - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Condor - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Condor - Combat Form (1 pt)</td>
          <td className='table-details'>Gain <em>Cleave</em> feat</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Condor - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Condor - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Condor - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Condor - Minor Form (1 pt)</td>
          <td className='table-details'>Can cast <em>feather fall</em></td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Condor - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Condor - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Condor - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Condor - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Condor</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Frog - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Frog - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Frog - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Frog - Combat Form (1 pt)</td>
          <td className='table-details'>Excrete a poison through claws. Select the type of Poison. Creatures that fail a DC 17 Fortitude save are affected.</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Frog - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Frog - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Frog - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Frog - Minor Form (1 pt)</td>
          <td className='table-details'>+4 bonus to Acrobatics when jumping and a +2 bonus to Swim</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Frog - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Frog - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Frog - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Frog - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Frog</td>
        </tr>
      </React.Fragment>
    )
  }

  renderShifterFormClass = (form, type, location, action, points) => {
    const activeForm = this.props.character_info.hardcode[type]
    const isActionAvailable = !this.props.character_info.actions[action]
    let className = action
    let button = 'Activate'
    if (activeForm === form && isActionAvailable){
      button = 'End'
      className = 'free'
    } else if (activeForm === form && !isActionAvailable){
      button = 'End'
      className = `cast-${action}`
    } else if (activeForm !== form && !isActionAvailable){
      className = 'cannot-cast'
    } else if (points > this.props.character_info.hardcode.points){
      className = 'cannot-cast'
    }
    return location === 'class' ? className : button
  }

  collectClassFeatureOptions = () => {
    let featuresNested = this.props.character.character_klasses.map(ck => {
      return ck.feature_options
    })
    let features = _.flatten(featuresNested)
    return features
  }

  sparks = () => {
    let className = 'swift'
    let eBlood = this.props.character_info.hardcode.eBlood || 0
    if (this.props.character_info.hardcode.eBloodActive){
      className = `cast-${className}`
    }
    if (eBlood === 3){
      className = 'cannot-cast'
    }
    let status = `Activate  (${3 - eBlood})`
    if (this.props.character_info.hardcode.eBloodActive){
      status = 'Active'
    }
    if (eBlood === 3){
      status = 'Spent'
    }
    return (
      <tr>
        <td><button className={className} onClick={() => this.props.dispatch({type: 'SPARKS'})}><strong>{status}</strong></button></td>
        <td>Lesser Elemental Blood (electricity)</td>
        <td>Deal +1d6 electricity damage on all Melee Attack this turn</td>
      </tr>
    )
  }

  shift = (detail, form, points, action, size) => {
    // if the action is available
    if (!this.props.character_info.actions[action]){
      // if the form the user clicked is already active
      if (this.props.character_info.hardcode[form] === detail){
        // clear it
        this.props.dispatch({type: 'SHIFT', detail: null, form, points: 0})
        // if you have enough point when you click
      } else if (this.props.character_info.hardcode.points >= points){
        // shift and fire off the action
        this.props.dispatch({type: 'SHIFT', detail, form, points})
        this.props.dispatch({type: 'TRIGGER ACTION', action})
      }
      if (size){
        console.log('dispatching size', size)
        this.props.dispatch({type: 'CHANGE SIZE', size, detail, form})
      }
      if (detail === 'Condor - Major'){
        this.props.dispatch({type: 'SPEED SHIFT', speed: 20})
      }
      if (detail === 'Frog - Combat'){
        if (this.props.character_info.hardcode.frogCombat){
          this.props.dispatch({type: 'FROG COMBAT', name: null})
        } else {
          this.props.editModal('frogCombat')
        }
      }
    }
  }

  arcaneStrike = () => {
    if (!this.props.character_info.actions.swift){
      this.props.dispatch({type: 'TRIGGER ACTION', action: 'swift'})
      this.props.dispatch({type: 'ARCANE STRIKE'})
    }
  }

  render() {
    return(
      <section>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
          {this.renderAbilities()}
          </tbody>
        </table>
      </section>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Abilities)
