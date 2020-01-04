import React from 'react'
import { connect } from 'react-redux'

import ItemSearch from '../components/campaign/item_search'


const CampaignShow = props => {
  const url = props.history.location.pathname
  const campaignId = parseInt(url.substring(url.lastIndexOf('/') + 1))
  const campaign = !!props.currentUser && props.currentUser.campaigns.find(c => c.id === campaignId)

  const renderCharacters = () => {
    // console.log(props.currentUser)
    return campaign.characters.map((ch, idx) => {
      return <span key={ch.id*idx*3-1}><strong className='underline-hover'>{ch.name}</strong></span>
    })
  }

  if (!props.currentUser){
    return null
  }
  return (
    <section>
      <div>{renderCharacters()}</div>
      <ItemSearch />
    </section>
  )

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(CampaignShow)
