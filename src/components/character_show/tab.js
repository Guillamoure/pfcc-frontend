import React from 'react'

class Tab extends React.Component {
  render(){

    let className = 'tab-list-item';

    if (this.props.activeTab === this.props.label) {
      className += ' tab-list-active';
    }

    return(
      <span className={className} onClick={() => this.props.renderTabClick(this.props.label)}>
        {this.props.label}
      </span>
    )
  }
}

export default Tab
