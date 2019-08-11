import React from 'react'

import Tab from '../components/character_show/tab'

class NotificationTabs extends React.Component {

  render(){

    return(
      <span className='tab-list'>
        <Tab label="Details" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Ability Scores" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Race" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Class" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Skills" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
      </span>
    )
  }
}

export default NotificationTabs
