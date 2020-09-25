import React from 'react'
import { connect } from 'react-redux'
import { renderKlassSpecializations } from '../../helper_functions/notifications/character_choices'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import HP from '../../components/HP'

class Creation extends React.Component {

  state = {
    activeProblem: ""
  }

  missingHP = () => {
    let nullHP = false
    this.props.character.character_klasses.forEach(ck => {
      if (ck.hp === null){
        nullHP = true
      }
    })
    return nullHP
  }

  addHP = () => {
    if (this.missingHP() && this.state.activeProblem !== "HP") {
      return <div onClick={() => this.setState({activeProblem: "HP"})}><FontAwesomeIcon icon={faExclamationTriangle} color='#f00'/>You are missing Hit Points!</div>
    }
    if (this.missingHP() && this.state.activeProblem === "HP") {
      return <HP exitModal={this.props.exitModal} />
    }
  }

  render(){

    return(
      <span style={{padding: '1em'}}>
        <p>Creation Problems</p>
        {this.addHP()}
				{renderKlassSpecializations()}
      </span>
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

export default connect(mapStatetoProps)(Creation)
