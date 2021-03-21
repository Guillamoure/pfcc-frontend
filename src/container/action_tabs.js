import React from 'react'

import Tab from '../components/character_show/tab'

class ActionTabs extends React.Component {

  render(){

    return(
      <span className='tab-list dynamic-size-small'>
        <Tab label="Attacks" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Tactics" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Combat Maneuvers" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Spells" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Abilities" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
      </span>
    )
  }
}

export default ActionTabs
