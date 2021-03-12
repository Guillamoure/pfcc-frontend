import React from 'react'

import Tab from '../components/character_show/tab'

class FeatureTabs extends React.Component {

  render(){

    return(
      <span className='tab-list dynamic-size-small'>
        <Tab label="Features/Traits/Feats" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Equipment" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Details" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        {!!this.props.alliedCreaturesTab && <Tab label="Allied Creatures" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>}
      </span>
    )
  }
}

export default FeatureTabs
