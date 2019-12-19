import React from 'react'
import Portal from '../portal'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import NotificationTabs from '../container/notification_tabs'

import Creation from './notifications/creation'
import Notice from './notifications/notice'
import Update from './notifications/update'
import Rest from './notifications/rest'

class Notifications extends React.Component{

  state= {
    activeTab: "Communique"
  }


  componentDidMount() {
  }

  renderTabClick = (choice) => {
    this.setState({activeTab: choice})
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <Portal>
        <div className="page-dimmer" onClick={this.props.clickOut}>
          <div className="edit-form" name="background">
            <p>Yo dude, it's your boi</p>
            <NotificationTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
            <div style={{height: '100%', overflow: 'auto'}}>
              {this.state.activeTab === "Communique" && <Notice exitModal={this.props.exitModal} changeActiveEffects={this.props.changeActiveEffects}/>}
              {this.state.activeTab === "Update Character" && <Update exitModal={this.props.exitModal}/>}
              {this.state.activeTab === "Literally Unplayable" && <Creation  exitModal={this.props.exitModal}/>}
              {this.state.activeTab === "Rest" && <Rest  exitModal={this.props.exitModal}/>}
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}


const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default withRouter(connect(mapStatetoProps)(Notifications))
