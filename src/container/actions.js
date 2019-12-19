import React from 'react'

import ActionTabs from './action_tabs'
import Spells from '../components/actions/spells'
import Abilities from '../components/actions/abilities'
import Attacks from '../components/actions/attacks'
import Basics from '../components/actions/basics'
import Equipment from '../components/actions/equipment'

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
        {this.state.activeTab === "Attacks" && <Attacks editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
        {this.state.activeTab === "Basics" && <Basics/>}
        {this.state.activeTab === "Spells" && <Spells character={this.props.character} editModal={this.props.editModal} clickOut={this.props.clickOut}/>}
        {this.state.activeTab === "Abilities" && <Abilities editModal={this.props.editModal}/>}
        {this.state.activeTab === "Equipment" && <Equipment editModal={this.props.editModal}/>}
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
// Free Action: Silver

export default Actions
