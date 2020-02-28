import React from 'react'
import { connect } from 'react-redux'

import ItemSearch from '../components/campaign/item_search'
import CharacterContainer from '../components/campaign/characters'
import SetDate from '../components/campaign/set_date'
import Ideas from '../components/campaign/ideas'


const CampaignShow = props => {
  const url = props.history.location.pathname
  const campaignId = parseInt(url.substring(url.lastIndexOf('/') + 1))
  const campaign = !!props.currentUser && props.currentUser.campaigns.find(c => c.id === campaignId)


  if (!props.currentUser){
    return null
  }
  return (
    <section>
      <CharacterContainer campaign={campaign}/>
      <ItemSearch />
      <SetDate campaign={campaign}/>
      <Ideas/>
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
