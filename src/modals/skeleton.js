import React from 'react'
import Portal from '../portal'
import { connect } from 'react-redux'
import { exitModal } from '../dispatch'

import HPChanges from '../components/hp_changes'
import Armor from '../components/armor_summary'
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

const ModalSkeleton = (props) => {

  const renderComponent = (modal) => {
    let m = modal
    if (modal !== "hitPoints"){m = modal.detail}
    switch(m){
      case 'hitPoints':
        return <HPChanges exitModal={exitModal} editModal={props.editModal} clickOut={clickOut} renderEdit={props.renderEdit}/>
      case 'armor':
        return <Armor characterArmor={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
      case 'adjust points':
        return <Points feature={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'featureUsageOptions':
				return <FeatureUsageOptions feature={props.modal.obj} exitModal={exitModal} clickOut={clickOut} />
			case 'manageKnownSpells':
				return <KnownSpellManager spellcastingData={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'spellDescription':
				return <SpellDescription spell={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'managePreparedSpells':
				return <PreparedSpellManager spellcastingData={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'characterChoice':
				return <CharacterChoice choiceObj={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'spontaneousCasting':
				return <SpontaneousCasting feature={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'klassSpecialization':
				return <KlassSpecialization klassFeature={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'manageBonusSpellSlots':
				return <BonusSpellSlotManager spellcastingData={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'feat':
				return <Feat feat={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'statBlock':
				return <CreatureStatBlock creature={props.modal.obj} exitModal={exitModal} clickOut={clickOut}/>
			case 'skill':
				return <SkillDescription skillId={props.modal.obj} />
			case 'item':
				return <ItemDescription item={props.modal.obj} />
			case 'harrow':
				return <HarrowDeck />
      default:
        break
    }
  }

  const clickOut = (e) => {
    if (e.target.classList[0] === 'page-dimmer'){
      exitModal()
    }
  }

  const exitModal = () => {
    props.dispatch(props.exitModal())
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={clickOut}>
        <div className="edit-form" name="background">
          {renderComponent(props.modal)}
        </div>
      </div>
    </Portal>
  )

}

const mapStatetoProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    exitModal,
    dispatch
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(ModalSkeleton)
