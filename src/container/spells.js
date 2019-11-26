import React from 'react'
import { connect } from 'react-redux'

import SpellsContainer from './spells_container'
import SpellDescription from '../components/spell_description'

class Spells extends React.Component {

  state = {
    activeSpell: null,
    alphabetizedSpells: []
  }

  componentDidMount(){
    if(!this.props.spells.length){
      fetch('http://localhost:3000/api/v1/spells')
      .then(r => r.json())
      .then(data => {
        this.props.dispatch({type: 'ALL SPELLS', spells: data })
        this.alphabetize(data)
      })
    }
  }

  alphabetize = (spells) => {
    let sortedSpells = [...spells].sort((sp1, sp2) => {
      if (sp1.name > sp2.name){
        return 1
      } else if (sp1.name < sp2.name){
        return -1
      } else {
        return 0
      }
    })
    this.setState({alphabetizedSpells: sortedSpells})
  }

  renderSpells = () => {
    return this.props.spells.map(sp => {
      return <p>{sp.name}</p>
    })
  }

  oneSpell = (id) => {
    return this.props.spells.find(spell => spell.id === id)
  }

  renderEdit = (id) => {
    if (this.state.activeSpell !== id){
      this.setState({activeSpell: id})
    } else {
      this.setState({activeSpell: null})
    }
  }


  render() {
    return (
      <div id='spells-container'>
        <span>
          <SpellsContainer spells={this.state.alphabetizedSpells} renderEdit={this.renderEdit}/>
        </span>
        <span>
          { this.state.activeSpell ?
            <SpellDescription spell={this.oneSpell(this.state.activeSpell)}/>
            :
            <p>{"<3 Click on a Spell <3"}</p>
          }
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    spells: state.spells
  }
}


export default connect(mapStateToProps)(Spells)
