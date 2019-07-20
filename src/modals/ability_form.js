import React from 'react'
import Portal from '../portal'

class AbilityForm extends React.Component{

  state = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    id: ""
  }

  componentDidMount() {
    this.setState({
      strength: this.props.character.strength,
      dexterity: this.props.character.dexterity,
      constitution: this.props.character.constitution,
      intelligence: this.props.character.intelligence,
      wisdom: this.props.character.wisdom,
      charisma: this.props.character.charisma,
      id: this.props.character.id
    })
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <Portal>
        <div className="page-dimmer" onClick={this.props.clickOut}>
          <div className="edit-form" name="background">
            <span className="enhanced" >Ability Scores</span>
            <br /><br />
            <label>Strength</label>
            <br />
            <input type="number" name="strength" value={this.state.strength} onChange={this.renderChange}/>
            <br />
            <label>Dexterity</label>
            <br />
            <input type="number" name="dexterity" value={this.state.dexterity} onChange={this.renderChange}/>
            <br />
            <label>Constitution</label>
            <br />
            <input type="number" name="constitution" value={this.state.constitution} onChange={this.renderChange}/>
            <br />
            <label>Intelligence</label>
            <br />
            <input type="number" name="intelligence" value={this.state.intelligence} onChange={this.renderChange}/>
            <br />
            <label>Wisdom</label>
            <br />
            <input type="number" name="wisdom" value={this.state.wisdom} onChange={this.renderChange}/>
            <br />
            <label>Charisma</label>
            <br />
            <input type="number" name="charisma" value={this.state.charisma} onChange={this.renderChange}/>
            <br /><br />
            <button onClick={() => this.props.renderEdit(this.state, 'ability')}>Submit</button>
          </div>
        </div>
      </Portal>
    );
  }
}


export default AbilityForm
