import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Details extends React.Component{





  render () {
    return (
      <span>
      <label>
        Character Name:
        <input type="text" name="name" value={this.props.name} onChange={this.props.renderChange}/>
      </label>
      <br /><br />
      <label>
        Description:
        <textarea type="textfield" className="desc-box" rows="6" name="description" value={this.props.description} onChange={this.props.renderChange}/>
      </label>
      <br /><br />
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

export default withRouter(connect(mapStateToProps)(Details))
