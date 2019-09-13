import React from 'react'
import Portal from '../../portal'

import Spellcasting from '../../components/effects/spellcasting'

class FeatureEffect extends React.Component {

  state = {
    choice: ""
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderSelection = () => {
    return (
      <div className='tab-list-active'>
        <label>
          Class Feature Effect:
          <select name="choice" value={this.state.choice} onChange={this.renderChange}>
            <option value="">Select One</option>
            <option value="Spellcasting">Spellcasting</option>
          </select>
        </label>

      </div>
    )
  }

  render(){

    return(
      <Portal>
      <div className="page-dimmer" onClick={this.props.clickOut}>
        <div className="edit-form" name="background">
          <div>
            <p>Select an Effect</p>
            {this.renderSelection()}
            {this.state.choice === "Spellcasting" && <Spellcasting fetch={this.props.fetch}/>}
          </div>
        </div>
      </div>
      </Portal>
    )
  }
}

export default FeatureEffect
