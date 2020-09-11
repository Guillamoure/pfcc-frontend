import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from '../localhost'

import Characters from '../components/characters'
import Settings from './settings'
import Campaigns from '../components/campaigns'


const Home = props => {

	const [characters, updateCharacters] = React.useState([])

	React.useEffect(() => {
		if (props.currentUser){

			fetch(`${localhost}/api/v1/characters`, {
				headers: {
					User: props.currentUser.id
				}
			})
			.then(r => r.json())
			.then(data => {
				updateCharacters(data)
			})
		}

	}, [props.currentUser])

  // COMMENTED OUT FOR TESTING PURPOSES
  const renderSignUp = () => {
  //   if (!props.currentUser){
  //     props.history.push("/signup")
  //   }
  }
  // COMMENTED OUT FOR TESTING PURPOSES


  renderSignUp()
  let className = localStorage.computer === 'true' ? 'container-4' : 'phone-container'


  return (
    <span className='background'>
      <button className='home-btn-create-links' onClick={() => props.history.push("/creation")} >Create Character</button>
      <button className='home-btn-create-links' onClick={() => props.history.push("/campaigns/new")}>Create Campaign</button>
      <br/><br/>
      <div className={className} style={{margin: '0 2em'}} >
        <Settings />
        <Campaigns />
        <Characters characters={characters}/>
      </div>
    </span>
  )

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStatetoProps)(Home))
