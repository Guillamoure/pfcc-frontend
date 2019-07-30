import React from 'react'
import { connect } from 'react-redux'


class Skillset extends React.Component {

  state = {
    skillsets: {},
    skills: {},
    chosenSkills: [],
    addSkillset: false,
    name: "",
    activeSkillset: 0
  }

  componentDidMount() {
    // (this.state.activeSkillset !== this.props.currentUser.skillset_id) && this.setState({activeSkillset: this.props.currentUser.skillset_id})
    fetch("http://localhost:3000/api/v1/skillsets")
    .then(r => r.json())
    .then(data => this.setState({skillsets: data}), this.fetchSkills())
  }

  renderSkillsetSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/skillsets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        chosen_skills: this.state.chosenSkills
      })
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        this.setState({name: "", skillsets: {}, skills: {}, chosenSkills: [], addSkillset: false})
      } else {
        console.log(data.error)
      }
    })
  }

  fetchSkills = () => {
    fetch("http://localhost:3000/api/v1/skills")
    .then(r => r.json())
    .then(data => this.setState({skills: data}))
  }

  renderAddSkillset = () => {
    this.setState({addSkillset: true})
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderSkillChange = (id) => {
    if (this.state.chosenSkills.includes(id)){
      const filtered = this.state.chosenSkills.filter(skill => skill !== id)
      this.setState({chosenSkills: filtered}, console.log("chosenSkills removed", this.state.chosenSkills))
    } else {
      this.setState({chosenSkills: [...this.state.chosenSkills, id]}, console.log("chosenSkills added", this.state.chosenSkills))
    }
  }

  selectedSkill = (id) => {
    return (this.state.chosenSkills.includes(id)) ? true : false
  }

  renderSkills = () => {
    return this.state.skills.map(skill => {
      return (<div>
      <label>
        {skill.name}:
        <input type="checkbox" name={skill.name} isSelected={() => this.selectedSkill(skill.id)} onChange={() => this.renderSkillChange(skill.id)}/>
      </label>
      </div>
    )
    })
  }

  skillsetForm = () => {
    return (
      <span>
      <label>
        Skillset Name:
        <input type="text" name="name" value={this.state.name} onChange={this.renderChange}/>
      </label>
        {this.renderSkills()}
        <button onClick={this.renderSkillsetSubmit}>Submit</button>
      </span>
    )
  }

  renderActiveSkillsetChange = (e) =>{
    const choice = e.target.value
    fetch('http://localhost:3000/api/v1/users/active_skillset', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.currentUser.id,
        active_skillset: choice
      })
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        console.log(data)
        this.setState({activeSkillset: data.user.active_skillset})
      } else {
        console.log(data.error)
      }
    })
  }

  renderActiveSkillset = () => {
    return (
      <div>
        <label>
          Active Skillset:
          <select name="activeSkillset" value={this.state.activeSkillset} onChange={this.renderActiveSkillsetChange}>
            <option value= "0" >Select Skillset</option>
            {this.state.skillsets.map(ss => <option value={ss.id}>{ss.name}</option>)}
          </select>
        </label>
      </div>
    )
  }

  render(){
    console.log("skillset data", this.state)
    return(
      <span>
        {(!this.state.addSkillset && this.props.admin) && <button onClick={this.renderAddSkillset}>+</button>}
        {this.state.addSkillset && this.skillsetForm()}
        {!!this.state.skillsets.keys && this.renderActiveSkillset()}
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

export default connect(mapStateToProps)(Skillset)
