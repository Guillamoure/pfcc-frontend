import React from 'react'
import _ from 'lodash'

class Traits extends React.Component {

  state = {
    activeTrait: 0
  }

  changeActiveFeature = (e) => {
    let id = _.parseInt(e.target.dataset.id)
    if (this.state.activeTrait) {
      this.setState({activeTrait: 0})
    } else {
      this.setState({activeTrait: id})
    }
  }

  renderRacialTraits = () => {

    return this.props.character.race.racial_traits.map(trait => {
        return (
          <li data-id={trait.id} onClick={this.changeActiveFeature} className='highlight'>
            <strong data-id={trait.id}>{trait.name}</strong>
            {this.state.activeTrait === trait.id && <div style={{color: '#000'}}>{trait.description}</div>}
          </li>
        )

    })
  }

  render(){
    return(
      <div style={{padding: '1em'}}>
        {this.renderRacialTraits()}
      </div>
    )
  }
}

export default Traits
