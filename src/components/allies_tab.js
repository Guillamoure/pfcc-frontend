import React from 'react'
import _ from 'lodash'

import Tab from './character_show/tab'

const AlliesTab = props => {

  const tabOptions = () => {
    if (props.allies){
      return props.allies.map((ally, i) => {
        return <Tab label={_.startCase(ally)} renderTabClick={props.renderTabClick} activeTab={props.activeAlly} allies={true} character={props.character} removeAlly={props.removeAlly} index={i}/>
      })
    }
  }

  return(
    <span className='tab-list'>
      {tabOptions()}
    </span>
  )
}

export default AlliesTab
