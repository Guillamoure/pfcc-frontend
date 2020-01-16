import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


const Campaigns = props => {

  const campaigns = () => {
    return props.currentUser.campaigns.map(camp => {
      console.log(camp)
      return (
        <div className='card' onClick={() => props.history.push(`/campaigns/${camp.id}`)} key={camp.id} >
          <span className='card-char'>
          <div style={{padding: '.5em', lineHeight: '1.2', fontSize: '1.5em'}}>{camp.name}</div>
          <div style={{padding: '.5em', lineHeight: '1.2'}}>{camp.name}</div>
          </span>
          <div className="fade"></div>
        </div>
      )
    })
  }

    return (
      <React.Fragment>
        {!!props.currentUser && campaigns()}
      </React.Fragment>
    )

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Campaigns))
