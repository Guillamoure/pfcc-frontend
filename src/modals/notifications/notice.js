import React from 'react'
import { connect } from 'react-redux'
import localhost from '../../localhost'

class Notice extends React.Component {

  fetchDiscovered = (id) => {
    fetch(`${localhost}/api/v1/character_magic_items_discovered/${id}`, {
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
    let newItems = this.props.character.character_magic_items.filter(cmi => !cmi.discovered)
    if (!!newItems.length){
      return (
        <div>
          <h3>New Items</h3>
          <ul>
            {newItems.map((cmi, idx) => <li key={(idx+10)*3-1}>{cmi.known ? cmi.magic_item.name : cmi.false_desc} <button onClick={() => this.fetchDiscovered(cmi.id)}>Collect</button></li>)}
          </ul>
        </div>
      )
    }
  }

  tempFeatures = () => {
    let temp = this.props.character_info.features.filter(f => f.duration === 'temporary')
    return temp.map(t => <button style={{display: 'block', margin: 'auto'}} onClick={() => this.props.dispatch({type: 'ACTIVATED FEATURE', feature:{source: t.source, remove: true}})}>Cancel {t.source}'s Effect</button>
)
  }


  render(){
    return(
      <span style={{padding: '1em'}}>
        {this.newItems()}
        {this.tempFeatures()}
        <h3>Active Conditions</h3>
        {this.renderConditions()}
        {this.props.character_info.hardcode.stealTime && <button onClick={() => this.props.dispatch({type: 'STEAL TIME'})}>Return Time</button>}
        <br/>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch('HELMSMAN')}>Sasea Bitch Helmsman</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch('CREW')}>Sasea Bitch crew</button>
        <h3>Bardic Performances</h3>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Inspire Courage: +2 to Attack and Damage rolls, charm saves, and fear saves")}>Inspire Courage</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Inspire Competence: +3 to One Specific Skill")}>Inspire Competence</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Countersong: Reroll Sonic or language-dependent saves")}>Countersong</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Distraction: Affected by illusion magic")}>Distraction</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Fascinate")}>Fascinate</button>
        <h3>Hexes</h3>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Protective Luck: Attackers have disadvantage")}>Protective Luck</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderActiveEffects("Fortune: Target has advantage on one roll per round")}>Fortune</button>
        <h3>Spell Effects</h3>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("ENLARGE")}>Enlarged</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("REDUCE")}>Reduced</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("EXPEDITIOUS RETREAT")}>Expeditious Retreat</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("SWIM SPEED")}>Swim Speed 30 ft</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("SWIM 20")}>Swim Speed 20 ft</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("LAND 10")}>Land Speed +10 ft</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("LAND 20")}>Land Speed +20 ft</button>
        <button style={{display: 'block', margin: 'auto'}} onClick={() => this.renderDispatch("QUICK")}>Quick Reaction</button>
        {this.renderAdditionalButtons()}
      </span>
    )
  }
}
const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Notice)
