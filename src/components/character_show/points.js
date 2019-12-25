import React from 'react'
import { connect } from 'react-redux'

class Points extends React.Component {

  renderPoints = (name) => {
    switch(name){
      case "Nettie":
        return (
          <span className='centered' onClick={() => this.props.editModal('points')}>
            <div className='enhanced'>{this.props.character_info.hardcode.points} / 19</div>
            <div className='muted'>Bardic Performance</div>
          </span>
        )
      case "Merg":
        return (
          <span className='centered' onClick={() => this.props.editModal('points')}>
            <div className='enhanced'>{this.props.character_info.hardcode.points} / 18</div>
            <div className='muted'>Rage Rounds</div>
          </span>
        )
      case "Cedrick":
        return (
          <span className='centered' onClick={() => this.props.editModal('points')}>
            <div className='enhanced'>{this.props.character_info.hardcode.points} / 7</div>
            <div className='muted'>Chimera Points</div>
          </span>
        )
      case "Robby":
        return (
          <span className='centered' onClick={() => this.props.editModal('points')}>
            <div className='enhanced'>{this.props.character_info.hardcode.points}</div>
            <div className='muted'>Panache Points</div>
          </span>
        )
      case "Maddox":
        return (
          <span className='centered' onClick={() => this.props.editModal('points')}>
            <div className='enhanced'>{this.props.character_info.hardcode.points} / 10</div>
            <div className='muted'>Arcane Reservoir</div>
          </span>
        )
      default:
        return ""
    }
  }

  render(){
    return(
      <div id='points' className='shadow shrink'>
        {this.renderPoints(this.props.character.name)}
      </div>
    )
  }

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Points)
