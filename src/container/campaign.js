import React from 'react'

import CampaignShow from '../components/character_show/campaign'
import Allies from '../components/character_show/allies'

import CampaignTabs from './campaign_tabs'

class Campaign extends React.Component {
  state= {
    activeTab: "Campaign"
  }

  renderTabClick = (choice) => {
    this.setState({activeTab: choice})
  }

  render(){
    return(
      <div id="campaign" className='shadow character-show'>
        <CampaignTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
        <div style={{height: '100%'}}>
          {this.state.activeTab === "Campaign" && <CampaignShow editModal={this.props.editModal}/>}
          {this.state.activeTab === "Allies" && <Allies character={this.props.character}/>}
        </div>
      </div>
    )
  }
}

export default Campaign
