import React from 'react'
import { connect } from 'react-redux'
import { remainingUsage, incrementFeatureUsage, decrementFeatureUsage } from '../../helper_functions/calculations/feature_usage'

const Points = props => {

	const [feature, setFeature] = React.useState(null)

	React.useEffect(() => {
		setFeature(props.feature)
	})

	const renderClick = (operation) => {
		if (operation === "+" && feature.character_klass_feature_usages[0].current_usage) {
			decrementFeatureUsage(feature)
			let adjustedFeature = {...feature}
			adjustedFeature.character_klass_feature_usages[0].current_usage -= 1
			setFeature(adjustedFeature)
		} else if (operation === "-" && !!remainingUsage(feature)) {
			incrementFeatureUsage(feature)
			let adjustedFeature = {...feature}
			adjustedFeature.character_klass_feature_usages[0].current_usage += 1
			setFeature(adjustedFeature)
		}
	}

  const additionalContent = () => {
    let name = props.character.name
    if (name === 'Robby'){
      return (
        <React.Fragment>
          <h4>Regain Panache</h4>
          <ul>
            <li><em><u>Critical Hit with a Light or One-Handed Piercing Melee Weapon:</u></em> Each time you confirm a critical hit with a light or one-handed piercing melee weapon, you regain 1 panache point. Confirming a critical hit on a helpless or unaware creature or a creature that has fewer Hit Dice than half your character level doesn’t restore panache.</li>
            <li><em><u>Killing Blow with a Light or One-Handed Piercing Melee Weapon:</u></em> When you reduces a creature to 0 or fewer hit points with a light or one-handed piercing melee weapon attack while in combat, you regain 1 panache point. Destroying an unattended object, reducing a helpless or unaware creature to 0 or fewer hit points, or reducing a creature that has fewer Hit Dice than half your character level to 0 or fewer hit points doesn’t restore panache.</li>
          </ul>
        </React.Fragment>
      )
    }
  }

	// NEW DATA
	// STORED DATA
	// CALCULATED DATA

  return (
    <>
      <h3>Remaining: {feature && remainingUsage(feature)}</h3>
      {additionalContent()}
      <button className={feature && !feature.character_klass_feature_usages[0].current_usage ? "inactive-button" : ""} onClick={() => renderClick("+")}>+</button>
      <button className={feature && !remainingUsage(feature) ? "inactive-button" : ""} onClick={() => renderClick("-")}>-</button>
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

export default connect(mapStatetoProps)(Points)
