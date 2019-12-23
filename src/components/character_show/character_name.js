import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
// import { faDungeon } from '@fortawesome/free-solid-svg-icons'

class CharacterName extends React.Component {

  // renderClasses = () => {
  //   let klasses = this.props.character.klasses.map(klass => {
  //     let char_klass = this.props.character.character_klasses.find(char_k => klass.id === char_k.klass_id)
  //     return `${klass.name} ${char_klass.level}`
  //   })
  //   return klasses.join(", ")
  // }

  renderClasses = () => {
    if (!this.props.character_info || !this.props.classes.length){
      return null
    }
    let remapped = this.props.character_info.classes.map(cl => {
      let name = this.props.classes.find(k => k.id === cl.id).name
      return `${name} ${cl.level}`
    })
    return remapped.join(", ")
  }

  name = () => {
    let name = this.props.character.name
    let major = this.props.character_info.hardcode.major
    if (this.props.character_info.hardcode.autumn){
      name = 'The Autumn Equinox'
    }
    if (major){
      switch (major){
        case 'Bull - Major':
          name += ', but a Bull'
          break
        case 'Frog - Major':
          name += ', but a big Frog'
          break
        case 'Condor - Major':
          name += ', but a Condor'
          break
        case 'Squid - Major':
          name += ', but a Squid'
          break
        case 'Tiger':
          name += ', but a Tiger'
          break
        default:
          break
      }
    }
    return name
  }

  render(){
    console.log('REDUX', this.props)
    return(
      <div id='character' className='shrink'>
        <div className='first-row' style={{padding: '.25em'}} id='title'>{this.name()}</div>
        <span className='second-row' style={{padding: '.5em'}}>{this.props.character.race.name} {this.renderClasses()}</span>
        {this.props.character.user_id === this.props.currentUser.id && <span className='edit' onClick={() => this.props.editModal('character')}><FontAwesomeIcon icon={faPencilAlt} /></span>}
        <span className="notif" data-badge-1="3" data-badge-2="12" data-badge-3="1">
          <FontAwesomeIcon id='spin' icon={faDiceD20} size='3x' onClick={() => this.props.editModal('notifications')} />
        </span>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character_info: state.character_info,
    classes: state.classes
  }
}

export default withRouter(connect(mapStatetoProps)(CharacterName))
