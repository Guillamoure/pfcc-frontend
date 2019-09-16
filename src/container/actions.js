import React from 'react'

import ActionTabs from './action_tabs'
import Spells from '../components/actions/spells'

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
        </div>
      </div>
    )
  }
}
// {this.state.activeTab === "Attacks" && <Features character={this.props.character} />}

export default Actions
