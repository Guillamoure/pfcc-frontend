import React from 'react'

class Skillset extends React.Component {

  state = {
    skillsets: {},
    skills: {},
    chosenSkills: [],
    addSkillset: false,
    name: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/skillsets")
    .then(r => r.json())
    .then(data => this.setState({skillsets: data}), this.fetchSkills())
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
      </div>)
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
        <button>Submit</button>
      </span>
    )
  }

  render(){
    console.log("skillset data", this.state)
    return(
      <span>
        {!this.state.addSkillset && <button onClick={this.renderAddSkillset}>+</button>}
        {this.state.addSkillset && this.skillsetForm()}
      </span>
    )
  }
}

export default Skillset
