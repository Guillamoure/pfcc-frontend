import React from 'react'

import Tab from '../components/character_show/tab'

class DetailsTabs extends React.Component {

  render(){

    return(
      <span className='tab-list'>
        <Tab label="Details" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
        <Tab label="Notes" renderTabClick={this.props.renderTabClick} activeTab={this.props.activeTab}/>
      </span>
    )
  }
}

export default DetailsTabs
