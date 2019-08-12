import React from 'react'

import Features from '../components/character_show/features'
import Traits from '../components/character_show/racial_traits'
import Tabs from './tabs'

class FeaturesTraits extends React.Component {
  state= {
    activeTab: "Features"
  }

  renderTabClick = (choice) => {
    this.setState({activeTab: choice})
  }

  render(){
    return(
      <div className="features-traits">
        <Tabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
        <div style={{height: '100%'}}>
          {this.state.activeTab === "Features" && <Features character={this.props.character} />}
          {this.state.activeTab === "Traits" && <Traits character={this.props.character}/>}
        </div>
      </div>
    )
  }
}

export default FeaturesTraits
