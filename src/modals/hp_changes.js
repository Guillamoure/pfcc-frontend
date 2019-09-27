import React from 'react'
import Portal from '../portal'
import { connect } from 'react-redux'

class HPChanges extends React.Component {

  state = {
    amount: 0,
    adjustment: "heal",
    lethality: 'lethal',
    id: this.props.character.id
  }

  renderAmount = () => {
    return (
      <span>
        <div>
          <label>
            <input type="number" name="amount" value={this.state.amount} onChange={this.handleChange}/>
          </label>
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
        <div className="radio">
          <label>
            <input type="radio" name="adjustment" value="heal" checked={this.state.adjustment === 'heal'} onChange={this.handleChange} />
            Heal
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="adjustment" value="harm" checked={this.state.adjustment === 'harm'} onChange={this.handleChange} />
            Damage
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="adjustment" value="temp" checked={this.state.adjustment === 'temp'} onChange={this.handleChange} />
            Temporary Hit Points
          </label>
        </div>
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
          return "Deal Damage";
        case "temp":
          return "Buff Me"
        default:
          return "no button found"
      }
    }

  render() {
    return (
      <Portal>
      <div className="page-dimmer" onClick={this.props.clickOut}>
        <div className="edit-form" name="background">
          <div>
            {this.renderAmount()}
            {this.renderAdjustment()}
          </div>
          {this.state.adjustment === 'harm' && this.renderLethality()}
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
