import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../localhost'

class NonClassSpellSummary extends React.Component {

  state = {
    spell: null
  }

  componentDidMount(){
    let spell
    if (!!this.props.spells.length){
      spell = this.props.spells.find(sp => sp.id === this.props.spellId)
      this.setState({spell: spell})
    } else {
      fetch(`${localhost}/api/v1/spells/${this.props.spellId}`)
        .then(r => r.json())
        .then(data => {
          spell = data.spell
          this.setState({spell: spell})
        })
    }
  }

  remappedActions = a => {
    switch(a){
      case 'Standard Action':
        return 'standard'
      case 'Swift Action':
        return 'swift'
      case 'Move Action':
        return 'move'
      case 'Full-Round Action':
        return 'full'
      case 'Immediate Action':
        return 'immediate'
      case 'Free Action':
        return 'free'
      default:
        return a
    }
  }

  renderClassName = () => {
    let action = this.remappedActions(this.state.spell.action.name)
    let { cmifu, magicItem } = this.props

    let isTheActionAvailable = !this.props.character_info.actions[action]
    let feature = magicItem.features.find(f => f.usage.id === cmifu.feature_usage_id)
    if (feature){
      let featureUsage = feature.usage

      let limit = featureUsage.limit
      let current = cmifu.current_usage || 0
      if (current >= limit){
        return 'cannot-cast'
      }
    }
    if (isTheActionAvailable){
      return action
    } else {
      return 'cannot-cast'
    }
  }

  renderClick = (action) => {
    console.log('action', action)
    if (action === 'cannot-cast'){
      return null
    } else {
      this.props.dispatch({type: 'TRIGGER ACTION', action})

      let { cmifu, magicItem, spellId } = this.props

      let feature = magicItem.features.find(f => f.usage.id === cmifu.feature_usage_id)
      if (feature){

        let remainingUsage = feature.usage.limit - cmifu.current_usage

        let fuso = feature.feature_usage_spell_options.find(so => so.spell_id === spellId)
        let count = fuso.cost
        if (remainingUsage <= 1 && feature.usage.destroy_after_use){
          console.log('delete')
          // delete fetch
          fetch(`${localhost}/api/v1/character_magic_items/${cmifu.character_magic_item_id}`, {
            method: 'DELETE'
          })
          .then(r => r.json())
          .then(data => {
            if (data.status === 404 || data.status === 500){
              console.log(data)
            } else {
              this.props.dispatch({type: 'CHARACTER', character: data.character })
            }
          })
        } else {
          console.log('patch')
          // patch fetch
          fetch(`${localhost}/api/v1/character_magic_items/${cmifu.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({count})
          })
          .then(r => r.json())
          .then(data => {
            if (data.status === 404 || data.status === 500){
              console.log(data)
            } else {
              this.props.dispatch({type: 'CHARACTER', character: data.character })
            }
          })
        }

      }
    }
  }

  renderRange = (cl) => {
    let range = this.state.spell.spell_range
    if (range.feet === 0){
      return range.name
    } else {
      let feet = range.feet + ((cl-1)*range.increase_per_level)
      return feet + ' ft'
    }
  }

  renderDuration = (cl) => {
    let { duration, time, unit_of_time, increase_per_level } = this.state.spell
    if (time === 0){
      return duration
    } else {
      let duration = time + ((cl-1)*increase_per_level)
      return duration !== 0 ? duration + ' ' + unit_of_time + 's' : duration + ' ' + unit_of_time
    }
  }

  renderDC = () => {
    let level = 0
    let wizard = this.state.spell.klass_spells.find(ks => ks.klass.name === 'Wizard')
    if (!wizard){
      let cleric = this.state.spell.klass_spells.find(ks => ks.klass.name === 'Cleric')
      if (!cleric){
        // something else
      } else {
        level = cleric.spell_level
      }
    } else {
      level = wizard.spell_level
    }
    let abilityScoreMod = Math.floor((level)/2)
    return 10 + level + abilityScoreMod
  }


  render(){
    const { magicItem } = this.props
    const { caster_level } = magicItem
    const cmiId = this.props.cmifu.character_magic_item_id

    let className = this.state.spell ? this.renderClassName() : null

    return (
      <React.Fragment>
      {this.state.spell &&
        <React.Fragment>
          <td >
            <button className={className} onClick={() => this.renderClick(className)}>
              <strong>
              Cast
              </strong>
            </button>
          </td>
          <td className='underline-hover' onClick={() => this.props.editModal('spell', null, this.state.spell.id)}>{this.state.spell.name}</td>
          <td>{this.renderRange(caster_level)}</td>
          <td>{this.renderDuration(caster_level)}</td>
          <td>{this.renderDC()}</td>
          <td>{this.state.spell.sr ? "Y" : "N"}</td>
          <td className='underline-hover' onClick={() => this.props.editModal('magic item', null, cmiId)}>{magicItem.name}</td>
        </React.Fragment>
      }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
    classes: state.classes,
    spells: state.spells
  }
}

export default connect(mapStateToProps)(NonClassSpellSummary)
