import React from 'react'

import Tab from '../components/character_show/tab'

class NotificationTabs extends React.Component {

  render(){

    return(
      <span className='tab-list'>
        <Tab label="Communique" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Update Character" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Literally Unplayable" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
      </span>
    )
  }
}

export default NotificationTabs
