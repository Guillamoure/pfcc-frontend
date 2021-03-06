import React from 'react'
import { connect } from 'react-redux'

import Features from '../components/character_show/features'
import FeaturesTraitsFeatsContainer from '../components/character_show/feature_traits'
import Traits from '../components/character_show/racial_traits'
import Feats from '../components/character_show/feats'
import Equipment from '../components/character_show/equipment'
import FeatureTabs from './feature_tabs'
import AlliesContainer from './allies_container'
import Details from '../components/character_show/details'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

class FeaturesTraits extends React.Component {

  state= {
    activeTab: "Features/Traits/Feats"
  }

  componentDidMount(){
    if (localStorage.computer === "false"){
      this.setState({activeTab: 'none'})
    }
  }

  renderTabClick = (choice) => {
    if (localStorage.computer === "false"){
      if (choice === this.state.activeTab){
        this.setState({activeTab: 'none'})
      } else {
        this.setState({activeTab: choice})
      }
    } else {
      this.setState({activeTab: choice})
    }
  }

  renderMobileTabClassNames = (tab) => {
    let className = ''
    if (tab === this.state.activeTab){
      className += 'mobile-feature-selected-tab'
    } else {
      className += 'mobile-feature-tab'
    }
    className = tab === 'Features' ? className + ' mobile-tab-top' : className
    className = tab === 'Equipment' && tab !== this.state.activeTab ? className + ' mobile-tab-bottom' : className
    className += ' shadow'
    return className
  }

	alliedCreaturesTab = () => {
		let makeTheTab = false
		if (this.props.character.character_creatures.length){
			makeTheTab = true
		}
		if (this.props.character_info.summonedAllies.length){
			makeTheTab = true
		}

		return makeTheTab
	}

  renderFeaturesTraits = () => {
    if (localStorage.computer === "true"){
      return (
        <div id='features-traits' className="character-show shadow" style={{boxShadow: `5px 4px 2px #${this.props.settings.shadeColor}`, opacity: "0.95", backgroundColor: `#${this.props.settings.bubbleColor}`, borderColor: `#${this.props.settings.borderColor}`}}>
          <FeatureTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab} alliedCreaturesTab={this.alliedCreaturesTab()}/>
          <div className="dynamic-size" style={{height: 'auto'}}>
            {this.state.activeTab === "Features/Traits/Feats" && <FeaturesTraitsFeatsContainer editModal={this.props.editModal}/>}
            {this.state.activeTab === "Equipment" && <Equipment editModal={this.props.editModal} exitModal={this.props.exitModal} cmiId={this.props.characterItemID}/>}
            {this.state.activeTab === "Details" && <Details />}
            {this.state.activeTab === "Allied Creatures" && <AlliesContainer />}
          </div>
        </div>
      )
    } else {
      return (
        <>
          <div className={this.renderMobileTabClassNames('Features')} onClick={() => this.renderTabClick('Features')}>Features {this.state.activeTab === 'Features' ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Features" && <Features editModal={this.props.editModal}/>}
          <div className={this.renderMobileTabClassNames('Traits')} onClick={() => this.renderTabClick('Traits')}>Traits {this.state.activeTab === 'Traits' ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Traits" && <Traits/>}
          <div className={this.renderMobileTabClassNames('Feats')} onClick={() => this.renderTabClick('Feats')}>Feats {this.state.activeTab === 'Feats' ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Feats" && <Feats editModal={this.props.editModal}/>}
          <div className={this.renderMobileTabClassNames('Equipment')} onClick={() => this.renderTabClick('Equipment')}>Equipment {this.state.activeTab === 'Equipment' ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Equipment" && <Equipment editModal={this.props.editModal} exitModal={this.props.exitModal} cmiId={this.props.characterItemID}/>}
        </>
      )
    }
  }

  render(){
    return (
      <>
        {this.renderFeaturesTraits()}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    character_info: state.character_info,
		settings: state.settings
	}
}

export default connect(mapStateToProps)(FeaturesTraits)
