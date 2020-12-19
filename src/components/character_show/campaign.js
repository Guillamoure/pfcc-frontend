import React from 'react'
import { connect } from 'react-redux'
import { consolidateDate } from '../../fuf'

const CampaignShow = props => {

  const renderAllies = () => {
    // let charFilter = props.character.campaign?.characters.filter(c => c.id !== props.character.id) ?? []
    // return charFilter.map(c => <li>{c.name}</li>)
  }

	let date = () => {
		if (props.character.campaign) {
			return <p><strong>Date</strong>: {consolidateDate(props.character.campaign)}</p>
		} else {
			return null
		}
	}

  return (
    <div>
      {date()}
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
