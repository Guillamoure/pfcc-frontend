import React from 'react'
import { connect } from 'react-redux'


class NewSkill extends React.Component {

  state = {
    name: "",
    abilityScore: "",
    description: "",
    untrained: false
  }

  renderSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/skills', {
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
        this.props.history.push(`/skills/${data.skill.name}`)
        this.setState({name: "", description: "", abilityScore: "", untrained: false})
      } else {
        console.log(data.error)
      }
    })
  }

  renderChange = (e) => {
    if (e.target.name === 'untrained'){
      this.setState({untrained: !this.state.untrained})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  renderFormSubmit = (e) => {
    if (this.props.renderSkillEdit){
        this.props.renderSkillEdit(e, this.state)
    } else {
      this.renderSubmit(e)
    }
  }

  renderForm = () => {
    return (
      <form onSubmit={(e) => this.renderFormSubmit(e)} >
        <label>
          Skill Name:
          <input type="text" name="name" value={this.state.name} onChange={this.renderChange}/>
        </label>
        <br /><br />
        <label>
          Description:
          <textarea type="textfield" className="desc-box" rows="6" name="description" value={this.state.description} onChange={this.renderChange}/>
        </label>
        <br /><br />
        <label>
          Ability Score:
          <select name="abilityScore" value={this.state.abilityScore} onChange={this.renderChange}>
            <option value= "" >Choose One</option>
            <option value= "Strength" >Strength</option>
            <option value= "Dexterity" >Dexterity</option>
            <option value= "Constitution" >Constitution</option>
            <option value= "Intelligence" >Intelligence</option>
            <option value= "Wisdom" >Wisdom</option>
            <option value= "Charisma" >Charisma</option>
          </select>
        </label>
        <br /><br />
        <label>
          Can a Character use this skill Untrained?:
          <input type="checkbox" name="untrained" isSelected={this.state.untrained} onChange={this.renderChange}/>
        </label>
        < br />< br />
        <input type="submit" name="submit" />
      </form>
    )
  }

  deleteSkill = () => {
    this.setState({deleteSkillButton: !this.state.deleteSkillButton })
  }

  deleteSkillConfirm = (e, answer) => {
    e.preventDefault();
    if (answer === "yes") {
      fetch(`http://localhost:3000/api/v1/skills/${this.props.skill.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          skill_id: this.props.skill.id
        })
      })
      .then(r => r.json())
      .then(data => {
        this.props.history.push('/skills')
        this.setState({deleteSkillButton: false})
    })
    } else if (answer === "no"){
      this.setState({deleteSkillButton: false})
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
      {(this.props.toggleSkillForm || this.props.location.pathname === "/skills-form") ? this.renderForm() : null}
      {this.props.skill ? <button onClick={this.deleteSkill}>Delete Skill</button> : null}
      {this.state.deleteSkillButton ? <span><br/>Are you sure about that?<br/> <button onClick={(e) => this.deleteSkillConfirm(e, "no")}>No</button><button onClick={(e) => this.deleteSkillConfirm(e, "yes")}>Yes</button><br/><br/></span> : null}
      </div>
    )
  }
}


  const mapStateToProps = (state) => {
    return {
      currentUser: state.currentUser,
      admin: state.admin
    }
  }

  export default connect(mapStateToProps)(NewSkill)
