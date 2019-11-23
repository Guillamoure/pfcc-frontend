import React from 'react'
import { connect } from 'react-redux'

class PrepareSpells extends React.Component {

  state = {
    knownSpells: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/known_spells?character=${this.props.character.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({knownSpells: data})
    })
  }

  renderKnownSpells = () => {
    return this.state.knownSpells.map(ks => {
      return <li><strong>{ks.spell.name}</strong> | {ks.klass.name} | Level {ks.klass_spell.spell_level}</li>
    })
  }

  render(){
    console.log(this.state.knownSpells)
    return (
      <div>
        <p>Did it work?</p>
        <ul>
        {this.renderKnownSpells()}
        </ul>
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

export default connect(mapStatetoProps)(PrepareSpells)
