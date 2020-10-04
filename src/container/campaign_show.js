import React from 'react'
import { connect } from 'react-redux'

import CampaignShowTabs from './campaign_show_tabs'

import ItemSearch from '../components/campaign/item_search'
import CharacterContainer from '../components/campaign/characters'
import SetDate from '../components/campaign/set_date'
import Ideas from '../components/campaign/ideas'
import CreatureContainer from '../components/campaign/creatures/creature_container'


const CampaignShow = props => {

	const [activeTab, setActiveTab] = React.useState("Characters")

  const url = props.history.location.pathname
  const campaignId = parseInt(url.substring(url.lastIndexOf('/') + 1))
  const campaign = !!props.currentUser && props.currentUser.campaigns.find(c => c.id === campaignId)

	const renderTab = () => {
		let content = null
		switch (activeTab){
			case "Characters":
				content = (
					<>
						<CharacterContainer campaign={campaign}/>
						<ItemSearch />
					</>
				)
				break
			case "Details":
				content = (
					<>
						<article>
							<span><p>Setting: {campaign.setting}</p></span>
							<span><p>Theme: {campaign.theme}</p></span>
							<span><p>notes: {campaign.custom_notes}</p></span>
						</article>
						<SetDate campaign={campaign}/>
						<Ideas/>
					</>
				)
				break
			case "Creatures":
				content = <CreatureContainer />
				break
			default:
				break
		}
		return (
			<section style={{margin: "1em"}}>
				<h1>{campaign.name}</h1>
				<CampaignShowTabs renderTabClick={setActiveTab} activeTab={activeTab} />
				{content}
			</section>
		)
	}


  if (!props.currentUser){
    return null
  }
  return (
    <>
			{renderTab()}
		</>
  )

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(CampaignShow)
