import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

import SpellDescription from '../components/spell_description'

class SpellDescriptionModal extends React.Component {

  state ={
    spell: null
  }

  componentDidMount() {
    if (!this.props.spells.length){
      fetch(`http://localhost:3000/api/v1/spells/${this.props.spellId}`)
      .then(r => r.json())
      .then(data => {
        this.setState({spell: data.spell})
      })
    } else {
      const spell = this.props.spells.find(sp => sp.id === this.props.spellId)
      this.setState({spell})
    }
  }

  render(){
    console.log(this.state.spell)
    return (
      <Portal>
      <div className="page-dimmer" onClick={this.props.clickOut}>
        <div id='spell-desc' name="background">
          {this.state.spell && <SpellDescription spell={this.state.spell}/>}
        </div>
      </div>
      </Portal>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
    spells: state.spells
  }
}

export default connect(mapStatetoProps)(SpellDescriptionModal)
