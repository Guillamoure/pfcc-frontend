import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Class extends React.Component{

  state = {
    classes: {}
  }


  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/klasses')
    .then(r => r.json())
    .then(data => {
      this.setState({classes: data})
    })
  }

  renderClasses = () => {
    return this.state.classes.map(klass => {
      return <option key={klass.id} value={klass.id}>{klass.name}</option>
    })
  }

  renderChosenClass = () => {
    let chosen = this.state.classes.find(el => el.id === _.toNumber(this.props.chosenClassId))
    return <Link to={`/classes/${chosen.name}`} >{chosen.name}< br /></Link>
  }



  render () {
    console.log(this.props.chosenClassId)
    return (
      <span>
      <p>Bild a Bear's Class</p>
      <label>
        Class Options:
        <select name="class" value={this.props.chosenClassId} onChange={(e) => this.props.renderChange(e)}>
          <option value= "" >Select One</option>
          {this.state.classes[0] ? this.renderClasses() : null}
        </select>
      </label>
      {this.state.classes[0] && this.props.chosenClassId ? this.renderChosenClass() : null}
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

export default withRouter(connect(mapStateToProps)(Class))
