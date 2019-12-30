import React from 'react'
import Portal from '../portal'
import { connect } from 'react-redux'

class HPChanges extends React.Component {

  state = {
    amount: 0,
    adjustment: '',
    lethality: 'lethal',
    damageType: '',
    id: this.props.character.id
  }

  renderAmount = () => {
    return (
      <span>
        <div>
          <label>
            <input type="number" name="amount" value={this.state.amount} onChange={this.handleChange}/>
          </label>
          {/*this.state.lethality === 'lethal' && this.state.adjustment === 'harm' && <label>
            Damage Type:
            <select name="damageType" value={this.state.damageType} onChange={this.handleChange}>
              <option value="" >Choose One</option>
              <option value="Bludgeoning">Bludgeoning</option>
              <option value="Slashing">Slashing</option>
              <option value="Piercing">Piercing</option>
              <option value="Fire">Fire</option>
              <option value="Cold">Cold</option>
              <option value="Acid">Acid</option>
              <option value="Electricity">Electricity</option>
              <option value="Sonic">Sonic</option>
              <option value="Psychic">Psychic</option>
              <option value="Force">Force</option>
              <option value="Positive">Positive</option>
              <option value="Negetive">Negetive</option>
            </select>
          </label>*/}
        </div>
      </span>
    )
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderAdjustment = () => {
    return (
      <span>
      <label>
        HP Changes:
        <select name="adjustment" value={this.state.adjustment} onChange={this.handleChange}>
          <option value="" >Choose One</option>
          <option value="heal" >Heal</option>
          <option value="harm" >Damage</option>
          <option value="temp" >Temporary HP</option>
        </select>
      </label>
      </span>
      )
    }

  renderLethality = () => {
    return (
      <form>
        <span className="radio">
          <label>
            <input type="radio" name="lethality" value="lethal" checked={this.state.lethality === 'lethal'} onChange={this.handleChange} />
            Lethal
          </label>
        </span>
        <span className="radio">
          <label>
            <input type="radio" name="lethality" value="nonLethal" checked={this.state.lethality === 'nonLethal'} onChange={this.handleChange} />
            Non-lethal
          </label>
        </span>
      </form>
      )
    }

    renderString = () => {
      switch(this.state.adjustment){
        case "heal":
          return "Heal Up";
        case "harm":
          return this.state.lethality === 'lethal' ? "Deal Damage" : 'Just a Scratch';
        case "temp":
          return "Buff Me"
        default:
          return "no button found"
      }
    }

  renderTypeAdjustments = () =>{
    let array = []
    let name = this.props.character.name
    if (name === "Merg"){
      array.push('DR 3/- (DR 6/- against non-lethal)')
      array.push('Resist fire 2')
      if (this.props.character_info.hardcode.rage){
        array.push('Resist electricity 10')
      }
    } else if (name === 'Robby'){
      array.push('Immune fire (50 damage total)')
    }
    return (
      <ul>
        {array.map(el => <li>{el}</li>)}
      </ul>
    )
  }

  render() {
    return (
      <Portal>
      <div className="page-dimmer" onClick={this.props.clickOut}>
        <div className="edit-form" name="background">
          <span>
            {this.renderAmount()}{this.renderAdjustment()}
          </span>
          {this.state.adjustment === 'harm' && this.renderLethality()}
          <br/>
          {this.renderTypeAdjustments()}
          {(this.state.amount !== 0 && this.state.amount !== "") && <button onClick={() => this.props.renderEdit(this.state, 'hp_changes')}>{this.renderString()}</button>}
        </div>
      </div>
      </Portal>
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

export default connect(mapStatetoProps)(HPChanges)
