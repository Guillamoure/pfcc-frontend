import React from 'react'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


class Skillset extends React.Component {

  state = {
    skillsets: {},
    skills: {},
    chosenSkills: [],
    addSkillset: false,
    name: "",
    activeSkillset: 0,
    editSkillset: false
  }

  componentDidMount() {
    (this.state.activeSkillset !== this.props.currentUser.skillset_id) && this.setState({activeSkillset: this.props.currentUser.skillset_id})
    fetch("http://localhost:3000/api/v1/skillsets")
    .then(r => r.json())
    .then(data => this.setState({skillsets: data}), this.fetchSkills())
  }

  componentDidUpdate() {
    (this.state.activeSkillset !== this.props.currentUser.skillset_id) && this.setState({activeSkillset: this.props.currentUser.skillset_id})
  }

  renderSkillsetSubmit = (e) => {
    e.preventDefault()
    if (!this.state.editSkillset){
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
          this.setState({name: "", chosenSkills: [], addSkillset: false})
        } else {
          console.log(data.error)
        }
      })
    } else {
      fetch(`http://localhost:3000/api/v1/skillsets/${this.state.activeSkillset}`, {
        method: 'PATCH',
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
          const updated_obj = []
          this.state.skillsets.forEach (skillset => {
            if (skillset.id !== data.skillset.id){
              updated_obj.push(skillset)
            } else {
              updated_obj.push(data.skillset)
            }
          })
          this.setState({name: "", chosenSkills: [], addSkillset: false, editSkillset: false, skillsets: updated_obj}, this.fetchSkillsets())
        } else {
          console.log(data.error)
        }
      })

    }
  }

  fetchSkills = () => {
    fetch("http://localhost:3000/api/v1/skills")
    .then(r => r.json())
    .then(data => this.setState({skills: data}))
  }

  fetchSkillsets = () => {
    fetch("http://localhost:3000/api/v1/skillsets")
    .then(r => r.json())
    .then(data => this.setState({skillsets: data}))
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
        <input type="checkbox" name={skill.name} key={skill.id} checked={this.selectedSkill(skill.id)} onChange={() => this.renderSkillChange(skill.id)}/>
      </label>
      </div>
    )
    })
  }

  renderEditSkillset = () => {
    const skillset = this.state.skillsets.find(el => el.id === this.state.activeSkillset)
    const skillIdArray = skillset.skillset_skills.map(sss => sss.skill_id)
    this.setState({addSkillset: true, chosenSkills: skillIdArray, name: skillset.name, editSkillset: true})
  }

  renderDelete = () => {
    fetch(`http://localhost:3000/api/v1/skillsets/${this.state.activeSkillset}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.activeSkillset      })
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        console.log(data)
        let updatedObj = this.state.skillsets.filter(ss => {
          return ss.id !== data
        })
        this.setState({name: "", chosenSkills: [], addSkillset: false, editSkillset: false, skillsets: updatedObj}, this.fetchSkillsets())
      } else {
        console.log(data.error)
      }
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
        <span>
          <button onClick={this.renderSkillsetSubmit}>{!this.state.editSkillset ? "Create" : "Edit"}</button>
        </span>
        <span>
          <button onClick={() => this.setState({addSkillset: false, chosenSkills: [], editSkillset: false})}>X</button>
          {(this.state.editSkillset && this.props.admin) && <span onClick={this.renderDelete}><FontAwesomeIcon icon={faTrashAlt} /></span>}
        </span>
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

        this.props.dispatch({type: 'SIGNIN', user: data.user, admin: data.user.admin })
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
            {this.state.skillsets.map(ss => <option value={ss.id} key={ss.id}>{ss.name}</option>)}
          </select>
        </label>
      </div>
    )
  }

  render(){
    // console.log("skillset data", this.state)
    return(
      <span>
        {(!this.state.addSkillset && this.props.admin) && <button onClick={this.renderAddSkillset}>+</button>}
        {this.state.addSkillset && this.skillsetForm()}
        <div style={{display: "inline-flex"}}>
          {(!!this.state.skillsets.keys && !this.state.addSkillset) && this.renderActiveSkillset()}
          {(!this.state.addSkillset && this.props.admin) && <span        onClick={this.renderEditSkillset}><FontAwesomeIcon icon={faPencilAlt} /></span>}
        </div>
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
