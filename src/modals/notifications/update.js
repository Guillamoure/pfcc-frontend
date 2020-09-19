import React from 'react'
import { connect } from 'react-redux'
import * as SpellcastingCalculations from '../../helper_functions/calculations/spellcasting'
import { modalAction } from '../../helper_functions/action_creator/popups'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import SkillRanks from '../../components/skill_ranks'
import PrepareSpells from '../../container/prepare_spells'


class Update extends React.Component {

  state= {
    activeProblem: ""
  }

  needsRanks = () => {
    if (this.props.character.character_skillset_skills.length === 0){
      return true
    }
    let totalSkillRanks = 0
    this.props.character.uniq_klasses.forEach(klass => {
      let level = this.props.character_info.classes.find(cl => cl.id === klass.id).level
      totalSkillRanks += (klass.skill_ranks * level)
    })
    let appliedSkillRanks = 0
    this.props.character.character_skillset_skills.forEach(chsss => {
      appliedSkillRanks += chsss.ranks
    })
    if (appliedSkillRanks < totalSkillRanks){
      return true
    } else {
      return false
    }
  }

  addSkillRanks = () => {
    if (this.needsRanks() && this.state.activeProblem !== "Ranks"){
      return <div onClick={() => this.setState({activeProblem: "Ranks"})}><FontAwesomeIcon icon={faExclamationTriangle} color='#ffd800' />You have some Skill Ranks to spend</div>
    }
    if (this.needsRanks() && this.state.activeProblem === "Ranks"){
      return <SkillRanks exitModal={this.props.exitModal}/>
    }
  }

  isThisCasterPrepared = (klassId) => {
    // REFACTOR
    // Doesn't check to see if spells can be cast at their current level
    // Just at all levels
    // Paladin/Ranger at lvl 4/3, etc.
    let klass = this.props.classes.find(cl => cl.id === klassId)
    let isThisKlassACaster = klass.klass_features.find(kf => kf.spellcasting)
    if (!isThisKlassACaster){
      return false
    }
    let spellcasting = isThisKlassACaster.spellcasting
    return spellcasting.prepared
  }

  prepareSpells = () => {
    let prepared = false
    this.props.character.uniq_klasses.forEach(kl => {
      if (this.isThisCasterPrepared(kl.id)){
        prepared = true
      }
    })
    if (!this.props.character.is_done_preparing_spells && prepared && this.state.activeProblem !== "Prepare"){
      return <div onClick={() => this.setState({activeProblem: "Prepare"})}><FontAwesomeIcon icon={faExclamationTriangle} color='#ffd800' />You have to prepare your spells!</div>
    }
    if (!this.props.character.is_done_preparing_spells && prepared && this.state.activeProblem === "Prepare"){
      return <PrepareSpells exitModal={this.props.exitModal}/>
    }
  }

	manageKnownSpells = () => {
		let spellcastingData = SpellcastingCalculations.allRemainingSpellsPerDay()
		return spellcastingData.map((scData, i) => {
			if (scData.spellcasting.known_spell_list){
				return this.renderManageKnownSpells(scData)
			} else {
				return null
			}
		})
	}

	renderManageKnownSpells = (spellcastingData) => {
		const renderClick = () => {
			modalAction("manageKnownSpells", spellcastingData)
		}

		return <button onClick={renderClick}>Manage Known Spells - {spellcastingData.klassName}</button>
	}

	managePreparedSpells = () => {
		let spellcastingData = SpellcastingCalculations.allRemainingSpellsPerDay()
		return spellcastingData.map((scData, i) => {
			if (scData.spellcasting.prepare_spells){
				return this.renderManagePreparedSpells(scData)
			} else {
				return null
			}
		})
	}

	renderManagePreparedSpells = (spellcastingData) => {
		const renderClick = () => {
			modalAction("managePreparedSpells", spellcastingData)
		}

		return <button onClick={renderClick}>Manage Prepared Spells - {spellcastingData.klassName}</button>
	}

	characterChoices = () => {

	}

  render(){
    return(
      <span style={{padding: '1em'}}>
        <p>Things to update</p>
        {this.addSkillRanks()}
				{this.manageKnownSpells()}
				{this.managePreparedSpells()}
        {this.prepareSpells()}
				{this.characterChoices()}
      </span>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(Update)
