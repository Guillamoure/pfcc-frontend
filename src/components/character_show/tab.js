import React from 'react'
import { connect } from 'react-redux'

class Tab extends React.Component {

  renderCancel = () => {
    if (this.props.allies && (this.props.character === "Nettie")){
      return <button onClick={() => this.props.removeAlly(this.props.index)}>X</button>
    }
  }

  render(){

    let className = 'tab-list-item';

    if (this.props.activeTab === this.props.label) {
      className += ' tab-list-active';
    }

    return(
      <span className={className} style={{borderColor: `#${this.props.settings.borderColor}`}} onClick={() => this.props.renderTabClick(this.props.label, this.props.index)}>
        {this.props.label}
        {this.renderCancel()}
      </span>
    )
  }
}

const mapStateToProps = (state) => {
  return {
		settings: state.settings
  }
}

export default connect(mapStateToProps)(Tab)
