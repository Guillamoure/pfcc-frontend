import React from 'react'
import Portal from '../portal'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import NotificationTabs from '../container/notification_tabs'

import Creation from './notifications/creation'
import Notice from './notifications/notice'
import Update from './notifications/update'

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
            <div style={{height: '100%'}}>
              {this.state.activeTab === "Communique" && <Notice />}
              {this.state.activeTab === "Update Character" && <Update />}
              {this.state.activeTab === "Literally Unplayable" && <Creation  />}
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
