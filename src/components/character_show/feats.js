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
      case("Cedrick"):
        feats = this.cedrick()
        break
      case("Persephone"):
        feats = this.pepper()
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
        id: 2000,
        description: "You gain +3 hit points. For every Hit Die you possess beyond 3, you gain an additional +1 hit point. If you have more than 3 Hit Dice, you gain +1 hit points whenever you gain a Hit Die (such as when you gain a level).",
        name: "Toughness"
      },
      {
        id: 2001,
        description: "You make attack rolls with simple weapons without penalty.",
        name: "Simple Weapon Proficiency"
      },
      {
        id: 2002,
        description: "You can choose to take a –1 penalty on all melee attack rolls and combat maneuver checks to gain a +2 bonus on all melee damage rolls. This bonus to damage is increased by half (+50%) if you are making an attack with a two-handed weapon, a one handed weapon using two hands, or a primary natural weapon that adds 1-1/2 times your Strength modifier on damage rolls. This bonus to damage is halved (–50%) if you are making an attack with an off-hand weapon or secondary natural weapon. When your base attack bonus reaches +4, and every 4 points thereafter, the penalty increases by –1 and the bonus to damage increases by +2. You must choose to use this feat before making an attack roll, and its effects last until your next turn. The bonus damage does not apply to touch attacks or effects that do not deal hit point damage.",
        name: "Power Attack"
      },
      {
        id: 2003,
        description: "You do not provoke an attack of opportunity when performing a bull rush combat maneuver. In addition, you receive a +2 bonus on checks made to bull rush a foe. You also receive a +2 bonus to your Combat Maneuver Defense whenever an opponent tries to bull rush you.",
        name: "Improved Bull Rush"
      },
      {
        id: 2004,
        description: "You gain a +1 bonus on all attack rolls you make using the selected weapon.",
        name: "Weapon Focus (shifter claws)"
      }
    ]
  }

  pepper = () => {
    return [
      {
        id: 3000,
        description: "You gain a +1 dodge bonus to your AC. A condition that makes you lose your Dex bonus to AC also makes you lose the benefits of this feat.",
        name: "Dodge"
      },
      {
        id: 3001,
        description: "As a swift action, you can imbue your weapons with a fraction of your power. For 1 round, your weapons deal +1 damage and are treated as magic for the purpose of overcoming damage reduction. For every five caster levels you possess, this bonus increases by +1, to a maximum of +5 at 20th level.",
        name: "Arcane Strike"
      },
      {
        id: 3002,
        description: "You get a +1 bonus on attack and damage rolls with ranged weapons at ranges of up to 30 feet.",
        name: "Point-Blank Shot"
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
