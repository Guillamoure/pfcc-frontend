import React from 'react'

import SpellCard from '../components/spell_card'

class SpellsContainer extends React.Component{

  renderSpells = () => {
    return this.props.spells.map(sp => <SpellCard spell={sp} renderEdit={this.props.renderEdit}/>)
  }

  render() {
    return (
      <div id='all-spells'>
        {this.renderSpells()}
      </div>
    )
  }
}


export default SpellsContainer
