import React from 'react'
import Portal from '../portal'
import _ from 'lodash'
import localhost from '../localhost'

class CharacterForm extends React.Component{

  state = {
    name: "",
    race: 0,
    classes: [0],
    anyBonus: "",
    doesRacehaveAnyBonus: false,
    allClasses: false,
    allRaces: {},
    id: ""
  }

  componentDidMount() {
    this.setState({
      name: this.props.character.name,
      race: this.props.character.race.id,
      anyBonus: this.props.character.any_bonus,
      id: this.props.character.id,
      classes: this.renderDefaultClasses()
    }, this.fetchClasses())
  }

  fetchClasses = () => {
    fetch(`${localhost}/api/v1/klasses`)
    .then(r => r.json())
    .then(data => {
      this.setState({allClasses: data})
    }, this.fetchRaces())
  }

  fetchRaces = () => {
    fetch(`${localhost}/api/v1/races`)
    .then(r => r.json())
    .then(data => {
      this.setState({allRaces: data})
    })
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderDefaultClasses = () => {
    const sortedClasses = this.props.character.character_klasses.sort((a,b) => a.level - b.level)
    const klasses = sortedClasses.map(klass => {
      return klass.klass_id
    })
    return klasses
  }

  renderDynamicChanges = (e, index) => {
    let classes = [...this.state.classes]
    classes[index] = e.target.value
    this.setState({ classes })
  }

  renderClasses = () => {
    return this.state.allClasses.map(klass => {
      return <option key={klass.id} value={klass.id}>{klass.name}</option>
    })
  }

  renderRaces = () => {
    return this.state.allRaces.map(race => {
      return <option key={race.id} value={race.id}>{race.name}</option>
    })
  }

  renderRacialAbilityModifiers = () => {
    let chosen = this.state.allRaces.find(el => el.id === _.toNumber(this.state.race))
    return <span>{this.renderAbilityScoreModifiers(chosen)}</span>
  }

  renderAbilityScoreModifiers = (chosen) => {
    let mods = chosen.race_ability_score_modifiers
    let modStrings = []
    mods.forEach(mod => {
      if (mod.ability_score === 'Any' && !this.state.doesRacehaveAnyBonus) {
        this.setState({doesRacehaveAnyBonus: true})
      }
      if (mod.ability_score !== 'Any' && this.state.doesRacehaveAnyBonus) {
        this.setState({doesRacehaveAnyBonus: false, anyBonus: ""})
      }
      let bonus = mod.bonus < 0 ? mod.bonus : `+${mod.bonus}`
      modStrings.push(`${bonus} ${mod.ability_score}`)
    })
    return modStrings.join(", ")
  }

  renderAnyChoiceField = () => {
    return (
      <div>
        <label>For your Race, you can choose any one score to give a +2 bonus to any one Ability of your Choice!</label>
        <select value={this.state.anyBonus} onChange={this.renderChange} name='anyBonus'>
          <option value= "" >Choose One</option>
          <option value= "Strength" >Strength</option>
          <option value= "Dexterity" >Dexterity</option>
          <option value= "Constitution" >Constitution</option>
          <option value= "Intelligence" >Intelligence</option>
          <option value= "Wisdom" >Wisdom</option>
          <option value= "Charisma" >Charisma</option>
        </select>
      </div>
    )
  }

  addClassField = (e, change, index) => {
    e.preventDefault()
    if (change === "plus") {

      this.setState( { classes: [...this.state.classes, this.state.classes[index]] } )
    } else if (change === "minus") {
      let removedClasses = [...this.state.classes]
      removedClasses.pop()
      this.setState({classes: removedClasses})
    }
  }

  checkForValidLevels = () => {
    let valid = true
    this.state.classes.forEach(klass => {
      if (klass.level > 20 || klass.level < 1){
        valid = false
      }
    })
    if (!valid) {
      return <div>You must choose a class level between 1 and 20!</div>
    }
  }

    mapClassDynamicFields = () => {
      return this.state.classes.map((val, idx)=> {
        let classId = `class-${idx}`
        return (
          <div key={idx}>
            <label htmlFor={classId}>{`Class #${idx + 1}`} </label>
              <select
                name={classId}
                value={this.state.classes[idx]}
                onChange={(e) => this.renderDynamicChanges(e, idx)}
              >
                <option value= "" >Choose One</option>
                {this.state.allClasses && this.renderClasses()}
              </select>
              {`Level ${idx + 1}`}
          </div>
        )
      })
    }



  render() {
    return (
      <Portal>
        <div className="page-dimmer" onClick={this.props.clickOut}>
          <div className="edit-form" name="background">
            <span className="enhanced" >Character</span>
            <br /><br />
            <label>Name</label>
            <br />
            <input type="text" name="name" value={this.state.name} onChange={this.renderChange}/>
            <br />
            <label>Race</label>
            <br />
            <select name="race" value={this.state.race} onChange={this.renderChange}>
              <option value= "" >Select One</option>
              {this.state.allRaces[0] ? this.renderRaces() : null}
            </select>
            <br />
            {this.state.allRaces[0] && this.state.race ? this.renderRacialAbilityModifiers() : null}
            <br />
            {this.state.doesRacehaveAnyBonus ? this.renderAnyChoiceField() : null}
            <br />
            <label>Classes</label>
            <br />
            {this.state.allClasses && this.mapClassDynamicFields()}
            <button onClick={(e) => this.addClassField(e, "plus", this.state.classes.length-1)}>+</button>
            {this.state.classes.length > 1 ? <button onClick={(e) => this.addClassField(e, "minus")}>-</button> : null}
            {this.checkForValidLevels()}
            <br /><br />
            <button onClick={() => this.props.renderEdit(this.state, 'character')}>Submit</button>
          </div>
        </div>
      </Portal>
    );
  }
}


export default CharacterForm
