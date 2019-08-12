import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Class extends React.Component{

  state = {
    classes: false,
    activeSkillset: 0,
    skillsets: {}
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

  mapClassDynamicFields = () => {
    return this.props.classes.map((val, idx)=> {
      let classId = `class-${idx}`, level = `level-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={classId}>{`Class #${idx + 1}`} </label>
            <select
              name={classId}
              value={this.props.classes[idx]}
              onChange={(e) => this.props.renderDynamicChanges(e, idx)}
            >
              <option value= "" >Choose One</option>
              {this.state.classes && this.renderClasses()}
            </select>
            {`Level ${idx + 1}`}
        </div>
      )
    })
  }

  checkForValidLevels = () => {
    let valid = true
    this.props.classes.forEach(klass => {
      if (klass.level > 20 || klass.level < 1){
        valid = false
      }
    })
    if (!valid) {
      return <div>You must choose a class level between 1 and 20!</div>
    }
  }


  // <label>
  //   Class Options:
  //   <select name="class" value={this.props.chosenClassId} onChange={(e) => this.props.renderChange(e)}>
  //     <option value= "" >Select One</option>
  //     {this.state.classes[0] ? this.renderClasses() : null}
  //   </select>
  // </label>


  render () {
    return (
      <div>

      <span>Class Options </span>
      <button onClick={(e) => this.props.addClassField(e, "plus", this.props.classes.length-1)}>{`Level ${this.props.classes.length + 1}`}</button>
      {this.props.classes.length > 1 ? <button onClick={(e) => this.props.addClassField(e, "minus")}>Delevel</button> : null}
      {this.mapClassDynamicFields()}
      {this.checkForValidLevels()}
      {this.state.classes[0] && this.props.chosenClassId ? this.renderChosenClass() : null}
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

export default withRouter(connect(mapStateToProps)(Class))
