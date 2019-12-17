import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class Feats extends React.Component {

  state = {
    activeFeat: 0
  }

  changeActiveFeature = (id) => {
    if (this.state.activeFeat === id) {
      this.setState({activeFeat: 0})
    } else {
      this.setState({activeFeat: id})
    }
  }

  renderDescription = (desc) => {
    desc = desc.split("\n\n")
    return desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
  }

  renderFeats = () => {
    let feats = []
    switch(this.props.character.name){
      case("Nettie"):
        feats = this.nettie()
        break
      default:
        break
    }
    return feats.map(f => {
      return (
        <li onClick={() => this.changeActiveFeature(f.id)} className='highlight'>
          <strong data-id={f.id}>{f.name}</strong>
          {this.state.activeFeat === f.id && <div style={{color: '#000'}}>{this.renderDescription(f.description)}</div>}
        </li>
      )
    })
  }

  nettie = () => {
    return [
      {
        id: 1001,
        description: 'You can prepare for future contingencies without defining what those preparations are until they are relevant. As a part of this preparation, while in a settlement for at least 24 hours, you can take 8 hours and spend up to 50 gp per character level, which becomes your brilliant plan fund. While you have a brilliant plan pending, you are always treated as carrying 20 additional pounds of weight, even before you define your brilliant plan.\n\nOnce per day, you can take 10 minutes to enact a brilliant plan, withdrawing an item that would have been available in a settlement you visited or procuring a mundane service that your character planned ahead of time. Once you enact the plan, subtract the price of the item or service from this feat’s fund. Any item procured must weigh 10 pounds or less. Likewise, the GM must approve any non-magical service you gain by using this feat as being appropriate for the location selected.\n\nOnce you have spent all the money in your brilliant plan fund or procured 20 pounds of objects with this feat, you cannot use the feat again until you replenish your brilliant plan fund.',
        name: "Brilliant Planner"
      },
      {
        id: 1002,
        description: "Add one spell from your class’s spell list to your list of spells known. This is in addition to the number of spells normally gained at each new level in your class. You may instead add two spells from your class’s spell list to your list of spells known, but both of these spells must be at least one level lower than the highest level spell you can cast in that class. Once made, these choices cannot be changed.",
        name: "Expanded Arcana"
      },
      {
        id: 1003,
        description: "The bonuses and penalties from your bardic performance continue for 2 rounds after you cease performing. Any other requirement, such as range or specific conditions, must still be met for the effect to continue. If you begin a new bardic performance during this time, the effects of the previous performance immediately cease.",
        name: "Lingering Performance"
      },
      {
        id: 1004,
        description: "Add +1 to the Difficulty Class for all saving throws against spells from the school of magic you select.",
        name: "Spell Focus (conjuration)"
      }
    ]
  }

  cedrick = () => {
    return [
      {
        id: 1005,
        description: "You gain a +1 bonus on all attack rolls you make using the selected weapon.",
        name: "Weapon Focus (shifter claws)"
      }
    ]
  }


  render () {
    return(
      <div style={{padding: '1em'}}>
      {this.renderFeats()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    character: state.character
  }
}


export default connect(mapStateToProps)(Feats)
