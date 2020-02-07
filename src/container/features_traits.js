import React from 'react'

import Features from '../components/character_show/features'
import Traits from '../components/character_show/racial_traits'
import Feats from '../components/character_show/feats'
import Equipment from '../components/character_show/equipment'
import FeatureTabs from './feature_tabs'

class FeaturesTraits extends React.Component {
  state= {
    activeTab: "Features"
  }

  renderTabClick = (choice) => {
    this.setState({activeTab: choice})
  }

  render(){
    return(
      <div id='features-traits' className="character-show shadow">
        <FeatureTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
        <div style={{height: '100%'}}>
          {this.state.activeTab === "Features" && <Features character={this.props.character} editModal={this.props.editModal}/>}
          {this.state.activeTab === "Traits" && <Traits character={this.props.character}/>}
          {this.state.activeTab === "Feats" && <Feats editModal={this.props.editModal}/>}
          {this.state.activeTab === "Equipment" && <Equipment editModal={this.props.editModal} exitModal={this.props.exitModal} cmiId={this.props.characterItemID}/>}
        </div>
      </div>
    )
  }
}

export default FeaturesTraits
