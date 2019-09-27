import React from 'react'

class ArmorClass extends React.Component {

  dexMod = () => {
    let dex = this.props.character.dexterity
    this.props.character.race.race_ability_score_modifiers.forEach(mod => {
      if ('Dexterity' === mod.ability_score){
        dex += mod.bonus
      }
    })
    if (this.props.character.anyBonus === 'Dexterity'){
      dex +=2
    }
    return Math.floor((dex - 10) / 2)
  }

  // renderSize = () => {
  //   if (this.props.character.race.size === 'Small'){
  //     return 1
  //   } else {
  //     return 0
  //   }
  // }

  renderSize = () => {
    switch (this.props.character.race.size){
      case 'Small':
        return 1;
      case 'Large':
        return -1;
      default:
        return 0;
    }
  }

  render () {
    return(
      <div id='ac' className='shadow'>
        <span className='centered'>
          <div className='dull'><strong>Armor Class</strong></div>
          <div className='enhanced'>{10 + this.dexMod() + this.renderSize()}</div>
        </span>
      </div>
    )
  }
}

export default ArmorClass
