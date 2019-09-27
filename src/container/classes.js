import React from 'react'
import { withRouter } from 'react-router-dom'
// import _ from 'lodash'
import { connect } from 'react-redux'

class Classes extends React.Component {

  state = {
    classes: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/klasses')
    .then(r => r.json())
    .then(data => {
      this.setState({classes: data})
    })
  }

  renderClasses = () => {
    const sortedClasses = this.state.classes.sort((a,b) => a.id - b.id)
    return sortedClasses.map(klass => {return (
      <div className='card' onClick={() => this.props.history.push(`/classes/${klass.name}`)} key={klass.id} >
        <div className='fill'></div>
        <span className='card-content'>
        {klass.name}
        </span>
        <div className="fade"></div>
        <img className='card-img' alt={klass.name} src={klass.img_url}>
        </img>
      </div>
    )})
  }


  // <button onClick={this.renderNewClass}>Create New Class</button>
  render() {
    return (
      <div>
        <div className='container-4'>
          {this.state.classes[0] ? this.renderClasses() : null}
          {this.props.admin ? <div className='card' onClick={() => this.props.history.push('/classes-form')}><span className='card-content'>Create a new Class!</span></div> : null}
        </div>
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


export default withRouter(connect(mapStateToProps)(Classes))
