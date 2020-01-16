import React from 'react'
import { connect } from 'react-redux'
import localhost from '../localhost'

class ClassSkillsForm extends React.Component {

  state = {
    skillsIds:[],
    skillsets: [],
    skills: {},
    method: "POST"
  }


  componentDidMount() {
    if (this.props.klass.skills[0]){
      let activeSkillsetClassSkills = this.props.klass.class_skillset_skills.filter(csss => csss.skillset_id === this.props.currentUser.skillset_id)
      const mappedSkillsIds = activeSkillsetClassSkills.map(scs => scs.skill_id)
      this.setState({skillsIds: mappedSkillsIds, method: "PATCH"})
    }
    this.fetchSkillsets()
    this.fetchSkills()
  }

  fetchSkillsets = () => {
    fetch(`${localhost}/api/v1/skillsets`)
    .then(r => r.json())
    .then(data => this.setState({skillsets: data}))
  }

  fetchSkills = () => {
    fetch(`${localhost}/api/v1/skills`)
    .then(r => r.json())
    .then(data => this.setState({skills: data}))
  }

  renderSkillChange = (id) => {
    if (this.state.skillsIds.includes(id)){
      const filtered = this.state.skillsIds.filter(skill => skill !== id)
      this.setState({skillsIds: filtered}, console.log("skillsIds removed", this.state.skillsIds))
    } else {
      this.setState({skillsIds: [...this.state.skillsIds, id]}, console.log("skillsIds added", this.state.skillsIds))
    }
  }

  selectedSkill = (id) => {
    return (this.state.skillsIds.includes(id)) ? true : false
  }

  renderActiveSkillset = () => {
    const activeSkillset = this.state.skillsets.find(ss => ss.id === this.props.currentUser.skillset_id)
    return <p>Current Skillset: {activeSkillset.name}</p>
  }


  renderSkillOptions = () => {
    return this.state.skills.map(skill => {
      return (<div>
      <label>
        <input type="checkbox" name={skill.name} checked={this.selectedSkill(skill.id)} onChange={() => this.renderSkillChange(skill.id)}/>
        {skill.name}
      </label>
      </div>
    )
    })
  }

  renderSkills = () => {

  }



  render () {
    return (
      <span>
        {!!this.state.skillsets[0] && this.renderActiveSkillset()}
        {!!this.state.skills.keys && this.renderSkillOptions()}
        <button onClick={(e) => this.props.renderClassSkills(e, this.state.skillsIds, this.state.method)}>{this.state.method === "POST" ? "Create Class Skills" : "Adjust Class Skills"}</button>
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

export default connect(mapStateToProps)(ClassSkillsForm)
