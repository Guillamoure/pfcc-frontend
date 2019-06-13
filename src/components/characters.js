import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Characters extends React.Component {


  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.characters.map(character => {
          return (
            <span>
              <p><Link to={`/characters/${character.id}`} >{character.name}</Link></p>
              <p>{character.race.name}</p>
              {character.klasses.map(klass => <p>{klass.name}</p>)}
            </span>
          )
        })}
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

export default withRouter(connect(mapStatetoProps)(Characters))
