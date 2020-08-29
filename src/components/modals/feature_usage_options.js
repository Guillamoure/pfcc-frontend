import React from 'react'
import { connect } from 'react-redux'
import { featureNameFromSource, locateFeatureAndAbilityFromSource, actionClass } from '../../helper_functions/fuf'
import { calculateFeaturePercentage, calculateCurrentUsage } from '../../helper_functions/calculations/feature_usage'
import { featureDistribution } from '../../helper_functions/distributers/features'
import { patchFetch } from '../../helper_functions/fetches'

const FeatureUsageOptions = props => {
	// NEW DATA
	// STORED DATA
	// CALCULATED DATA
	let source = {featureId: props.feature.id, source: props.feature.source, sourceId: props.feature.sourceId}

	const renderOptions = () => {

		return props.feature.usage.all_feature_usage_options.map(fuo => {

			const { feature, ability } = locateFeatureAndAbilityFromSource(fuo.optionSource)
			let name = feature.name || ability.name
			let className = actionClass(feature.action?.name || props.feature.action.name)

			return (
				<li className="noStyleLi">
					<button className={className} onClick={() => renderClick({...feature, sourceId: fuo.optionSource.sourceId, source: fuo.optionSource.source}, className)}>Activate</button> {name}
				</li>
			)

		})

	}

	const renderClick = (feature, action) => {
		let body = {
			character_id: props.character.id,
			klass_feature_id: props.feature.sourceId,
			feature_usage_id: props.feature.usage.id,
			current_usage: calculateCurrentUsage(props.character.character_klass_feature_usages.filter(fu => fu.klass_feature_id === props.feature.sourceId)) + 1
		}

		patchFetch("character_klass_feature_usages", body)
			.then(data => {
				props.dispatch({type: "ADJUST CHARACTER REPLACE VALUE IN ARRAY", adjust: "character_klass_feature_usages", value: data})
				featureDistribution(feature)
			})

		props.dispatch({type: "TRIGGER ACTION", action})
		props.exitModal()
	}

  return (
    <>
			<h3>{featureNameFromSource(source)} ({calculateFeaturePercentage(props.feature)})</h3>
			{renderOptions()}
    </>
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

export default connect(mapStatetoProps)(FeatureUsageOptions)
