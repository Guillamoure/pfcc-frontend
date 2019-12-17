import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AbilityScores from '../components/character_show/ability_scores'
import CharacterName from '../components/character_show/character_name'
import Saves from '../components/character_show/saves'
import HP from '../components/character_show/hp'
import ArmorClass from '../components/character_show/ac'
import AttackBonus from '../components/character_show/attack_bonus'
import Details from '../components/character_show/details'
import Skills from '../components/character_show/skills'
import FeaturesTraits from './features_traits'
import Actions from './actions'
import Initiative from '../components/character_show/initiative'
import TurnActions from '../components/character_show/turn_actions'

// unfinished hardcoded features
import Points from '../components/character_show/points'
import PointModal from '../modals/points'
import PerformanceModal from '../modals/performance'
import RageModal from '../modals/rage'
import Active from '../components/character_show/active'
import Allies from '../components/character_show/allies'
import SpellDescriptionModal from '../modals/spell'
import FrogCombat from '../modals/frog'
import Tooltip from '../modals/tooltip'
import CommandRingModal from '../modals/command'
import AgeModal from '../modals/age'
import CurioModal from '../modals/curios'

import BackgroundForm from '../modals/background_form'
import CharacterForm from '../modals/character_form'
import AbilityForm from '../modals/ability_form'
import Notifications from '../modals/notifications'
import HPChanges from '../modals/hp_changes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'


// from here
// ---------
// keep track of rage/chimera/performance/panache points in state
// UPDATE: did it redux <3

// children
// -------
// render rage/chimera/performance/panache
// render weapons
// hexes, shifter aspects, rage powers, rogue talents, arcane exploits
// activatable class features (swashbuckler, vigilante?, arcanist, shifter)
// feats
// chubbs
// modal of combat choices (charge, combat maneuvers, total defense)

class Character extends React.Component {

  state = {
    character: {},
    modal: false,
    display: "Adventure",
    activeEffects: [],
    spellId: 0,
    toolTip: false,
    toolTipX: 0,
    toolTipY: 0
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1${this.props.location.pathname}`)
    .then(r => r.json())
    .then(data => {
      // IF YOU WANT THE PAGE TO BE PRIVATE
      // if (this.props.currentUser.id === data.character.user.id){
        this.props.dispatch({type: 'CHARACTER', character: data.character })
        this.dispatchAbilityScores()
        this.dispatchClassLevels()
        this.props.dispatch({type: 'SPECIFIC USER', name: data.character.name})
        this.setState({character: data.character})
      // } else {
      //   this.props.history.push('/')
      // }
    })
  }

  //
  // getCharacterClassFeatures = (klasses) => {
  //   let klass_features = []
  //   let klass_ids = klasses.map(klass => klass.id)
  //   debugger
  //   klasses.forEach(klass => {
  //     fetch(`http://localhost:3000/api/v1/klass_features/${klass.id}`)
  //     .then(r => r.json())
  //     .then(data => {
  //       klass_features.push(data)
  //     })
  //   })
  //   debugger
  //   this.setState({classFeatures: _.flatten(klass_features)})
  // }

  renderAbilityScoreCalc = (ability) => {
    const downcaseAbility = _.lowerCase(ability)
    let score = this.props.character[downcaseAbility]
    this.props.character.race.race_ability_score_modifiers.forEach(mod => {
      if (ability === mod.ability_score){
        score += mod.bonus
      }
    })
    if (this.props.character.any_bonus === ability){
      score +=2
    }
    this.props.dispatch({type: 'ABILITY SCORE', ability: downcaseAbility, score: score })
  }

  dispatchClassLevels = () => {
    // let charKlassesLevels = {}
    // this.props.character.character_klasses.forEach(charKlass => {
    //   if (charKlassesLevels[charKlass.klass_id]) {
    //     charKlassesLevels[charKlass.klass_id]++
    //   } else {
    //     charKlassesLevels[charKlass.klass_id] = 1
    //   }
    // })
    let cKArray = []
    let completedClasses = []
    this.props.character.character_klasses.forEach(cK => {
      const id = cK.klass_id
      if (!completedClasses.includes(id)){
        const level = this.props.character.character_klasses.filter(ck => ck.klass_id === id).length
        completedClasses.push(id)
        const classInfo = {id, level}
        // look to see if there are any cast spells for the given class
        const castSpellsForThisClass = this.props.character.cast_spells.filter(cs => cs.klass_id === id)
        // if (castSpellsForThisClass[0]){
        const castSpells = {}
        const transformedCastSpellsToLevelCast = castSpellsForThisClass.map(cs => cs.spell_level)
        transformedCastSpellsToLevelCast.forEach(lvl => {
          castSpells[lvl] ? castSpells[lvl] = castSpells[lvl] + 1 : castSpells[lvl] = 1
        })
        classInfo.castSpells = castSpells

        // hardcoded start
        let name = this.props.character.name
          if (name === "Nettie" || name === "Persephone" || name === "Maddox"){
            classInfo.spellcastingAbility = 'intelligence'
          } else if (name === "Sylvester"){
            classInfo.spellcastingAbility = 'charisma'
          }
        // hardcoded end
        // }
        cKArray.push(classInfo)
      }
    })
    // debugger
    this.props.dispatch({type: 'CHARACTER_CLASSES', classes: cKArray})
  }

  dispatchAbilityScores = () => {
    // this.props.dispatch({type: 'CHARACTER', character: this.state.character })
    this.renderAbilityScoreCalc("Strength")
    this.renderAbilityScoreCalc("Dexterity")
    this.renderAbilityScoreCalc("Constitution")
    this.renderAbilityScoreCalc("Intelligence")
    this.renderAbilityScoreCalc("Wisdom")
    this.renderAbilityScoreCalc("Charisma")
  }

  renderEdit = (info, details) => {
    fetch(`http://localhost:3000/api/v1/${details}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.props.dispatch({type: 'CHARACTER', character: data.character })
      this.setState({character: data.character, modal: false}, this.dispatchAbilityScores(), this.dispatchClassLevels())
    })
  }

  editModal = (section, className, id) => {
    if (className && className !== "free"){
      this.props.dispatch({type: 'TRIGGER ACTION', action: className})
    }
    if (section === 'spell' && !!id){
      this.setState({modal: section, spellId: id})
    } else {
      this.setState({modal: section})
    }
  }

  clickOut = (e) => {
    if(e.target.classList[0] === "page-dimmer"){
      this.setState({modal: false, spellId: 0})
    }
  }
  exitModal = () => {
    this.setState({modal: false})
  }

  renderTooltip = (e, comment) => {
    this.setState({toolTip: true, toolTipX: e.clientX, toolTipY: e.clientY, toolTipComment: comment})
  }

  mouseOut = () => {
    console.log('is this being hit?')
    this.setState({toolTip: false, toolTipX: 0, toolTipY: 0, toolTipComment: null})
  }

  changeActiveEffects = (string) => {
    if (this.state.activeEffects.includes(string)){
      let knockOffActiveEffects = this.state.activeEffects.filter(ae => ae !== string)
      this.setState({activeEffects: knockOffActiveEffects})
    } else {
      this.setState({activeEffects: [...this.state.activeEffects, string]})
    }
  }

  rightArrow = () => {
    switch(this.state.display){
      case "Adventure":
        return "Character";
      case "Combat":
        return "Adventure";
      case "Character":
        return "Combat";
      default:
        return "Character"
    }
  }

  leftArrow = () => {
    switch(this.state.display){
      case "Adventure":
        return "Combat";
      case "Combat":
        return "Character";
      case "Character":
        return "Adventure";
      default:
        return "Combat"
    }
  }


  render() {
    //
    // console.log("redux character adding", this.props)
    //
    return (
      <span className="container-8 character">
        {this.state.character.race && <CharacterName character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && this.state.display === "Adventure" && <AbilityScores character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && this.state.display === "Adventure" && <FeaturesTraits character={this.state.character}/>}
        {this.state.character.race && this.state.display === "Character" && <Details character={this.state.character} editModal={this.editModal}/>}
        {this.state.character.race && (this.state.display === "Adventure" || this.state.display === "Combat") && <Saves character={this.state.character} display={this.state.display}/>}
        {this.state.character.race && (this.state.display === "Adventure" || this.state.display === "Combat") && <HP character={this.state.character} editModal={this.editModal} display={this.state.display}/>}
        {this.state.character.race && this.state.display === "Combat" && <AttackBonus character={this.state.character}/>}
        {this.state.character.race && this.state.display === "Combat" && <ArmorClass character={this.state.character} size={this.props.character_info.size}/>}
        {this.state.character.race && this.state.display === "Adventure" && <Skills character={this.state.character} renderTooltip={this.renderTooltip} mouseOut={this.mouseOut}/>}
        {this.state.character.race && this.state.display === "Combat" && <Actions character={this.state.character} editModal={this.editModal} clickOut={this.clickOut}/>}
        {this.state.character.race && this.state.display === "Combat" && <Initiative character={this.state.character}/>}
        {this.state.character.race && this.state.display === "Combat" && <TurnActions/>}

        {/* unfinished, hardcoded features */}
        {!!this.state.character && this.state.display === "Combat" && <Points editModal={this.editModal}/>}
        {!!this.state.character && this.state.display === "Combat" && <Active activeEffects={this.state.activeEffects}/>}
        {!!this.state.character && this.state.display === "Character" && <Allies/>}
        {/* unfinished, hardcoded features */}


        {this.state.modal === 'background' && <BackgroundForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'character' && <CharacterForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'ability' && <AbilityForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
        {this.state.modal === 'notifications' && <Notifications exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit} changeActiveEffects={this.changeActiveEffects}/>}
        {this.state.modal === 'hitPoints' && <HPChanges exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}

        {/* unfinished, hardcoded features */}
        {this.state.modal === 'points' && <PointModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
        {this.state.modal === 'performance' && <PerformanceModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
        {this.state.modal === 'frogCombat' && <FrogCombat exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
        {this.state.modal === 'rage' && <RageModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
        {(this.state.modal === 'spell' && this.state.spellId !== 0) && <SpellDescriptionModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} spellId={this.state.spellId}/>}
        {this.state.toolTip && <Tooltip x={this.state.toolTipX} y={this.state.toolTipY} comment={this.state.toolTipComment}/>}
        {this.state.modal === 'command ring' && <CommandRingModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
        {this.state.modal === 'age' && <AgeModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
        {this.state.modal === 'curio' && <CurioModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
        {/* unfinished, hardcoded features */}

        <div id='right' onClick={() => this.setState({display: this.rightArrow()})}><FontAwesomeIcon icon={faCaretRight} size='9x'/><div>{this.rightArrow()}</div></div>
        <div id='left' onClick={() => this.setState({display: this.leftArrow()})}><FontAwesomeIcon icon={faCaretLeft} size='9x'/><div>{this.leftArrow()}</div></div>

      </span>
    )
  }
}

// {this.props.currentUser.id === this.state.character.user_id ? <button className='char-edit' >Edit your Character</button> : null}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default withRouter(connect(mapStatetoProps)(Character))
