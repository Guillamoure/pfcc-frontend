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
          <td><button className='long' onClick={() => this.props.dispatch({type: 'AUTUMN EQUINOX'})}><strong>Transform</strong></button></td>
          <td>Transformation Sequence</td>
          <td className='table-details'>As an action that takes 5 rounds (30 seconds), <a className='underline-hover' href='https://youtu.be/cirhQ8iLdbw?t=1m21s' target='_blank' rel='noopener noreferrer'>transform</a> into {this.props.character_info.hardcode.autumn ? 'Persephone' : 'the Autumn Equinox'}.</td>
        </tr>
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
    const hc = this.props.character_info.hardcode
    const power = this.props.character_info.hardcode.power
    const swift = this.props.character_info.actions.swift
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
          <td><button className={hc.init_reroll || swift ? 'cannot-cast' : 'swift'} onClick={() => this.taalmon('init')}><strong>Reroll</strong></button></td>
          <td>Ta'al'mon Ancestral Handwraps - Initiative Reroll</td>
          <td className='table-details'>Reroll Initiative with a bonus equal to your Dex mod</td>
        </tr>
        <tr>
          <td><button className={hc.double_damage ? 'cannot-cast' : 'free'} onClick={() => this.taalmon('damage')}><strong>Damage</strong></button></td>
          <td>Ta'al'mon Ancestral Handwraps - Additional Damage</td>
          <td className='table-details'>On your next attack, if you hit, roll double the dice for damage. Stacks on critical hits, does not stack with precision damage.</td>
        </tr>
        <tr>
          <td><button className={hc.taal_tele || swift ? 'cannot-cast' : 'swift'} onClick={() => this.taalmon('teleport')}><strong>Teleport</strong></button></td>
          <td>Ta'al'mon Ancestral Handwraps - Teleport</td>
          <td className='table-details'>If you make an unarmed attack on a creature your size or smaller, teleport to the opposite side of them.</td>
        </tr>
        {hc.combat === 'Squid - Combat' ? this.squidCombat() : null}
        {hc.minor === 'Squid - Minor' ? this.squidMinor() : null}
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
        <tr>
          <td><button className={this.renderShifterFormClass('Squid - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Squid - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Squid - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Squid - Combat Form (1 pt)</td>
          <td className='table-details'>Summon ink cloud for 1 round, or longer if underwater. Grow two tentacle appendages.</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Squid - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Squid - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Squid - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Squid - Minor Form (1 pt)</td>
          <td className='table-details'>Jet up to {hc.speed * 2} ft in any direction</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Squid - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Squid - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Squid - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Squid - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Squid</td>
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

  taalmon = (type) => {
    if (!this.props.character_info.actions.swift && !this.props.character_info.hardcode.init_reroll && type === 'init'){
      this.props.dispatch({type: 'TRIGGER ACTION', action: 'swift'})
      this.props.dispatch({type: 'INIT REROLL'})
    }
    if (!this.props.character_info.actions.swift && !this.props.character_info.hardcode.init_reroll && type === 'damage'){
      this.props.dispatch({type: 'DOUBLE DAMAGE'})
    }
    if (!this.props.character_info.actions.swift && !this.props.character_info.hardcode.taal_tele && type === 'teleport'){
      this.props.dispatch({type: 'TRIGGER ACTION', action: 'swift'})
      this.props.dispatch({type: 'TAALMON TELEPORT'})
    }
  }

  squidCombat = () => {
    let className = !this.props.character_info.actions.standard ? 'standard' :'cannot-cast'
    return (
      <tr>
        <td><button className={className} onClick={() => this.props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})}><strong>Create</strong></button></td>
        <td>Ink Cloud</td>
        <td className='table-details'>Fills a 5-foot square with an ink cloud for 1 round, or 4 rounds underwater. If any attack would go through the cloud, the defending creature gains a +5 circumstance bonus. This effect otherwise acts as <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 63)}>obscuring mist</em>.</td>
      </tr>
    )
  }

  squidMinor = () => {
    let className = !this.props.character_info.actions.move ? 'move' :'cannot-cast'
    let limits = this.props.character_info.hardcode.limits
    let amount
    if (limits){
      let found = limits.find(l => l.name === 'Squid - Minor')
      amount = found ? 4 - found.cast : 4
    } else {
      amount = 4
    }
    className = amount === 0 ? 'cannot-cast' : className
    return (
      <tr>
        <td><button className={className} onClick={className !== 'cannot-cast' ? () => this.renderLimit('Squid - Minor', 4) : null}><strong>Jet</strong></button></td>
        <td>Squid Jet ({amount}/4)</td>
        <td className='table-details'>Jet up to {this.props.character_info.hardcode.speed * 2} ft in one direction. If you impact a surface, take 2d8 bludgeoning damage. If you are underwater, you move up to {this.props.character_info.hardcode.speed * 4} ft, and if you impact a surface, take 2d4 bludgeoning damage.</td>
      </tr>
    )
  }

  renderLimit = (name, limit, startingValue) => {
    if (limit){
      // if limits exist in redux
      let limits = this.props.character_info.hardcode.limits
      // if limits doesn't exist, dispatch
      // if limits does exist, try to find the specifc one
      // if that one isn't found, dispatch
      // if that one is found, check to see if the number of casts is equal to the limit
      // if casts is less than limit, dispatch
      // if casts is equal to limit, don't
      if (limits){
        let found = this.props.character_info.hardcode.limits.find(l => l.name === name)
        if (found){
          if (startingValue && found.cast < startingValue){
            this.props.dispatch({type: 'LIMIT CASTING', name})
          } else if (found.cast < limit){
            this.props.dispatch({type: 'LIMIT CASTING', name})
          }
        } else {
          this.props.dispatch({type: 'LIMIT CASTING', name})
        }
      } else {
        this.props.dispatch({type: 'LIMIT CASTING', name})
      }
    }
    if (name === 'Squid - Minor'){
      this.props.dispatch({type: 'TRIGGER ACTION', action: 'move'})
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
