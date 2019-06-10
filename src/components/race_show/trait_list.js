import React from 'react'
import _ from 'lodash'

import Trait from './trait'

class Traits extends React.Component {

  renderTraits = () => {

    return this.props.race.racial_traits.map(trait => {
      
      return <Trait key={trait.id} trait={trait}  race_name={this.props.race.name} renderRaceTrait={this.props.renderRaceTrait}/>
    })
  }

  render () {
    return (
      <span>
        {this.props.race.racial_traits && this.renderTraits()}
      </span>
    )
  }



}

export default Traits
