import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

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
        <span className='second-row'>{this.props.character.race.name} {this.renderClasses()}</span>
        {this.props.character.user_id === this.props.currentUser.id && <span className='edit' onClick={() => this.props.editModal('character')}><FontAwesomeIcon icon={faPencilAlt} /></span>}
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
