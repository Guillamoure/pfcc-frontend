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
