import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Characters extends React.Component {

  renderClasses = (character) => {
    let klasses = character.klasses.map(klass => {
      let char_klass = character.character_klasses.find(char_k => klass.id === char_k.klass_id)
      return `${klass.name} ${char_klass.level}`
    })
    return klasses.join(", ")
  }

  renderCharacters = () => {
    const sortedCharacters = this.props.characters.sort((a,b) => a.id - b.id)
    return sortedCharacters.map(char => {return (
      <div className='card' onClick={() => this.props.history.push(`/characters/${char.id}`)} key={char.id} >
        <span className='card-char'>
        <div style={{padding: '.5em', lineHeight: '1.2', fontSize: '1.5em'}}>{char.name}</div>
        <div style={{padding: '.5em'}}>{char.race.name}</div>
        <div style={{padding: '.5em', lineHeight: '1.2'}}>{this.renderClasses(char)}</div>
        </span>
        <div className="fade"></div>

      </div>
    )})
  }

  // {this.props.characters.map(character => {
  //   return (
  //     <span>
  //     <p><Link to={`/characters/${character.id}`} key={character.id} >{character.name}</Link></p>
  //     <p>{character.race.name}</p>
  //     {character.klasses.map(klass => <p>{klass.name}</p>)}
  //     </span>
  //   )
  // })}

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        {this.renderCharacters()}
      </React.Fragment>
    )
  }

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Characters))
