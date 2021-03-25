import React from 'react'
import Portal from '../portal'
import { connect } from 'react-redux'
import { modalAction } from '../utils/action_creator/popups'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import HPChanges from '../components/hp_changes'
import Armor from '../components/armor_summary'
import Weapon from '../components/weapon_summary'
import Points from '../components/modals/points'
import FeatureUsageOptions from '../components/modals/feature_usage_options'
import KnownSpellManager from '../components/modals/known_spell_manager'
import SpellDescription from '../components/spell_description'
import PreparedSpellManager from '../components/modals/prepared_spell_manager'
import CharacterChoice from '../components/modals/character_choice'
import SpontaneousCasting from '../components/modals/spontaneous_casting'
import KlassSpecialization from '../components/modals/klass_specialization'
import BonusSpellSlotManager from '../components/modals/bonus_spell_slot_manager'
import Feat from '../components/modals/feat'
import CreatureStatBlock from '../components/creature_stat_block'
import SkillDescription from '../components/skill_description'
import HarrowDeck from '../components/modals/harrow'
import ItemDescription from '../components/modals/item_description'
import CurrencyManager from '../components/modals/currency_manager'
import Settings from '../components/modals/settings'
import FamiliarDescription from '../components/modals/familiar_description'
import PoisonDescription from '../components/modals/poison_description'
import GenericDescription from '../components/modals/generic_description'
import AddCharacterEquipment from '../components/modals/add_character_equipment'
import SummonedCreatureOptions from '../components/modals/summoned_creature_options'
import MagicItemSummary from '../components/magic_item_summary'
import DiceRoller from '../components/modals/dice_roller'
import PotionDescription from '../components/modals/potion_description'
import ScrollDescription from '../components/modals/scroll_description'
import WandDescription from '../components/modals/wand_description'

const ModalSkeleton = (props) => {

  const renderComponent = (modal) => {
    let m = modal
    if (modal !== "hitPoints"){m = modal.detail}
    switch(m){
      case 'hitPoints':
        return <HPChanges exitModal={exitModal} editModal={props.editModal} clickOut={clickOut} renderEdit={props.renderEdit}/>
      case 'armor':
        return <Armor characterArmor={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
      case 'adjust points':
        return <Points feature={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'featureUsageOptions':
				return <FeatureUsageOptions feature={modal.obj} exitModal={exitModal} clickOut={clickOut} />
			case 'manageKnownSpells':
				return <KnownSpellManager spellcastingData={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'spellDescription':
				return <SpellDescription spell={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'managePreparedSpells':
				return <PreparedSpellManager spellcastingData={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'characterChoice':
				return <CharacterChoice choiceObj={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'spontaneousCasting':
				return <SpontaneousCasting feature={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'klassSpecialization':
				return <KlassSpecialization klassFeature={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'manageBonusSpellSlots':
				return <BonusSpellSlotManager spellcastingData={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'feat':
				return <Feat feat={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'statBlock':
				return <CreatureStatBlock creature={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'skill':
				return <SkillDescription skillId={modal.obj} />
			case 'item':
				return <ItemDescription item={modal.obj} />
			case 'harrow':
				return <HarrowDeck />
			case 'currency':
				return <CurrencyManager />
			case 'settings':
				return <Settings />
			case 'weapon':
				return <Weapon item={modal.obj.weapon} cw={modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case "familiar":
				return <FamiliarDescription familiar={modal.obj}/>
			case "poison":
				return <PoisonDescription item={modal.obj} />
			case "addEquipment":
				return <AddCharacterEquipment />
			case "summonedAllies":
				return <SummonedCreatureOptions featureAnimal={modal.obj} />
			case "magicItem":
				return <MagicItemSummary item={modal.obj.magic_item} cmi={modal.obj}/>
			case "rollDice":
				return <DiceRoller diceObj={modal.obj}/>
			case "potion":
				return <PotionDescription cp={modal.obj}/>
			case "scroll":
				return <ScrollDescription cs={modal.obj}/>
			case "wand":
				return <WandDescription cw={modal.obj}/>
      default:
				return <GenericDescription name={modal.obj.name} description={modal.obj.description}/>
        break
    }
  }

  const clickOut = (e) => {
    if (e.target.classList[0] === 'page-dimmer'){
      exitModal()
    }
  }

  const exitModal = (index) => {
    modalAction(null, null, {remove: true, indexToRemove: index})
  }
	//
  // return (
  //   <Portal>
  //     <div className="page-dimmer" onClick={clickOut}>
  //       <div className="edit-form" name="background">
  //         {renderComponent(props.modal)}
  //       </div>
  //     </div>
  //   </Portal>
  // )

	// const [isThisBeingRemoved, setRemoval] = React.useState('slide-in')
	// const [isThisBeingRemovedTab, setRemovalTab] = React.useState('slide-in-folder-tab')
	// const [style, setStyle] = React.useState(null)
	const [exitStyle, setExitStyle] = React.useState(null)
	const [activeIndex, setActiveIndex] = React.useState(0)
	const [collapsed, toggleCollapsed] = React.useState(false)
	const sidebarContainer = React.useRef(null)

	React.useEffect(() => {
		console.log(sidebarContainer)
		if (sidebarContainer.current){
			let tabStyleDuplicate = {...exitStyle}
			tabStyleDuplicate.width = `${window.innerWidth / 11}px`
			setExitStyle(tabStyleDuplicate)
		}
	}, [sidebarContainer])


	if (!exitStyle){
		// setStyle({width: '98%', height: '50%', bottom: '0px', zIndex: '1', overflowY: "scroll"})
		// setExitStyle({zIndex: '2', bottom: `${window.innerHeight/2 + 1}px`, width: '20%', textAlign: 'center', borderBottom: 'none', left: '10%'})
		setExitStyle({bottom: `${window.innerHeight/2 - 4}px`})
	}

	const exiting = (e, closingIndex) => {
		e.preventDefault()
		// setRemoval('slide-out')
		// setRemovalTab('slide-out-folder-tab')
		// setTimeout(() => setStyle({display: 'none'}), 775)
		// setTimeout(() => setExitStyle({display: 'none'}), 775)
		// setTimeout(() => exitModal(closingIndex), 800)
		let newActiveIndex
		if (closingIndex === activeIndex){
			if (closingIndex === 0 || (props.modal.length - 1 > closingIndex)){
				newActiveIndex = closingIndex
			} else if (props.modal.length - 1 === closingIndex){
				newActiveIndex = closingIndex -1
			}
		} else if (closingIndex > activeIndex) {
			newActiveIndex = activeIndex
		} else if (closingIndex < activeIndex){
			newActiveIndex = activeIndex - 1
		}
		console.log("The index of the tab that is closing is", closingIndex)
		console.log("The index you have open is", activeIndex)
		console.log("The index that is going to be active is", newActiveIndex)

		setActiveIndex(newActiveIndex)
		exitModal(closingIndex)
	}
	const updateActiveIndex = i => {
		if (i !== activeIndex){
			setActiveIndex(i)
		}
		if (collapsed){
			toggleCollapsed(false)
		}
	}

	const updateToggleButton = i => {
		if (!collapsed){
			toggleCollapsed(true)
		} else {
			updateActiveIndex(i)
		}
	}


	const displayAllTabs = () => {
		return props.modal.map((m, i) => {
			console.log(m)
			let name = m.name || m.obj?.name || `Tab ${i+1}`
			let tabStyle = {...exitStyle, backgroundColor: `#${props.settings.bubbleColor}`, borderColor: `#${props.settings.borderColor}`, color: `#${props.settings.textColor}`}
			if (sidebarContainer.current){
				// tabStyle.left = `${( i * Math.floor(sidebarContainer.current.clientWidth / 5) ) + (sidebarContainer.current.offsetLeft) + parseInt(window.getComputedStyle(sidebarContainer.current).getPropertyValue('padding-left'))}px`
				let wiff = window.innerWidth
				tabStyle.left = `${(i * wiff/11) + (wiff * 0.03)}px`
			}
			if (i !== activeIndex){
				tabStyle.filter = "brightness(85%)"
				tabStyle.borderBottom = `2px solid #${props.settings.borderColor}`
			}
			if (collapsed){
				tabStyle.bottom = "0px"
			}
			let cancelButton = <button onClick={(e) => exiting(e, i)}>X</button>
			let toggleButton = <button onClick={() => updateToggleButton(i)}><FontAwesomeIcon icon={collapsed ? faChevronUp : faChevronDown}/></button>
			return (
				<>
					<div id="sidebar-exit" style={tabStyle}><span className="underline-hover" onClick={() => updateActiveIndex(i)}>{name}</span><span>{toggleButton}{cancelButton}</span></div>
					{i === activeIndex && renderComponent(m)}
				</>
			)
		})
	}

	// style={{boxShadow: `5px 4px 2px #${props.settings.shadeColor}`, opacity: "0.95", backgroundColor: `#${props.settings.bubbleColor}`, borderColor: `#${props.settings.borderColor}`}}

	const collapsedStyle = () => {
		let style = {backgroundColor: `#${props.settings.bubbleColor}`, borderColor: `#${props.settings.borderColor}`, color: `#${props.settings.textColor}`}
		if (collapsed){
			style.height = "0px"
			style.padding = "0px"
			style.border = "0px"
			style.margin = "0px"
		}
		return style
	}

	return (
		<aside id="sidebar" ref={sidebarContainer} style={collapsedStyle()}>
			{displayAllTabs()}
		</aside>
	)

}

const mapStatetoProps = (state) => {
  return {
    modal: state.modal,
		settings: state.settings
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(ModalSkeleton)
