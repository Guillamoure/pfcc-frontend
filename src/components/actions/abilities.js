import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class Abilities extends React.Component {

  // check all class features learned by this level (that are activatable),
  // class feature options (that are activatable),
  // racial traits (that are activatable)
  // list them with their action buttons

  renderAbilities = () => {
    let option = this.collectClassFeatureOptions()
    debugger
    return 0
  }

  collectClassFeatureOptions = () => {
    let featuresNested = this.props.character.character_klasses.map(ck => {
      return ck.feature_options
    })
    let features = _.flatten(featuresNested)
    return features
  }

  render() {
    return(
      <section>
        <p>what is up my dudes</p>
        {this.renderAbilities()}
      </section>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Abilities)
