import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class Home extends React.Component {

  renderSignUp = () => {
    console.log(!!this.props.currentUser)
    if (!this.props.currentUser){
      this.props.history.push("/signup")
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className='background'>
        {this.renderSignUp()}
        Yo-Bwoi
      </div>
    )
  }

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Home))
