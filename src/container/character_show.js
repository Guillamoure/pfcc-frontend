import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../localhost'
import { mod } from '../fuf'
import { fetchCharacter } from '../dispatch'
import { characterDistributer } from '../helper_functions/distributers/character'
import { initializeCampaignWebsocket } from '../utils/websocket/campaign'
import { modalAction } from '../utils/action_creator/popups'

import AbilityScores from '../components/character_show/ability_scores'
import CharacterName from '../components/character_show/character_name'
import Saves from '../components/character_show/saves'
import HP from '../components/character_show/hp'
import ArmorClass from '../components/character_show/ac'
import AttackBonus from '../components/character_show/attack_bonus'
import CharacterDetails from '../components/character_show/details'
import Skills from '../components/character_show/skills'
import FeaturesTraits from './features_traits'
import Actions from './actions'
import Initiative from '../components/character_show/initiative'
import TurnActions from '../components/character_show/turn_actions'
import Details from './details'
import Campaign from './campaign'
import NotificationDoor from '../components/character_show/notification_door'
import CharacterShowTabs from './character_show_tabs'

// unfinished hardcoded features
import Points from '../components/character_show/points'
import PointModal from '../modals/points'
import PerformanceModal from '../modals/performance'
import RageModal from '../modals/rage'
import Active from '../components/character_show/active'
// import Allies from '../components/character_show/allies'
// import SpellDescriptionModal from '../modals/spell'
import FrogCombat from '../modals/frog'
import Tooltip from '../modals/tooltip'
import CommandRingModal from '../modals/command'
import AgeModal from '../modals/age'
import CurioModal from '../modals/curios'
import PoisonModal from '../modals/poison'
import Size from '../components/character_show/size'
import SpellAugmentModal from '../modals/augment'
import MetamagicModal from '../modals/metamagic'
import HandyModal from '../modals/handy'
import DebilitatingModal from '../modals/debilitating'
import AmmoModal from '../modals/ammo'
import SaseaModal from '../modals/sasea'
import AuraModal from '../modals/aura'
import MutagenModal from '../modals/mutagen'
import SideBar from './sidebar/sidebar'

import BackgroundForm from '../modals/background_form'
import CharacterForm from '../modals/character_form'
import AbilityForm from '../modals/ability_form'
import Notifications from '../modals/notifications'
// import HPChanges from '../modals/hp_changes'
import SpellDescriptionModal from '../modals/spell'
import MagicItemModal from '../modals/magic_item'
import CharacterFeatureModal from '../modals/character_feature_modal'
import WeaponModal from '../modals/weapon'

import MobileTabs from '../components/mobile/tabs'

import ModalSkeleton from '../modals/skeleton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'


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
    characterItemID: 0,
    cfId: 0,
    toolTip: false,
    toolTipX: 0,
    toolTipY: 0,
    detail: '',
    mobileTab: 'adventure',
    startTime: 0,
    startSwipe: 0,
    drag: false,
    changeBackground: false,
    justSwipedMobile: false,
    offset: 0,
    sidebar: {
      display: false,
      position: 'right',
      content: ''
    }
  }

  componentDidMount() {
    // console.log("HI IM RUNNING")
    fetch(`${localhost}/api/v1${this.props.location.pathname}`)
    .then(r => r.json())
    .then(data => {
      // IF YOU WANT THE PAGE TO BE PRIVATE
      // if (this.props.currentUser.id === data.character.user.id){
        characterDistributer(data.character)
				initializeCampaignWebsocket(data.character)

        // this.dispatchAbilityScores()
        // this.dispatchClassLevels()
        this.props.dispatch({type: 'SPECIFIC USER', name: data.character.name})
        // this.dispatchAbilityScoreImprovements(data.character.character_klasses)
        this.setState({character: data.character})
        if (data.character.name === 'Merg'){
          this.props.dispatch({type: 'ACTIVE ARMOR', name: '+1 chain shirt'})
          this.props.dispatch({type: 'CREW'})
        }
        if (data.character.name === 'Cedrick'){
          this.props.dispatch({type: 'CREW'})
        }
        if (data.character.name === 'Maddox'){
          this.props.dispatch({type: 'CREW'})
        }
        if (data.character.name === 'Robby'){
          this.props.dispatch({type: 'ACTIVE ARMOR', name: 'Padded'})
          this.props.dispatch({type: 'HELMSMAN'})
        }


        // this.props.fetchCharacter(data)(this.props.dispatch)

      //   data.character.character_magic_items.forEach(cmi => {
      //     if (cmi.equipped){
      //       cmi.magic_item.features.forEach(f => {
      //         if (!!f.skill_bonuses.length){
      //           f.skill_bonuses.forEach(sk => {
      //             const { skill_id, bonus, bonus_type, duration } = sk
      //             // const conditions = sk.feature_skill_bonus_conditions.map(c => {return {condition: c.condition}})
      //             this.props.dispatch({type: 'BONUS', bonus: {type: 'skill', skill_id, bonus, bonus_type, duration, source: cmi.magic_item.name}})
      //           })
      //         }
      //         if (!!f.stat_bonuses.length){
      //           f.stat_bonuses.forEach(st => {
      //             const { statistic, bonus, bonus_type, duration } = st
      //             const conditions = st.feature_stat_bonus_conditions.map(c => {return {condition: c.condition}})
      //             this.props.dispatch({type: 'BONUS', bonus: {type: 'stat', statistic, bonus, bonus_type, duration, source: cmi.magic_item.name, conditions}})
      //           })
      //         }
      //         if (!!f.skill_notes.length){
      //           f.skill_notes.forEach(sk => {
      //             const { skill_id, note} = sk
      //             this.props.dispatch({type: 'BONUS', bonus: {type: 'note', skill_id, note, source: cmi.magic_item.name}})
      //           })
      //         }
      //         if (!!f.languages.length){
      //           f.languages.forEach(l => {
      //             const { language, note } = l
      //             this.props.dispatch({type: 'EFFECT', effect: {type: 'language', language, note, source: cmi.magic_item.name}})
      //           })
      //         }
      //       })
      //     }
      //   })
      // data.character.uniq_klasses.forEach(kl => {
      //   kl.klass_features.forEach(kf => {
      //     kf.features.forEach(f =>{
      //       if (!!f.skill_bonuses.length){
      //         f.skill_bonuses.forEach(sk => {
      //           const { skill_id, bonus, bonus_type, duration } = sk
      //           // const conditions = sk.feature_skill_bonus_conditions.map(c => {return {condition: c.condition}})
      //           this.props.dispatch({type: 'BONUS', bonus: {type: 'skill', skill_id, bonus, bonus_type, duration, source: kf.name}})
      //         })
      //       }
      //       if (!!f.skill_notes.length){
      //         f.skill_notes.forEach(sk => {
      //           const { skill_id, note} = sk
      //           // debugger
      //           this.props.dispatch({type: 'BONUS', bonus: {type: 'note', skill_id, note, source: kf.name}})
      //         })
      //       }
      //     })
      //   })
      // })
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
    let cKArray = []
    let completedClasses = []
    this.props.character.character_klasses.forEach(cK => {
      const id = cK.klass_id
      if (!completedClasses.includes(id)){
        let characterKlass = this.props.character.character_klasses.filter(ck => ck.klass_id === id)
        const level = characterKlass.length
        let klass = this.props.character.uniq_klasses.find(k => k.id === id)

        completedClasses.push(id)
        const classInfo = {id, level}

        // changing fetch data, this part is not applicable with starting fetch

        let spellsFeature = klass.klass_features.find(f => f.name === 'Spells' || f.name === 'Alchemy')
        let spellcasting = spellsFeature ? spellsFeature.spellcasting : null

        // look to see if there are any cast spells for the given class
        const castSpellsForThisClass = this.props.character.cast_spells.filter(cs => cs.klass_id === id)
        // if (castSpellsForThisClass[0]){
        const castSpells = {}
        const transformedCastSpellsToLevelCast = castSpellsForThisClass.map(cs => cs.spell_level)
        transformedCastSpellsToLevelCast.forEach(lvl => {
          castSpells[lvl] ? castSpells[lvl] = castSpells[lvl] + 1 : castSpells[lvl] = 1
        })
        classInfo.castSpells = castSpells
        classInfo.spellcasting = spellcasting
        // hardcoded start
        let name = this.props.character.name
          if (name === "Nettie" || name === "Persephone" || name === "Maddox"){
            classInfo.spellcastingAbility = 'intelligence'
          } else if (name === "Sylvester"){
            classInfo.spellcastingAbility = 'charisma'
          }
        // hardcoded end
        // }

        // relocate to a new function when data is applcable

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

  dispatchAbilityScoreImprovements = (levels) => {
    levels.forEach(lvl => {
      if (lvl.ability_score_improvement){
        this.props.dispatch({type: "ABILITY SCORE IMPROVEMENT", ability_score: lvl.ability_score_improvement})
      }
    })
  }

  renderEdit = (info, details) => {
    fetch(`${localhost}/api/v1/${details}`, {
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

  editModal = (section, className, id, detail) => {
    if (className && className !== "free"){
      this.props.dispatch({type: 'TRIGGER ACTION', action: className})
    }
    if (detail && detail.name === 'weapon'){
      this.props.dispatch(detail)
    }
    if (section === 'spell' && !!id){
      this.setState({modal: section, spellId: id})
    } else if ((section === 'magic item' || section === 'weapon') && !!id){
      this.setState({modal: section, characterItemID: id})
    } else if (section === 'cFeature' && !!id){
      this.setState({modal: section, cfId: id, detail})
    } else {
      this.setState({modal: section})
    }
  }

  editSidebar = (display, position, description, content) => {
    this.setState({sidebar: {display, position, description, content}})
  }

  clickOut = (e) => {
    if(e.target.classList[0] === "page-dimmer"){
      this.setState({modal: false, spellId: 0, characterItemID: 0})
    }
  }
  exitModal = () => {
    this.setState({modal: false, spellId: 0, characterItemID: 0, cfId: 0, detail: ''})
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

  changeActiveMobileTab = tab => {
    this.setState({mobileTab: tab})
  }

  handleMouseDown = (e) => {
    // the swipe mechanic will often skip over tabs, if it's too quick and long
    // so in the adjustTabs setState, going to have a settimeout so there is a delay between swipes
    if (!this.state.justSwipedMobile){
      let d = new Date
      console.log('clicked down on mouse', e.targetTouches[0].clientX)
      this.setState({
        startTime: d.getTime(),
        startSwipe: e.targetTouches[0].clientX,
        drag: true
      })
    }
  }

  handleMouseUp = (e) => {
    this.setState({drag: false, startTime: null, startSwipe: null, offset: 0})
  }

  handleMouseMove = (e) => {
    if (this.state.drag){
      const currentSwipe = e.targetTouches[0].clientX
      let d = new Date
      const currentTime = d.getTime()
      // calculate velocity
      // velocity = current clientX position - starting clientX position / current date - starting date
      const deltaX = this.state.startSwipe - currentSwipe
      const deltaT = (currentTime - this.state.startTime) / 1000
      // converting deltaT to seconds from milliseconds
      const velocity = (deltaX / deltaT)

      if (velocity > 900 || velocity < -900){
        this.adjustTabs(velocity)
      } else {
        this.setState({offset: deltaX/1.5})
      }
      // if velocity is a certain amount, or if delta clientX is great enough
      // move to next tab

    }
  }

  adjustTabs = (velocity) => {
    let newTab = ''
    // adventure, combat, character, settings (left to right)
    if (velocity > 0){
      newTab = this.state.mobileTab === 'adventure' ? 'combat' : newTab
      newTab = this.state.mobileTab === 'combat' ? 'character' : newTab
      newTab = this.state.mobileTab === 'character' ? 'settings' : newTab
      newTab = this.state.mobileTab === 'settings' ? 'settings' : newTab

    } else if (velocity < 0){
      newTab = this.state.mobileTab === 'adventure' ? 'adventure' : newTab
      newTab = this.state.mobileTab === 'combat' ? 'adventure' : newTab
      newTab = this.state.mobileTab === 'character' ? 'combat' : newTab
      newTab = this.state.mobileTab === 'settings' ? 'character' : newTab
    }
    //
    if (!this.state.justSwipedMobile){
      this.setState({mobileTab: newTab, justSwipedMobile: true, offset: 0}, () => {
        setTimeout(() => this.setState({justSwipedMobile: false}), 150)
      })
    }
  }

	renderHeader = () => {
		if (localStorage.computer !== "false"){

			const renderTabClick = (tab) => {
				this.setState({display: tab})
			}

			// <CharacterShowTabs activeTab={this.state.display} renderTabClick={renderTabClick}/>
			return (
				<div id='character' className='shrink'>
					{this.state.character.race && <CharacterName character={this.state.character} editModal={this.editModal}/>}
					<div>
						<FontAwesomeIcon id="spin" icon={faDiceD20} size='3x' onClick={() => modalAction('rollDice')} />
						{this.state.character.race && <NotificationDoor character={this.state.character} editModal={this.editModal} />}
					</div>
				</div>
			)
		}
	}

  renderCharacter = () => {
    if (localStorage.computer !== "false"){
      return (
				<>
	        <span className="container-8 character">
		        {this.state.character.race && this.state.display === "Adventure" && <AbilityScores character={this.state.character} editModal={this.editModal}/>}
		        {this.state.character.race && this.state.display === "Adventure" && <FeaturesTraits character={this.state.character} editModal={this.editModal} exitModal={this.exitModal} characterItemID={this.state.characterItemID}/>}
		        {this.state.character.race && this.state.display === "Character" && <Details character={this.state.character} editModal={this.editModal}/>}
		        {this.state.character.race && (this.state.display === "Adventure" || this.state.display === "Combat") && <Saves character={this.state.character} display={this.state.display} renderTooltip={this.renderTooltip} mouseOut={this.mouseOut}/>}
		        {this.state.character.race && (this.state.display === "Adventure" || this.state.display === "Combat") && <HP character={this.state.character} editModal={this.editModal} display={this.state.display}/>}
		        {this.state.character.race && (this.state.display === "Adventure" || this.state.display === "Combat") && <ArmorClass character={this.state.character} size={this.props.character_info.size}/>}
		        {this.state.character.race && this.state.display === "Adventure" && <Skills character={this.state.character} renderTooltip={this.renderTooltip} mouseOut={this.mouseOut}/>}
		        {this.state.character.race && (this.state.display === "Adventure" || this.state.display === "Combat") && <Actions character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderTooltip={this.renderTooltip} mouseOut={this.mouseOut}/>}
		        {this.state.character.race && this.state.display === "Adventure" && <TurnActions/>}

		        {/* unfinished, hardcoded features */}
		        {!!this.state.character && this.state.display === "Combat" && <Points editModal={this.editModal}/>}
		        {!!this.state.character && this.state.display === "Combat" && <Active activeEffects={this.state.activeEffects} editModal={this.editModal}/>}
		        {!!this.state.character && this.state.display === "Character" && <Campaign editModal={this.editModal}/>}
		        {!!this.state.character && (this.state.display === "Adventure" || this.state.display === "Combat") && <Size/>}
		        {/* unfinished, hardcoded features */}


		        {this.state.modal === 'background' && <BackgroundForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
		        {this.state.modal === 'character' && <CharacterForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
		        {this.state.modal === 'ability' && <AbilityForm character={this.state.character} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
		        {this.state.modal === 'notifications' && <Notifications exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit} changeActiveEffects={this.changeActiveEffects}/>}
		        {this.state.modal === 'hitPoints' && <ModalSkeleton modal={this.state.modal} exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} renderEdit={this.renderEdit}/>}
		        {(this.state.modal === 'spell' && this.state.spellId !== 0) && <SpellDescriptionModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} spellId={this.state.spellId}/>}
		        {(this.state.modal === 'magic item' && this.state.characterItemID !== 0) && <MagicItemModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} characterItemID={this.state.characterItemID}/>}
		        {(this.state.modal === 'cFeature' && this.state.cfId !== 0) && <CharacterFeatureModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} cfId={this.state.cfId} detail={this.state.detail}/>}
		        {(this.state.modal === 'weapon' && this.state.characterItemID !== 0) && <WeaponModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut} characterItemID={this.state.characterItemID}/>}

		        {/* unfinished, hardcoded features */}
		        {this.state.modal === 'points' && <PointModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'performance' && <PerformanceModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'frogCombat' && <FrogCombat exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'rage' && <RageModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.toolTip && <Tooltip x={this.state.toolTipX} y={this.state.toolTipY} comment={this.state.toolTipComment}/>}
		        {this.state.modal === 'command ring' && <CommandRingModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'age' && <AgeModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'curio' && <CurioModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'poisons' && <PoisonModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'reservoir' && <SpellAugmentModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'metamagic' && <MetamagicModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'handy' && <HandyModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'debilitating' && <DebilitatingModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'ammo' && <AmmoModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'sasea' && <SaseaModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'aura' && <AuraModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {this.state.modal === 'mutagen' && <MutagenModal exitModal={this.exitModal} editModal={this.editModal} clickOut={this.clickOut}/>}
		        {/* unfinished, hardcoded features */}


	        </span>
				</>
      )
			// <div id='right' onClick={() => this.setState({display: this.rightArrow()})}><FontAwesomeIcon icon={faCaretRight} size='9x'/><div>{this.rightArrow()}</div></div>
			// <div id='left' onClick={() => this.setState({display: this.leftArrow()})}><FontAwesomeIcon icon={faCaretLeft} size='9x'/><div>{this.leftArrow()}</div></div>
    } else {
      return (
        <>
          <main style={{marginBottom: '10vh', minHeight: '90vh', position: 'relative', left: 0 - this.state.offset}} onTouchStart={this.handleMouseDown} onTouchMove={this.handleMouseMove} onTouchEnd={this.handleMouseUp}>
            {this.state.character.race && <CharacterName />}

            {this.state.character.race && this.state.mobileTab === "adventure" && <AbilityScores/>}
            {this.state.character.race && this.state.mobileTab === "adventure" && <FeaturesTraits editModal={this.editModal} exitModal={this.exitModal} characterItemID={this.state.characterItemID}/>}
            {this.state.character.race && (this.state.mobileTab === "adventure" || this.state.mobileTab === "combat") && <HP renderEdit={this.renderEdit} display={this.state.display}/>}
            {this.state.character.race && this.state.mobileTab === "adventure" && <Skills renderTooltip={this.renderTooltip} mouseOut={this.mouseOut}/>}

            {this.state.character.race && this.state.mobileTab === "combat" && <section id='mobile-combat'>
              <Saves renderTooltip={this.renderTooltip} mouseOut={this.mouseOut}/>
              <ArmorClass/>
              <Initiative/>
            </section>}
            {this.state.character.race && this.state.mobileTab === "combat" && <TurnActions/>}
            {this.state.character.race && this.state.mobileTab === "combat" && <Actions editModal={this.editModal} clickOut={this.clickOut} renderTooltip={this.renderTooltip} mouseOut={this.mouseOut} editSidebar={this.editSidebar}/>}


            {this.state.character.race && this.state.mobileTab === "character" && <CharacterDetails editModal={this.editModal}/>}

            {this.state.sidebar.display && <SideBar sidebar={this.state.sidebar} editSidebar={this.editSidebar}/>}
          </main>
          <footer>
            <MobileTabs mobileTab={this.state.mobileTab} changeActiveMobileTab={this.changeActiveMobileTab}/>
          </footer>
        </>
      )
    }
  }


  render() {
    return (
      <article style={{color: `#${this.props.settings.textColor}`}}>
				{this.renderHeader()}
        {this.renderCharacter()}
      </article>
    )
  }
}

// {this.props.currentUser.id === this.state.character.user_id ? <button className='char-edit' >Edit your Character</button> : null}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
		websocket: state.websocket,
		settings: state.settings
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    fetchCharacter: fetchCharacter,
    dispatch: dispatch
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Character)
