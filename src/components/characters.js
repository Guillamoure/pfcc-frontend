import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class Characters extends React.Component {

  renderClasses = (character) => {
    // let klasses = {}
    // character.klasses.forEach(klass => {
    //   if (klasses[klass.name]) {
    //     klasses[klass.name]++
    //   } else {
    //     klasses[klass.name] = 1
    //   }
    // })
    // let classesLevels = []
    // Object.entries(klasses).forEach(klass => {
    //   classesLevels.push(`${klass[0]} ${klass[1]}`)
    // })
    let mappedClasses = character.uniq_klasses.map(kl => {
      const level = character.character_klasses.filter(ck => ck.klass_id === kl.id).length
      return `${kl.name} ${level}`
    })
    return mappedClasses.join(", ")
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
    // console.log(this.props)
    return (
      <React.Fragment>
        {this.props.currentUser && this.renderCharacters()}
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
