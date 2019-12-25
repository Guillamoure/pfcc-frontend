import React from 'react'
import { connect } from 'react-redux'

class Notice extends React.Component {

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


  render(){
    return(
      <span style={{padding: '1em'}}>
        <h3>Active Conditions</h3>
        {this.renderConditions()}
        <br/>
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
