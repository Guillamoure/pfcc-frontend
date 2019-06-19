import React from 'react'

class CharacterName extends React.Component {

  renderClasses = () => {
    let klasses = this.props.character.klasses.map(klass => {
      let char_klass = this.props.character.character_klasses.find(char_k => klass.id === char_k.klass_id)
      return `${klass.name} ${char_klass.level}`
    })
    return klasses.join(", ")
  }

  render(){
    return(
      <div id='character'>
        <div className='first-row' style={{padding: '.25em'}} id='title'>{this.props.character.name}</div>
        <div className='second-row'>{this.props.character.race.name} {this.renderClasses()}</div>
      </div>
    )
  }
}

export default CharacterName
