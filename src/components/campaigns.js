import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


const Campaigns = props => {

  const [show, setShow] = React.useState(false);

  const campaigns = () => {
    if (localStorage.computer === 'true'){
      return props.currentUser.campaigns.map(camp => {
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
    } else {
      if (props.currentUser.campaigns.length > 4){
        if (show){
          return (
            <>
              <div onClick={() => setShow(!show)}>Characters <FontAwesomeIcon icon={faCircle}/></div>
              {props.currentUser.campaigns.map(camp => <div className='mobile-character-button' onClick={() => props.history.push(`/campaigns/${camp.id}`)} key={camp.id * 3 - 1 }><strong>{camp.name}</strong></div>)}
            </>
          )
        } else {
          return <div onClick={() => setShow(!show)}>Characters <FontAwesomeIcon icon={faSortDown}/></div>
        }
      } else {
        return (
          <>
            {props.currentUser.campaigns.map(camp => <div className='mobile-character-button' onClick={() => props.history.push(`/campaigns/${camp.id}`)} key={camp.id * 3 - 1 }><strong>{camp.name}</strong></div>)}
          </>
        )
      }
    }
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
