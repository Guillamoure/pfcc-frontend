import React from 'react'

import Tab from '../components/character_show/tab'

class Tabs extends React.Component {

  render(){

    return(
      <span className='tab-list'>
        <Tab label="Features" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Traits" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
      </span>
    )
  }
}

export default Tabs
