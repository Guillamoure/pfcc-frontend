import React from 'react'
import { connect } from 'react-redux'
import localhost from '../localhost'

class NewRace extends React.Component {

  state = {
    name: "",
    description: "",
    size: "Medium",
    speed: "",
    abilityScoreModifiers: [{ability_score: "", bonus: 0}],
    img_url: "",
    deleteRaceButton: false
  }

  componentDidMount() {
    if (this.props.race){
      this.setState({
        name: this.props.race.name,
        description: this.props.race.description,
        size: this.props.race.size,
        speed: this.props.race.speed,
        abilityScoreModifiers: this.props.race.race_ability_score_modifiers,
        img_url: this.props.race.img_url
      })
    }
  }

  renderSubmit = (e) => {
    e.preventDefault()
    fetch(`${localhost}/api/v1/races`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        this.props.history.push(`/races/${data.race.name}`)
        this.setState({name: "", description: "", size: "Medium", speed: 0, abilityScoreModifiers: [{ability_score: "", bonus: 0}], img_url: ""})
      } else {
        console.log(data.error)
      }
    })
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderFormSubmit = (e) => {

    if (this.props.renderRaceEdit){
        this.props.renderRaceEdit(e, this.state)
    } else {
      this.renderSubmit(e)
    }
  }

  renderForm = () => {
    return (
      <form onSubmit={(e) => this.renderFormSubmit(e)} >
        <label>
          Race Name:
          <input type="text" name="name" value={this.state.name} onChange={this.renderChange}/>
        </label>
        <br /><br />
        <label>
          Description:
          <textarea type="textfield" className="desc-box" rows="6" name="description" value={this.state.description} onChange={this.renderChange}/>
        </label>
        <br /><br />
        <label>
          Size:
          <select name="size" value={this.state.size} onChange={this.renderChange}>
            <option value= "Fine" >Fine</option>
            <option value= "Diminutive" >Diminutive</option>
            <option value= "Tiny" >Tiny</option>
            <option value= "Small" >Small</option>
            <option value= "Medium" >Medium</option>
            <option value= "Large" >Large</option>
            <option value= "Huge" >Huge</option>
            <option value= "Gargantuan" >Gargantuan</option>
            <option value= "Colossal" >Colossal</option>
          </select>
        </label>
        <br /><br />
        <label>
          Speed:
          <input type="number" name="speed" value={this.state.speed} onChange={this.renderChange}/>
        </label>
        < br />< br />
        {this.mapAbilityScoreDynamicFields()}
        <button onClick={(e) => this.addAbilityScoreModifierField(e, "plus")}>+</button>
        {this.state.abilityScoreModifiers.length > 1 ? <button onClick={(e) => this.addAbilityScoreModifierField(e, "minus")}>-</button> : null}
        < br />< br />
        <label>
          Image Link:
          <input type="text" name="img_url" value={this.state.img_url} onChange={this.renderChange}/>
        </label>
        <br /><br />
        <input type="submit" name="submit" />
      </form>
    )
  }

  mapAbilityScoreDynamicFields = () => {
    return this.state.abilityScoreModifiers.map((val, idx)=> {
      let abilityId = `ability-${idx}`, bonusId = `bonus-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={abilityId}>{`Ability Score Modifier #${idx + 1}`}</label>
            <select name={abilityId} data-id={idx} id={abilityId} value={this.state.abilityScoreModifiers[idx].ability_score} className="ability_score" onChange={this.renderDynamicChanges}>
              <option value= "" >Choose One</option>
              <option value= "Strength" >Strength</option>
              <option value= "Dexterity" >Dexterity</option>
              <option value= "Constitution" >Constitution</option>
              <option value= "Intelligence" >Intelligence</option>
              <option value= "Wisdom" >Wisdom</option>
              <option value= "Charisma" >Charisma</option>
              <option value= "Any" >Any</option>
            </select>
          <label htmlFor={bonusId}>Bonus</label>
          <input
            type="number"
            name={bonusId}
            data-id={idx}
            id={bonusId}
            value = {this.state.abilityScoreModifiers[idx].bonus}
            className="bonus"
            onChange={this.renderDynamicChanges}
          />
        </div>
      )
    })
  }

  addAbilityScoreModifierField = (e, change) => {
    e.preventDefault()
    if (change === "plus") {

      this.setState({abilityScoreModifiers: [...this.state.abilityScoreModifiers, {ability_score: "", bonus: 0}]})
    } else if (change === "minus") {
      this.state.abilityScoreModifiers.pop()
      this.setState({abilityScoreModifiers: this.state.abilityScoreModifiers})
    }
  }

  renderDynamicChanges = (e) => {
    if (["ability_score", "bonus"].includes(e.target.className)){
      let abilityScoreModifiers = [...this.state.abilityScoreModifiers]
      abilityScoreModifiers[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ abilityScoreModifiers })
    }
  }

  deleteRace = () => {
    this.setState({deleteRaceButton: !this.state.deleteRaceButton })
  }

  deleteRaceConfirm = (e, answer) => {
    e.preventDefault();
    if (answer === "yes") {
      fetch(`${localhost}/api/v1/races/${this.props.race.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          race_id: this.props.race.id
        })
      })
      .then(r => r.json())
      .then(data => {
        this.props.history.push('/races')
        this.setState({deleteRaceButton: false})
    })
    } else if (answer === "no"){
      this.setState({deleteRaceButton: false})
    }
  }

  render() {
    console.log("the state", this.state)
    console.log("the props", this.props.race)
    return (
      <span>
        {(this.props.toggleRaceForm || this.props.location.pathname === "/races-form") ? this.renderForm() : null}
        {this.props.race ? <button onClick={this.deleteRace}>Delete Race</button> : null}
        {this.state.deleteRaceButton ? <span><br/>Are you sure about that?<br/> <button onClick={(e) => this.deleteRaceConfirm(e, "no")}>No</button><button onClick={(e) => this.deleteRaceConfirm(e, "yes")}>Yes</button><br/><br/></span> : null}

      </span>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStateToProps)(NewRace)
