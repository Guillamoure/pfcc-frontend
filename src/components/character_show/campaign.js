import React from 'react'
import { connect } from 'react-redux'
import { consolidateDate } from '../../fuf'

const CampaignShow = props => {

  const renderAllies = () => {
    let charFilter = props.character.campaign.characters.filter(c => c.id !== props.character.id)
    return charFilter.map(c => <li>{c.name}</li>)
  }

  return (
    <div>
      <p><strong>Date</strong>: {consolidateDate(props.character.campaign)}</p>
      <ul>
        {renderAllies()}
      </ul>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(CampaignShow)
