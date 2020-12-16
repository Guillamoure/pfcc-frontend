import React from 'react'
import { connect } from 'react-redux'
import localhost from '../localhost'


class HPChanges extends React.Component {

  state = {
    amount: 0,
    adjustment: '',
    lethality: 'lethal',
    damageType: '',
    id: this.props.character.id
  }

  renderAmount = () => {
    if (localStorage.computer === "true"){
      return (
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
      )
    } else {
      return (
        <span>
          <label>
            <input className='mobile-input-field mobile-input-field-number' type="number" name="amount" value={this.state.amount} onChange={this.handleChange} />
          </label>
        </span>
      )
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleMobileButton = (sign) => {
    if (sign === '+'){
      this.setState({amount: this.state.amount + 1})
    } else if (sign === '-' && this.state.amount > 0){
      this.setState({amount: this.state.amount - 1})
    }
  }

  renderAdjustment = () => {
    if (localStorage.computer === "true"){
      return (
        <div>
          <label>
          HP Changes:
            <select name="adjustment" value={this.state.adjustment} onChange={this.handleChange}>
              <option value="">Choose One</option>
              <option value="heal">Heal</option>
              <option value="harm">Damage</option>
              <option value="temp">Temporary HP</option>
            </select>
          </label>
        </div>
      )
    } else if (localStorage.computer === "false"){
      return (
        <span>
          <label>
            <select className='mobile-dropdown' name="adjustment" value={this.state.adjustment} onChange={this.handleChange}>
              <option value="">Choose One</option>
              <option value="heal">Heal</option>
              <option value="harm">Damage</option>
              <option value="temp">Temporary HP</option>
            </select>
          </label>
        </span>
      )
    }
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
    } else if (name === 'Grackle'){
      array.push('Resist fire 5')
    } else if (name === "Majestik"){
			array.push("Resist fire 5")
		}
    return (
      <ul>
        {array.map(el => <li>{el}</li>)}
      </ul>
    )
  }

	removeTemporaryHPRedux = () => {
		// NEW DATA

		// STORED DATA
		const { temporaryHitPoints } = this.props.character_info
		let damageDealt = parseInt(this.state.amount)

		// CALCULATED DATA

		temporaryHitPoints.forEach(thp => {
			let remainingTHP = thp.bonus - thp.damage
			if (damageDealt >= remainingTHP){
				this.props.dispatch({type: 'REMOVE TEMP HP', source: thp.source})
				damageDealt -= remainingTHP
			} else {
				 this.props.dispatch({type: 'DAMAGE TEMP HP', source: thp.source, damage: damageDealt})
				 damageDealt = 0
			}
		})

		return damageDealt
	}

	renderHPDispatch = (amount) => {
		switch(this.state.adjustment){
			// if it was harm, calculate the damage done to temp, and reduce temp and increase lethal
			// if it was heal, reduce lethal and/or non lethal
			// if it was temp, increase temp
			// if it was non-lethal, increase non-lethal
			case "harm":
				if (this.state.lethality === "nonLethal"){
					this.props.dispatch({type: "ADJUST CHARACTER", adjust: "non_lethal_damage", value: this.props.character.non_lethal_damage + amount})
					break
				} else if (this.state.lethality === "lethal"){
					let remainingDamage = amount
					if (this.props.character.temp_hp){
						let reducedTempHP = remainingDamage >= this.props.character.temp_hp ? 0 : this.props.character.temp_hp - remainingDamage
						remainingDamage = remainingDamage <= this.props.character.temp_hp ? 0 : remainingDamage - this.props.character.temp_hp
						this.props.dispatch({type: "ADJUST CHARACTER", adjust: "temp_hp", value: reducedTempHP})
					}
					this.props.dispatch({type: "ADJUST CHARACTER", adjust: "lethal_damage", value: this.props.character.lethal_damage + remainingDamage})
					break
				}
			case "heal":
				let toBeHealedLethal = amount >= this.props.character.lethal_damage ? 0 : this.props.character.lethal_damage - amount
				this.props.dispatch({type: "ADJUST CHARACTER", adjust: "lethal_damage", value: toBeHealedLethal})
				let toBeHealedNonLethal = amount >= this.props.character.non_lethal_damage ? 0 : this.props.character.non_lethal_damage - amount
				this.props.dispatch({type: "ADJUST CHARACTER", adjust: "non_lethal_damage", value: toBeHealedNonLethal})
				break
			case "temp":
				this.props.dispatch({type: "ADJUST CHARACTER", adjust: "temp_hp", value: this.props.character.temp_hp + amount})
				break
			default:
				break
		}
	}

  buttonEvent = () => {
		let amount = parseInt(this.state.amount)
		if (this.state.adjustment === "harm"){
			amount = this.removeTemporaryHPRedux()
		}
		if (amount > 0){
			fetch(`${localhost}/api/v1/hp_changes`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({...this.state})
			})
			.then(res => res.json())
			.then(data => {
				this.renderHPDispatch(amount)


				// this.props.dispatch({type: 'CHARACTER', character: data.character })
				// this.setState({character: data.character, modal: false}, this.dispatchAbilityScores(), this.dispatchClassLevels())
				this.props.exitModal()
			})
		} else {
			this.props.exitModal()
		}
    if (localStorage.computer === "false"){
      this.props.closeHPChanges()
    }
  }

  renderMobileButtons = () => {
    let minusColor = '#fff'
    minusColor = this.state.amount <= 0 ? '#999' : minusColor

    return (
      <section style={{textAlign: 'center'}}>
        <button className='mobile-hp-button glow-blue' style={{borderRadius: '0.5em 0em 0em 0.5em', borderRightWidth: '1px', backgroundColor: '#fff'}} onClick={() => this.handleMobileButton('+')}>+</button>
        <button className='mobile-hp-button glow-red' style={{borderRadius: '0em 0.5em 0.5em 0em', borderLeftWidth: '1px', backgroundColor: minusColor}} onClick={() => this.handleMobileButton('-')}>-</button>
      </section>
    )
  }

  render() {
    let submitButtonColor = '#fff'
    submitButtonColor = this.state.adjustment === 'heal' ? '#0f0' : submitButtonColor
    submitButtonColor = this.state.adjustment === 'harm' ? '#f00' : submitButtonColor
    submitButtonColor = this.state.adjustment === 'temp' ? '#0892D0' : submitButtonColor
    return (
      <section id="character-show-hp-container">
        {this.renderAmount()}{this.renderAdjustment()}
        {localStorage.computer === "false" && <span><button className='mobile-close-button' onClick={this.props.closeHPChanges}>X</button></span>}
				
        {this.state.adjustment === 'harm' && this.renderLethality()}
        {localStorage.computer === "false" && this.renderMobileButtons()}

        {this.renderTypeAdjustments()}
        {(this.state.amount !== 0 && this.state.amount !== "") && <span style={{textAlign: 'center', display: 'block'}}><button className='mobile-submit-button' style={{background: `linear-gradient(90deg, #fff 35%, ${submitButtonColor})`}} onClick={this.buttonEvent}>{this.renderString()}</button></span>}
      </section>
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
