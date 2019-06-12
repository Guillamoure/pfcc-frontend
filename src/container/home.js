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
        {`Welcome ${this.props.currentUser.username}`}
        <br/>
        <br/>
        <button onClick={() => this.props.history.push("/creation")}>Create Character</button>
        <br/>
        <br/>
        {/*<button>View Your Characters</button>*/}
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
