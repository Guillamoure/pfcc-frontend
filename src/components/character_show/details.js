import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'


class Details extends React.Component {
  state= {
    activeTab: "Features"
  }

  renderTabClick = (choice) => {
    this.setState({activeTab: choice})
  }

  languages = (name) => {
    switch(name){
      case "Nettie":
        return ["Common", "Draconic", "Aklo", "Infernal", "Sylvan", "Terran", "Undercommon", "Abyssal", "Celestial", "Sphinx", "Auran"]
      case "Cedrick":
        return ["Common", "Grippli", "Druidic", "Infernal", "Draconic", "Sylvan"]
      case 'Maddox':
        return ["Common", "Samsaran"]
      case 'Merg':
        return ['Common', 'Orc', 'Sylvan', 'Terran', 'Draconic', 'Giant', 'Undercommon']
      default:
        return []
    }
  }

  render(){
    console.log(this.props.character)
    return(
      <div id="details" className='shadow character-show'>
        <span className='header'>Background</span>
        {this.props.character.user_id === this.props.currentUser.id && <span className='edit' onClick={() => this.props.editModal('background')}><FontAwesomeIcon icon={faPencilAlt} /></span>}
          <div className='nested'>
            <div><strong>Background:</strong> {this.props.character.background}</div>
            <div><strong>Age:</strong> {this.props.character.age}</div>
            <div><strong>Size:</strong> {this.props.character.race.size}</div>
            <div><strong>Alignment:</strong> {this.props.character.alignment}</div>
            <div><strong>Deity:</strong> {this.props.character.deity}</div>
            <div><strong>Homeland:</strong> {this.props.character.homeland}</div>
          </div>
        <div className='header'>Appearance</div>
          <div className='nested'>
            <div><strong>Description:</strong> {this.props.character.description}</div>
            <div><strong>Gender:</strong> {this.props.character.gender}</div>
            <div><strong>Hair:</strong> {this.props.character.hair}</div>
            <div><strong>Eyes:</strong> {this.props.character.eyes}</div>
            <div><strong>Height:</strong> {this.props.character.height}</div>
            <div><strong>Weight:</strong> {this.props.character.weight}</div>
          </div>
        <div className='header'>Languages</div>
          <div className='nested'>
          {this.languages(this.props.character.name).join(", ")}
          </div>
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

export default withRouter(connect(mapStatetoProps)(Details))
