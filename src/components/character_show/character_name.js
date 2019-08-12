import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import { faDungeon } from '@fortawesome/free-solid-svg-icons'

class CharacterName extends React.Component {

  // renderClasses = () => {
  //   let klasses = this.props.character.klasses.map(klass => {
  //     let char_klass = this.props.character.character_klasses.find(char_k => klass.id === char_k.klass_id)
  //     return `${klass.name} ${char_klass.level}`
  //   })
  //   return klasses.join(", ")
  // }

  renderClasses = (character) => {
    let klasses = {}
    this.props.character.klasses.forEach(klass => {
      if (klasses[klass.name]) {
        klasses[klass.name]++
      } else {
        klasses[klass.name] = 1
      }
    })
    let classesLevels = []
    Object.entries(klasses).forEach(klass => {
      classesLevels.push(`${klass[0]} ${klass[1]}`)
    })
    return classesLevels.join(", ")
  }

  render(){
    return(
      <div id='character'>
        <div className='first-row' style={{padding: '.25em'}} id='title'>{this.props.character.name}</div>
        <span className='second-row' style={{padding: '.5em'}}>{this.props.character.race.name} {this.renderClasses()}</span>
        {this.props.character.user_id === this.props.currentUser.id && <span className='edit' onClick={() => this.props.editModal('character')}><FontAwesomeIcon icon={faPencilAlt} /></span>}
        <span className="notif" data-badge-1="3" data-badge-2="12" data-badge-3="1"><FontAwesomeIcon icon={faDiceD20} size='3x'onClick={() => this.props.editModal('notifications')} /></span>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(CharacterName))
