import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


const Characters = props => {

  const [show, setShow] = React.useState(false);

  const renderClasses = (character) => {
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
      const level = character.class_obj.find(clo => clo.klass_id === kl.id).level
      return `${kl.name} ${level}`
    })
    return mappedClasses.join(", ")
  }

  const renderCharacters = () => {
    const sortedCharacters = props.characters.sort((a,b) => a.name > b.name ? 1 : -1)
    if (localStorage.computer === 'true'){
      return sortedCharacters.map(char => {
        return (
          <div className='card' onClick={() => props.history.push(`/characters/${char.id}`)} key={char.id} >
          <span className='card-char'>
          <div style={{padding: '.5em', lineHeight: '1.2', fontSize: '1.5em'}}>{char.name}</div>
          <div style={{padding: '.5em'}}>{char.race.name}</div>
          <div style={{padding: '.5em', lineHeight: '1.2'}}>{renderClasses(char)}</div>
          </span>
          <div className="fade"></div>

          </div>
        )
      })
    } else {
      if (sortedCharacters.length > 4){
        if (show){
          return (
            <>
              <div onClick={() => setShow(!show)}>Characters <FontAwesomeIcon icon={faCircle}/></div>
              {sortedCharacters.map(ch => <div className='mobile-character-button' onClick={() => props.history.push(`/characters/${ch.id}`)} key={ch.id * 3 - 1 }><strong>{ch.name}</strong> - {ch.race.name} {renderClasses(ch)}</div>)}
            </>
          )
        } else {
          return <div onClick={() => setShow(!show)}>Characters <FontAwesomeIcon icon={faSortDown}/></div>
        }
      } else {
        // UNTESTED
        return (
          <>
            {sortedCharacters.map(ch => <div className='mobile-character-button' onClick={() => props.history.push(`/characters/${ch.id}`)} key={ch.id * 3 - 1 }><strong>{ch.name}</strong> - {ch.race.name} {renderClasses(ch)}</div>)}
          </>
        )
      }
    }
  }

  return (
    <React.Fragment>
      {props.currentUser && renderCharacters()}
    </React.Fragment>
  )

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Characters))
