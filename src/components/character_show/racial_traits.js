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
    let traits = this.props.character.race.racial_traits
    traits = this.circumventTraits(this.props.character.name, traits)

    return traits.map(trait => {
        return (
          <li data-id={trait.id} onClick={this.changeActiveFeature} className='highlight'>
            <strong data-id={trait.id}>{trait.name}</strong>
            {this.state.activeTrait === trait.id && <div style={{color: '#000'}}>{trait.description}</div>}
          </li>
        )

    })
  }

  circumventTraits = (name, traits) => {
    let newTraits = []
    let replacedTraits = []
    let addedTraits = []
    if (name === "Persephone"){
      replacedTraits = ['Green Widow', 'Hulking Changeling', 'Sea Lungs']
      addedTraits = [
        {
          id: 1000,
          name: 'Object of Desire',
          description: <div>The changeling adds +1 to her caster level when casting <em>charm person</em> and <em>charm monster</em>.</div>
        }
      ]
    }
    if (name === "Cedrick"){
      replacedTraits = ['Swamp Stride']
      addedTraits = [
        {
          id: 2000,
          name: 'Glider',
          description: 'Gripplis’ aerodynamic bodies and thick webbing between the toes enable a falling grippli to treat the distance fallen as half the actual distance. The grippli can steer himself while falling, moving horizontally up to a number of feet equal to half the vertical distance fallen. The grippli cannot use this trait if it is wearing heavy armor, is carrying a heavy load, or is unable to react to the fall (such as being helpless).'
        }
      ]
    }
    newTraits = traits.filter(f => !replacedTraits.includes(f.name))
    addedTraits.forEach(af => newTraits.push(af))
    return newTraits
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
