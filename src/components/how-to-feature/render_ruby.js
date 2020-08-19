import React from 'react'
import _ from 'lodash'

const RenderRuby = props => {

  const {name, action, attack_of_opportunity, usage} = props.state

  let alphaNumeric = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_"]
  let uniqueVariable = _.sampleSize(alphaNumeric, 9). join("")

  const renderFeature = () => {
    return (
      <p>
        {uniqueVariable} = Feature.create!(name: "{name}", action_id: {action}.id, attack_of_opportunity: {attack_of_opportunity})
      </p>
    )
  }

  const renderUsage = () => {
    return (
      <p>
        {uniqueVariable}_usage = FeatureUsage.create!(feature_id: {uniqueVariable}.id, limit: {usage.limit}, unit: "{usage.unit}"{usage.destroy_after_use === "true" && `, destroy_after_use: "true" `}, limit_frequency: "{usage.limit_frequency}"{usage.adjustable === "true" && `, adjustable: "true"`}{usage.toggleable === "true" && `, toggleable: "true"`}{usage.wieldable === "true" && `, wieldable: "true"`})
      </p>
    )
  }

  return (
    <>
      {renderFeature()}
      {renderUsage()}
    </>
  )
}

export default RenderRuby
