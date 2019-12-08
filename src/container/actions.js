import React from 'react'

import ActionTabs from './action_tabs'
import Spells from '../components/actions/spells'
import Abilities from '../components/actions/abilities'

class Actions extends React.Component {
  state= {
    activeTab: "Attacks"
  }

  renderTabClick = (choice) => {
    this.setState({activeTab: choice})
  }

  render(){
    return(
      <div className="actions shadow">
        <ActionTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
        <div style={{height: '100%'}}>
        {this.state.activeTab === "Spells" && <Spells character={this.props.character}/>}
        {this.state.activeTab === "Abilities" && <Abilities/>}
        </div>
      </div>
    )
  }
}
// {this.state.activeTab === "Attacks" && <Features character={this.props.character} />}


/////////////////////////////
////// COLOR SCHEME /////////
/////////////////////////////

// Full-round Action: Purple
// Standard Action: Blue
// Swift Action: Yellow
// Move Action: Green
// Immediate Action: Red
// 10 minutes/1 hours/1 minute, etc.: brown? gold?

export default Actions
