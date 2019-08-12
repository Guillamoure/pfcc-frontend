import React from 'react'
import { connect } from 'react-redux'


class Skills extends React.Component {

  state = {
    skills: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/skills')
    .then(r => r.json())
    .then(data => {
      this.setState({skills: data})
    })
  }

  renderSkills = () => {
    const sortedSkills = this.state.skills.sort((a,b) => a.id - b.id)
    return sortedSkills.map(skill => {return (
      <div className='card' onClick={() => this.props.history.push(`/skills/${skill.name}`)} key={skill.id} >
        <div className='fill'></div>
        <span className='card-content'>
        {skill.name}
        </span>
        <div className="fade"></div>
        <img className='card-img' src={skill.img_url} alt={skill.name}>
        </img>
      </div>
    )})
  }


  // <button onClick={this.renderNewClass}>Create New Class</button>
  render() {
    return (
      <div className='container-4'>
        {this.state.skills[0] ? this.renderSkills() : null}
        {this.props.admin ? <div className='card' onClick={() => this.props.history.push('/skills-form')}><span className='card-content'>Create a New Skill!</span></div> : null}
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

  export default connect(mapStateToProps)(Skills)
