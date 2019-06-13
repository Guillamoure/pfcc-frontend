import React from 'react'
import { Link } from 'react-router-dom'
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
    return this.state.classes.map(klass => <Link to={`/classes/${klass.name}`} key={klass.id} >{klass.name}< br /></Link>)
  }


  renderNewClass = () => {
    console.log("clicked")
  }

  // <button onClick={this.renderNewClass}>Create New Class</button>
  render() {
    return (
      <div className='background'>
        Dees the Classes:
        < br />
        {this.state.classes[0] ? this.renderClasses() : null}
        < br />
        < br />
        {this.props.admin ? <Link to='/classes-form' >Create a new Class!</Link> : null}
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


export default connect(mapStateToProps)(Classes)
