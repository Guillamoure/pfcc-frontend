import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { calculateFeaturePercentage } from '../../helper_functions/calculations/feature_usage'

const Points = props => {

	const renderClick = (feature) => {
		props.dispatch({type: "MODAL", detail: "adjust points", obj: feature})
	}

  const renderPoints = (name) => {
    switch(name){
      case "Nettie":
        return (
          <span className='centered' onClick={() => props.editModal('points')}>
            <div className='enhanced'>{props.character_info.hardcode.points} / 19</div>
            <div className='muted'>Bardic Performance</div>
          </span>
        )
      case "Merg":
        return (
          <span className='centered' onClick={() => props.editModal('points')}>
            <div className='enhanced'>{props.character_info.hardcode.points} / 18</div>
            <div className='muted'>Rage Rounds</div>
          </span>
        )
      case "Cedrick":
        return (
          <span className='centered' onClick={() => props.editModal('points')}>
            <div className='enhanced'>{props.character_info.hardcode.points} / 7</div>
            <div className='muted'>Chimera Points</div>
          </span>
        )
      case "Robby":
        return (
          <span className='centered' onClick={() => props.editModal('points')}>
            <div className='enhanced'>{props.character_info.hardcode.points}/4</div>
            <div className='muted'>Panache Points</div>
          </span>
        )
      case "Maddox":
        return (
          <span className='centered' onClick={() => props.editModal('points')}>
            <div className='enhanced'>{props.character_info.hardcode.points} / 10</div>
            <div className='muted'>Arcane Reservoir</div>
          </span>
        )
      case "Grackle":
        return (
          <span className='centered' onClick={() => props.editModal('points')}>
            <div className='enhanced'>{props.character_info.hardcode.points} / 10</div>
            <div className='muted'>Bombs Used</div>
          </span>
        )
      default:
        let pointsFeatures = []
				props.character.applicable_klass_features.forEach(akf => {
					akf.features.forEach(f => {
						if (f.usage?.limit || f.usage?.limit_frequency && !f.usage?.destroy_after_use){
							let ckfus = props.character.character_klass_feature_usages.filter(fu => fu.klass_feature_id === akf.id)
							pointsFeatures.push({...f, sourceId: akf.id, klassFeatureName: akf.name, klassId: akf.klass_id, character_klass_feature_usages: ckfus, source: "applicable_klass_features"})
						}
					})
				})
				return pointsFeatures.map(f => {
					return (
						<span className='centered' onClick={() => renderClick(f)}>
							<div className='enhanced'>{calculateFeaturePercentage(f)}</div>
							<div className='muted'>{_.capitalize(f.klassFeatureName)} {_.capitalize(f.usage.unit)}</div>
						</span>
					)
				})
    }
  }

  return(
    <div id='points' className='shadow shrink'>
      {renderPoints(props.character.name)}
    </div>
  )

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Points)
