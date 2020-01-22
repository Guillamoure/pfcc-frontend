import React from 'react'

import Tab from '../components/character_show/tab'

class CampaignTabs extends React.Component {

  render(){

    return(
      <span className='tab-list'>
        <Tab label="Campaign" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Allies" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
      </span>
    )
  }
}

export default CampaignTabs
