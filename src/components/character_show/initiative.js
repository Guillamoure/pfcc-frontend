import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const Initiative = props => {

  const dexMod = () => {
    let mod = Math.floor((props.character_info.ability_scores.dexterity - 10) / 2)
    return mod > 0 ? `+${mod}` : mod
  }

  return (
    <div id='init' className='shadow shrink'>
      <span className='centered'>
        <div className='dull'><strong>Init</strong></div>
        <div className='enhanced'>{dexMod()}</div>
      </span>
    </div>
  )
}
const mapStatetoProps = (state) => {
  return {
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Initiative)
