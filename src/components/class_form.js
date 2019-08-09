import React from 'react'
// import { Redirect } from 'react-router-dom'

class NewClass extends React.Component {

  state = {
    name: "",
    description: "",
    hit_die: 0,
    skill_ranks: "",
    fortitude: "",
    reflex: "",
    will: "",
    img_url: "",
    deleteClassButton: false
  }

  componentDidMount() {
    if (this.props.klass){
      this.setState({
        name: this.props.klass.name,
        description: this.props.klass.description,
        hit_die: this.props.klass.hit_die,
        skill_ranks: this.props.klass.skill_ranks,
        fortitude: [this.props.klass.fortitude ? this.props.klass.fortitude.toString() : this.props.klass.fortitude],
        reflex: [this.props.klass.reflex ? this.props.klass.reflex.toString() : this.props.klass.reflex],
        will: [this.props.klass.will ? this.props.klass.will.toString() : this.props.klass.will],
        img_url: this.props.klass.img_url
      })
    }
  }

  renderSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/klasses', {
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
        this.props.history.push(`/classes/${data.klass.name}`)
        this.setState({name: "", description: "", hit_die: 0, skill_ranks: "", fortitude: "", reflex: "", will: "", img_url: ""})
      } else {
        console.log(data.error)
      }
    })
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderFormSubmit = (e) => {
    if (this.props.renderClassEdit){
        this.props.renderClassEdit(e, this.state)
    } else {
      this.renderSubmit(e)
    }
  }

  renderForm = () => {
    return (
      <form onSubmit={(e) => this.renderFormSubmit(e)} >
      <label>
      Class Name:
      <input type="text" name="name" value={this.state.name} onChange={this.renderChange}/>
      </label>
      <br />
      <br />
      <label>
      Description:
      <textarea type="textfield" className="desc-box" rows="6" name="description" value={this.state.description} onChange={this.renderChange}/>
      </label>
      <br />
      <br />
      <label>
      Hit Die:
      <select name="hit_die" value={this.state.hit_die} onChange={this.renderChange}>
      <option value= "" >Select One</option>
      <option value= "12" >d12</option>
      <option value= "10" >d10</option>
      <option value= "8" >d8</option>
      <option value= "6" >d6</option>
      </select>
      </label>
      <br />
      <br />
      <label>
      Skill Ranks:
      <input type="number" name="skill_ranks" value={this.state.skill_ranks} onChange={this.renderChange}/>
      </label>
      <br />
      <label>
      Saving Throws:
      <br />
      <label>
      Fortitude
      <select name="fortitude" value={this.state.fortitude} onChange={this.renderChange}>
      <option value= "" >Select One</option>
      <option value= "0.5" >Good</option>
      <option value= "0.34" >Poor</option>
      </select>
      </label>
      <label>
      Reflex
      <select name="reflex" value={this.state.reflex} onChange={this.renderChange}>
      <option value= "" >Select One</option>
      <option value= "0.5" >Good</option>
      <option value= "0.34" >Poor</option>
      </select>
      </label>
      <label>
      Will
      <select name="will" value={this.state.will} onChange={this.renderChange}>
      <option value= "" >Select One</option>
      <option value= "0.5" >Good</option>
      <option value= "0.34" >Poor</option>
      </select>
      </label>
      </label>
      < br />
      < br />
      <label>
      Image Link:
      <input type="text" name="img_url" value={this.state.img_url} onChange={this.renderChange}/>
      </label>
      <br />
      <br />
      <input type="submit" name="submit" />
      </form>
  )
  }

  deleteClass = () => {
    this.setState({deleteClassButton: !this.state.deleteClassButton })
  }

  deleteClassConfirm = (e, answer) => {
    e.preventDefault();
    if (answer === "yes") {
      fetch(`http://localhost:3000/api/v1/klasses/${this.props.klass.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          klass_id: this.props.klass.id
        })
      })
      .then(r => r.json())
      .then(data => {
        this.props.history.push('/classes')
        this.setState({deleteClassButton: false})
    })
    } else if (answer === "no"){
      this.setState({deleteClassButton: false})
    }
  }

  render() {
    return (
      <span>
        {(this.props.toggleClassForm || this.props.location.pathname === "/classes-form") ? this.renderForm() : null}
        {this.props.klass ? <button onClick={this.deleteClass}>Delete Class</button> : null}
        {this.state.deleteClassButton ? <span><br/>Are you sure about that?<br/> <button onClick={(e) => this.deleteClassConfirm(e, "no")}>No</button><button onClick={(e) => this.deleteClassConfirm(e, "yes")}>Yes</button><br/><br/></span> : null}

      </span>
    )
  }

}

export default NewClass
