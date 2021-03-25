import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../../localhost'
import { websocketFeatureDistribution } from '../../helper_functions/distributers/features'
import { updateStoredNotificationsAction } from '../../helper_functions/action_creator/popups'


class Notice extends React.Component {

  fetchDiscovered = (id, detail) => {
    fetch(`${localhost}/api/v1/${detail}_discovered/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 404 || data.status === 500){
          console.log(data)
        } else if (data.message){
          this.props.dispatch({type: 'DISCOVER EQUIPMENT', detail, id})
        } else {
          this.props.dispatch({type: 'CHARACTER', character: data.character })
        }
      })
    // patch fetch, make cmi discovered
    // get character, dispatch character info
  }

  renderAdditionalButtons = () => {
    switch(this.props.character.name){
      case("Nettie"):
        return this.nettie()
      default:
        return null
    }
  }

  dispatchMonster = (monster) => {
    this.props.dispatch({type: 'SUMMON MONSTER', monster})
  }

  nettie = () => {
    return(
      <section>
        <h3>Available Summoned Monsters</h3>
          <button onClick={() => this.dispatchMonster('air elemental')}>+1 Air Elemental</button>
          <button onClick={() => this.dispatchMonster('earth elemental')}>+1 Earth Elemental</button>
          <button onClick={() => this.dispatchMonster('fire elemental')}>+1 Fire Elemental</button>
          <button onClick={() => this.dispatchMonster('water elemental')}>+1 Water Elemental</button>
          <button onClick={() => this.dispatchMonster('lemure')}>+1 Lemure</button>
      </section>
    )
  }

  renderConditions = () => {
    return this.props.character_info.conditions.map(c => {
      return <button onClick={() => this.props.dispatch({type: 'CONDITION', condition: c})}>Remove {c}</button>
    })
  }

  renderActiveEffects = desc => {
    this.props.changeActiveEffects(desc)
    this.props.exitModal()
  }

  renderDispatch = type => {
    this.props.dispatch({type})
    this.props.exitModal()
  }

  newItems = () => {
    let undiscoveredCMIs = this.props.character.character_magic_items.filter(cmi => !cmi.discovered)
		let undiscoveredCPs = this.props.character.character_potions.filter(cp => !cp.discovered)
		let undiscoveredCSs = this.props.character.character_scrolls.filter(cs => !cs.discovered)
		let undiscoveredCWas = this.props.character.character_wands.filter(cw => !cw.discovered)
    let undiscoveredCWs = this.props.character.character_weapons.filter(cw => !cw.discovered)
    let undiscoveredCAs = this.props.character.character_armors.filter(cw => !cw.discovered)
    let newItems = [...undiscoveredCMIs, ...undiscoveredCPs, ...undiscoveredCSs, ...undiscoveredCWas, ...undiscoveredCWs, ...undiscoveredCAs]

    if (!!newItems.length){
      return (
        <div>
          <h3>New Items</h3>
          <ul>
            {this.newItemLI(undiscoveredCMIs, 'character_magic_items')}
						{this.newItemLI(undiscoveredCPs, 'character_potions')}
						{this.newItemLI(undiscoveredCSs, 'character_scrolls')}
						{this.newItemLI(undiscoveredCWas, 'character_wands')}
            {this.newItemLI(undiscoveredCWs, 'character_weapons')}
            {this.newItemLI(undiscoveredCAs, 'character_armors')}
          </ul>
        </div>
      )
    }
  }

  newItemLI = (array, detail) => {

    return array.map((ni, idx) => {
      let name = ''
      name = detail ==='character_magic_items' ? (ni.known ? ni.magic_item.name : ni.false_desc ?? "A New Magic Item") : name
      name = detail ==='character_potions' ? (ni.known ? `${_.capitalize(ni.potion_or_oil)} of ${ni.spell.name}` : "A Mysterious Liquid") : name
      name = detail ==='character_scrolls' ? (ni.known ? `Scroll of ${ni.spell.name}` : "A Strange Scroll") : name
      name = detail ==='character_wands' ? (ni.known ? `Wand of ${ni.spell.name}` : "A Curious Wand") : name
      name = detail === 'character_weapons' ? (ni.name ? ni.name : ni.weapon.name) : name
      name = detail === 'character_armors' ? (ni.name ? ni.name : ni.armor.name) : name
      return <li key={(idx+10)*3-1}>{name} <button onClick={() => this.fetchDiscovered(ni.id, detail)}>Collect</button></li>
    })
  }

  tempFeatures = () => {
    let temp = this.props.character_info.features.filter(f => f.duration === 'temporary')
    return temp.map(t => <button style={{display: 'block', margin: 'auto'}} onClick={() => this.props.dispatch({type: 'ACTIVATED FEATURE', feature:{source: t.source, remove: true}})}>Cancel {t.source}'s Effect</button>
		)
  }

	renderStoredNotifications = () => {
		return this.props.storedNotifications.map(sn => {
			const { payload, source, options } = sn
			const renderSNClick = () => {
				websocketFeatureDistribution(payload, source, options)

				let updateStoredNotifications = [...this.props.storedNotifications]
				updateStoredNotifications = updateStoredNotifications.filter(usn => usn.source.sourceName !== source.sourceName && usn.source.senderName !== source.senderName)
				updateStoredNotificationsAction(updateStoredNotifications)
			}

			return (
				<button onClick={renderSNClick}>{source.sourceName} ({source.senderName})</button>
			)
		})
	}


  render(){
    return(
      <span style={{padding: '1em'}}>
        {this.newItems()}
				{this.renderStoredNotifications()}
        {this.tempFeatures()}
        <h3>Active Conditions</h3>
        {this.renderConditions()}

        {this.renderAdditionalButtons()}
      </span>
    )
  }
}
//
// {this.props.character_info.hardcode.stealTime && <button onClick={() => this.props.dispatch({type: 'STEAL TIME'})}>Return Time</button>}
// <br/>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch('HELMSMAN')}>Sasea Bitch Helmsman</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch('CREW')}>Sasea Bitch crew</button>
// <h3>Bardic Performances</h3>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Inspire Courage: +2 to Attack and Damage rolls, charm saves, and fear saves")}>Inspire Courage</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Inspire Competence: +3 to One Specific Skill")}>Inspire Competence</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Countersong: Reroll Sonic or language-dependent saves")}>Countersong</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Distraction: Affected by illusion magic")}>Distraction</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Fascinate")}>Fascinate</button>
// <h3>Hexes</h3>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Protective Luck: Attackers have disadvantage")}>Protective Luck</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Fortune: Target has advantage on one roll per round")}>Fortune</button>
// <h3>Spell Effects</h3>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("ENLARGE")}>Enlarged</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("REDUCE")}>Reduced</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("EXPEDITIOUS RETREAT")}>Expeditious Retreat</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("SWIM SPEED")}>Swim Speed 30 ft</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("SWIM 20")}>Swim Speed 20 ft</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("LAND 10")}>Land Speed +10 ft</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("LAND 20")}>Land Speed +20 ft</button>
// <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("QUICK")}>Quick Reaction</button>

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
		storedNotifications: state.storedNotifications
  }
}

export default connect(mapStatetoProps)(Notice)
