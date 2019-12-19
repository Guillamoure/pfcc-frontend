import React from 'react'
import { connect } from 'react-redux'

const Tooltip = props => {

  const style = {
    left: ((props.x + window.scrollX + 15) + 'px'),
    top: ((props.y + window.scrollY - 5) + 'px'),
    position: 'absolute',
    pointerEvents: 'none'
  }

  return (
    <section id='tooltip' className='on top' style={style}>
      <div className='tooltip-arrow'></div><div className='tooltip-inner'>{props.comment}</div>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Tooltip)
