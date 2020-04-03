import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

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
          <li data-id={trait.id} onClick={this.changeActiveFeature} className='highlight mobile-selected-tab-content'  style={{maxHeight: window.outerHeight * 0.4}}>
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
    if (name === "Maddox"){
      replacedTraits = ['Shards of the Past']
      addedTraits = [
        {
          id: 3000,
          name: 'Mystic Past Life',
          description: <span>You can add spells from another spellcasting class to the spell list of your current spellcasting class. You add a number of spells equal to 1 + your spellcasting class’s key ability score bonus (Wisdom for clerics, and so on). The spells must be the same type (arcane or divine) as the spellcasting class you’re adding them to. These spells do not have to be spells you can cast as a 1st-level character. The number of spells granted by this ability is set at 1st level. Changes to your ability score do not change the number of spells gained.<p><ul><li><em>Lay of the Land</em></li><li><em>Kiss of the First World</em></li><li><em>Mass Cure Light Wounds</em></li><li><em>Music of the Spheres</em></li><li><em>Mass Cure Moderate Wounds</em></li></ul></p></span>
        }
      ]
    }
    if (name === "Grackle"){
      replacedTraits = ['Fiendish Sorcery', 'Spell-like Ability', 'Fiendish Resistance']
      addedTraits = [
        {
          id: 4000,
          name: 'Soul Seer',
          description: <span>Rare tieflings have a peculiar sight that allows them to see the state of a creature’s soul. They can use <em>deathwatch</em> at will as spell-like ability.</span>
        },
        {
          id: 4001,
          name: 'Scaled Skin',
          description: <span>The skin of these tieflings provides some energy resistance, but is also as hard as armor. Choose one of the following energy types: cold, electricity, or <strong>fire</strong>. A tiefling with this trait gains resistance 5 in the chosen energy type and also gains a +1 natural armor bonus to AC.</span>
        }
      ]
    }
    newTraits = traits.filter(f => !replacedTraits.includes(f.name))
    addedTraits.forEach(af => newTraits.push(af))
    return newTraits
  }

  render(){
    return(
      <div style={{padding: '1em'}} className={localStorage.computer === "false" ? 'mobile-tab-selected-tab-container' : 'none'}>
        {this.renderRacialTraits()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    character: state.character
  }
}


export default connect(mapStateToProps)(Traits)
