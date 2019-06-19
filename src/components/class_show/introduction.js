import React from 'react'
import _ from 'lodash'

class Introduction extends React.Component {

  renderDescription = () => {
    if (this.props.klass.description){

      let desc = this.props.klass.description
      desc = desc.split("\n\n")
      return desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)
    }
  }

  render () {
    return (
      <div className='show'>
        <h2>{this.props.klass.name}</h2>
        {this.renderDescription()}
        <p><strong>Hit Die</strong>: d{this.props.klass.hit_die}</p>
        <p><strong>Skill Ranks per Level</strong>: {this.props.klass.skill_ranks} + Int modifier</p>
      </div>
    )
  }



}

export default Introduction
