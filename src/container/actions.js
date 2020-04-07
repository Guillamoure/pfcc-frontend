import React from 'react'

import ActionTabs from './action_tabs'
import Spells from '../components/actions/spells'
import Abilities from '../components/actions/abilities'
import Attacks from '../components/actions/attacks'
import Basics from '../components/actions/basics'
import Equipment from '../components/actions/equipment'
import Misc from '../components/actions/misc'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

class Actions extends React.Component {
  state= {
    activeTab: "Attacks"
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
    className = tab === 'Attacks' ? className + ' mobile-tab-top' : className
    className = tab === 'Equipment' && tab !== this.state.activeTab ? className + ' mobile-tab-bottom' : className
    className += ' shadow'
    return className
  }

  render(){
    if (localStorage.computer === "true"){
      return(
        <div className="actions shadow">
          <ActionTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
          <div style={{height: '100%'}}>
          {this.state.activeTab === "Attacks" && <Attacks editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
          {this.state.activeTab === "Basics" && <Basics renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
          {this.state.activeTab === "Spells" && <Spells character={this.props.character} editModal={this.props.editModal} clickOut={this.props.clickOut}/>}
          {this.state.activeTab === "Abilities" && <Abilities editModal={this.props.editModal}/>}
          {this.state.activeTab === "Equipment" && <Equipment editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
          {this.state.activeTab === "Misc" && <Misc editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
          </div>
        </div>
      )
    } else if (localStorage.computer === "false"){
      return (
        <>
          <div className={this.renderMobileTabClassNames("Attacks")} onClick={() => this.renderTabClick("Attacks")}>Attacks {this.state.activeTab === "Attacks" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Attacks" && <Attacks editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut} editSidebar={this.props.editSidebar}/>}
          <div className={this.renderMobileTabClassNames("Basics")} onClick={() => this.renderTabClick("Basics")}>Basics {this.state.activeTab === "Basics" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Basics" && <Basics renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
          <div className={this.renderMobileTabClassNames("Spells")} onClick={() => this.renderTabClick("Spells")}>Spells {this.state.activeTab === "Spells" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Spells" && <Spells editModal={this.props.editModal} clickOut={this.props.clickOut}/>}
          <div className={this.renderMobileTabClassNames("Abilities")} onClick={() => this.renderTabClick("Abilities")}>Abilities {this.state.activeTab === "Abilities" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Abilities" && <Abilities editModal={this.props.editModal}/>}
          <div className={this.renderMobileTabClassNames("Equipment")} onClick={() => this.renderTabClick("Equipment")}>Equipment {this.state.activeTab === "Equipment" ? <FontAwesomeIcon icon={faCircle}/> : <FontAwesomeIcon icon={faSortDown}/>}</div>
          {this.state.activeTab === "Equipment" && <Equipment editModal={this.props.editModal} renderTooltip={this.props.renderTooltip} mouseOut={this.props.mouseOut}/>}
        </>
      )
    }

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
