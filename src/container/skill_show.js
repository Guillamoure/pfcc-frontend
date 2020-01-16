import React from 'react'
import { connect } from 'react-redux'
import localhost from '../localhost'

import Introduction from '../components/skill_show/introduction'


class Skill extends React.Component {

  state ={
    skill : {},
  }

  renderURL = () => {
    let url = window.location.href
    let urlArray = url.split("/")
    return urlArray[urlArray.length - 1]
  }

  componentDidMount() {
    const skill = this.renderURL()
    fetch(`${localhost}/api/v1/skills/${skill}`)
    .then(r => r.json())
    .then(data => this.setState({skill: data.skill}))
  }

  // <Introduction skill={this.state.skill}/>
  // {this.props.admin ? <button onClick={this.toggleRaceForm}>{this.state.toggleRaceForm ? "Hide Edit Race" : "Edit Race"}</button> : null}
  // < br />
  // {this.state.toggleRaceForm ? <RaceForm toggleRaceForm={this.state.toggleRaceForm} skill={this.state.skill} renderRaceEdit={this.renderRaceEdit} history={this.props.history} /> : null }
  // <div className='header' style={{marginLeft: '2em'}}>Racial Traits</div>
  // <Traits skill={this.state.skill} renderRacialTrait={this.renderRacialTrait} />
  //
  // {this.props.admin ? <button onClick={this.changeAddTraitToggle}>{this.state.toggleTraitForm ? "Hide new Trait Form" : "Add a new Race Feature"}</button> : null}
  // < br />
  // < br />
  // <TraitForm toggleTraitForm={this.state.toggleTraitForm} renderSubmit={this.renderSubmit}/>

  render() {
    console.log(this.state.skill)
    return (
      <span className='roboto show'>
      <Introduction skill={this.state.skill}/>
      {this.props.admin ? <button onClick={this.toggleSkillForm}>{this.state.toggleSkillForm ? "Hide Edit Skill" : "Edit Skill"}</button> : null}
      </span>
    )
  }
}

const mapStatetoProps = (state) => {
return {
  currentUser: state.currentUser,
  admin: state.admin
}
}

export default connect(mapStatetoProps)(Skill)
