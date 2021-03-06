import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

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
      let name = this.props.character.uniq_klasses.find(k => k.id === cl.id).name
      // switch(name){
      //   case 'Barbarian':
      //     name = 'Drunken Brute Invulnerable Rager ' + name
      //     break
      //   case 'Rogue':
      //     name = 'Pirate ' + name
      //     break
      //   case 'Shifter':
      //     name = 'Chimera Weapon ' + name
      //     break
      //   case 'Witch':
      //     name = 'Autumn Season ' + name
      //     break
      //   case 'Vigilante':
      //     name = 'Magical Child ' + name
      //     break
      //   case 'Arcanist':
      //     name = 'Chronomancer ' + name
      //     break
      //   case 'Bard':
      //     name = 'Chronicler of Worlds ' + name
      //     break
      //   default:
      //     break
      // }
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
        case 'Chameleon - Major':
          name += ', but a Chameleon'
          break
        case 'Tiger':
          name += ', but a Tiger'
          break
        default:
          break
      }
    }
    if (this.props.character_info.hardcode.alterSelf){
      name = 'Not Harry Styles'
    }
    if (name === 'Maddox'){
      let age = this.props.character_info.hardcode.age
      name = age + ' '+ name
      if (age === 'Middle'){
        name = 'Middle Age Maddox'
      }
    }
    return name
  }



  render(){
    console.log('REDUX', this.props)
    return(
      <div>
        <div className='first-row' style={{padding: '.25em'}} id='title'>{this.name()}</div>
        <div className='second-row' style={{padding: '.5em'}}>{this.props.character.race.name} {this.renderClasses()}</div>
        {this.props.character.user_id === this.props.currentUser.id && localStorage.computer === "true" && <span className='edit' onClick={() => this.props.editModal('character')}><FontAwesomeIcon icon={faPencilAlt} /></span>}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}

export default withRouter(connect(mapStatetoProps)(CharacterName))
