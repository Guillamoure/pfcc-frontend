import React from 'react'
import { connect } from 'react-redux'

import ActionTabs from './action_tabs'
import Spellcasting from '../components/actions/spellcasting'
import Abilities from '../components/actions/abilities'
import Attacks from '../components/actions/attacks'
import Basics from '../components/actions/basics'
import Equipment from '../components/actions/equipment'
import CombatManeuvers from '../components/actions/basics/combat_maneuver'
import Misc from '../components/actions/misc'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import { pluser } from '../utils/fuf'
import { baseAttackBonus, pluserAB, combatManeuvers } from '../utils/calculations/attack_bonus'
import { tooltipAction, diceAction } from '../utils/action_creator/popups'
import { abilityScoreMod } from '../utils/calculations/ability_scores'


class Actions extends React.Component {
  state= {
    activeTab: "Attacks"
  }

  componentDidMount(){
    if (localStorage.computer === "false"){
      this.setState({activeTab: 'none'})
    }
  }

  renderTabClick = (choice) => {
    if (localStorage.computer === "false"){
      if (choice === this.state.activeTab){
        this.setState({activeTab: 'none'})
      } else {
        this.setState({activeTab: choice})
      }
    } else {
      this.setState({activeTab: choice})
    }
  }

  renderMobileTabClassNames = (tab) => {
    let className = ''
    if (tab === this.state.activeTab){
      className += 'mobile-feature-selected-tab'
    } else {
      className += 'mobile-feature-tab'
    }
    className = tab === 'Attacks' ? className + ' mobile-tab-top' : className
    className = tab === 'Equipment' && tab !== this.state.activeTab ? className + ' mobile-tab-bottom' : className
    className += ' shadow'
    return className
  }

	renderAttackDetails = () => {
		let bab = pluser(baseAttackBonus(this.props.characterInfo.classes, this.props.character.uniq_klasses))
		let melee = pluserAB(this.props.character, this.props.characterInfo, "melee")
		let ranged = pluserAB(this.props.character, this.props.characterInfo, "range")
		let cm = combatManeuvers(this.props.character, this.props.characterInfo)
		let cmb = pluser(cm.bonus)
		let cmd = cm.defense

		const dispatchTooltip = (e, message) => {
			let element = e.target

			tooltipAction(message, element)

		}



		let pertinentTabs = ["Attacks", "Tactics", "Combat Maneuvers"]
		if (pertinentTabs.includes(this.state.activeTab)) {
			let init = this.calcInit()
			return (
				<div>
					<strong onMouseOver={(e) => dispatchTooltip(e, "Base Attack Bonus")} onMouseOut={(e) => dispatchTooltip(e, "Base Attack Bonus")}>BAB:</strong> {bab} | <strong>Melee AB</strong> <span style={{border: `1px solid #${this.props.settings.borderColor}`, borderRadius: "0.3em", cursor: "default", padding: "1px 2px"}} onClick={() => this.rollDice("Melee Attack Roll", melee)}>{melee}</span> | <strong>Ranged AB</strong> <span style={{border: `1px solid #${this.props.settings.borderColor}`, borderRadius: "0.3em", cursor: "default", padding: "1px 2px"}} onClick={() => this.rollDice("Ranged Attack Roll", ranged)}>{ranged}</span> | <strong>Initiative:</strong> <span style={{border: `1px solid #${this.props.settings.borderColor}`, borderRadius: "0.3em", cursor: "default", padding: "1px 2px"}} onClick={() => this.rollDice("Initiative", init)}>{init}</span>
					<br/>
					<strong onMouseOver={(e) => dispatchTooltip(e, "Combat Maneuver Bonus")} onMouseOut={(e) => dispatchTooltip(e, "Combat Maneuver Bonus")}>CMB</strong> <span style={{border: `1px solid #${this.props.settings.borderColor}`, borderRadius: "0.3em", cursor: "default", padding: "1px 2px"}} onClick={() => this.rollDice("Combat Maneuver Check", cmb)}>{cmb}</span> | <strong onMouseOver={(e) => dispatchTooltip(e, "Combat Maneuver Defense")} onMouseOut={(e) => dispatchTooltip(e, "Combat Maneuver Defense")}>CMD</strong> {cmd}
				</div>
			)
		} else {return null}
	}

	calcInit = () => {
		const initiativeArray = () => {
			// NEW DATA
			let array = []
			let permanent = 0
			let temporary = 0

			let abilityMod = abilityScoreMod("dexterity")
			let permAbilityMod = abilityScoreMod("dexterity", true)

			if (permAbilityMod !== abilityMod) {
				temporary += abilityMod - permAbilityMod
				permanent += permAbilityMod
			} else {
				permanent += abilityMod
			}
			if (this.props.character.name === "Dink Weatherbyrst"){
				permanent += 4
			}
			if (this.props.character.name === "Iyugi"){
				permanent += 2
			}

			array.push(permanent)
			array.push(temporary)
			return array
		}


		// const bonusPenaltyInit = () => {
		// 	let temp = initiativeArray()[1]
		// 	let color = `#${this.props.settings.textColor}`
		// 	if (temp > 0){color = "green"}
		// 	if (temp < 0){color = "maroon"}
		// 	return color
		// }

		const calculateInitiative = () => {
			let initArray = initiativeArray()
			return pluser(initArray[0] + initArray[1])
		}

		// const initColor = bonusPenaltyInit()

		return calculateInitiative()
	}

	rollDice = (name, modifier) => {
		let obj = {rollName: name, modifier: parseInt(modifier), die: 20, count: 1}
		diceAction(obj)
	}



  render(){
    if (localStorage.computer === "true"){
      return(
        <div className="actions shadow" style={{boxShadow: `5px 4px 2px #${this.props.settings.shadeColor}`, opacity: "0.95", backgroundColor: `#${this.props.settings.bubbleColor}`, borderColor: `#${this.props.settings.borderColor}`}}>
          <ActionTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
          <div className="dynamic-size" style={{height: '90%'}}>
						{this.renderAttackDetails()}
	          {this.state.activeTab === "Attacks" && <Attacks editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
	          {this.state.activeTab === "Tactics" && <Basics renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
	          {this.state.activeTab === "Combat Maneuvers" && <CombatManeuvers />}
	          {this.state.activeTab === "Spells" && <Spellcasting />}
	          {this.state.activeTab === "Abilities" && <Abilities editModal={this.props.editModal}/>}
          </div>
        </div>
      )
    } else if (localStorage.computer === "false"){
      return (
        <>
          <div className={this.renderMobileTabClassNames("Attacks")} onClick={() => this.renderTabClick("Attacks")}>Attacks {this.state.activeTab === "Attacks" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Attacks" && <Attacks editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut} editSidebar={this.props.editSidebar}/>}
          <div className={this.renderMobileTabClassNames("Basics")} onClick={() => this.renderTabClick("Basics")}>Basics {this.state.activeTab === "Basics" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Tactics" && <Basics renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
          <div className={this.renderMobileTabClassNames("Spells")} onClick={() => this.renderTabClick("Spells")}>Spells {this.state.activeTab === "Spells" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Spells" && <Spellcasting editModal={this.props.editModal} clickOut={this.props.clickOut}/>}
          <div className={this.renderMobileTabClassNames("Abilities")} onClick={() => this.renderTabClick("Abilities")}>Abilities {this.state.activeTab === "Abilities" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Abilities" && <Abilities editModal={this.props.editModal}/>}
          <div className={this.renderMobileTabClassNames("Equipment")} onClick={() => this.renderTabClick("Equipment")}>Equipment {this.state.activeTab === "Equipment" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Equipment" && <Equipment editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
        </>
      )
    }

  }
}
// {this.state.activeTab === "Attacks" && <Features character={this.props.character} />}


/////////////////////////////
////// COLOR SCHEME /////////
/////////////////////////////

// Full-round Action: Purple
// Standard Action: Blue
// Swift Action: Yellow
// Move Action: Green
// Immediate Action: Red
// 10 minutes/1 hours/1 minute, etc.: brown? gold?
// Free Action: Silver

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    characterInfo: state.character_info,
		character: state.character,
		settings: state.settings
  }
}


export default connect(mapStateToProps)(Actions)
