import React from 'react'

class Spellcasting extends React.Component {

  state = {
    abilityScore: "",
    prepared: false,
    limited: false
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderForm = () => {
    return (
      <div>
        <label>
          Relevant Ability Score:
          <select name="abilityScore" value={this.state.abilityScore} onChange={this.renderChange}>
            <option value="">Select One</option>
            <option value="Strength">Strength</option>
            <option value="Dexterity">Dexterity</option>
            <option value="Constitution">Constitution</option>
            <option value="Intelligence">Intelligence</option>
            <option value="Wisdom">Wisdom</option>
            <option value="Charisma">Charisma</option>
          </select>
        </label>
        <br/>
        <label>
          Do you have to prepare your spells?
          <input type="checkbox" name="prepared" isSelected={this.state.prepared} onChange={this.renderChange}/>
        </label>
        <br/>
        <label>
          Are you limited by your spells you can choose?
          <input type="checkbox" name="limited" isSelected={this.state.limited} onChange={this.renderChange}/>
        </label>
        <br /><br />
        <button onClick={() => this.props.fetch(this.state, "spellcasting")}>Create Feature Effect</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    )
  }
}

export default Spellcasting
