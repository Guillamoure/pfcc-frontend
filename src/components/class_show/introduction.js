import React from 'react'
import _ from 'lodash'

class Introduction extends React.Component {

  render () {
    return (
      <div>
        <h3>{this.props.klass.name}</h3>
        <p>{this.props.klass.description}</p>
        <p><strong>Hit Die</strong>: d{this.props.klass.hit_die}</p>
        <p><strong>Skill Ranks per Level</strong>: {this.props.klass.skill_ranks} + Int modifier</p>
      </div>
    )
  }



}

export default Introduction
