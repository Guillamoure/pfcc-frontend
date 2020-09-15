import React from 'react'
import { connect } from 'react-redux'

import CharacterShow from './character'

const CharacterContainer = props => {

  const renderCharacters = () => {
    console.log(props)
    return props.campaign.characters?.map((ch, idx) => {
        return <CharacterShow character={ch}/>
    })
  }

  return (
    <div className='flex'>
      {renderCharacters()}
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(CharacterContainer)
