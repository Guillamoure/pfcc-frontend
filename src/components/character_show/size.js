import React from 'react'
import { connect } from 'react-redux'
import { sizeSpaceReach } from '../../utils/calculations/size'

const Size = props => {

	if (!Object.keys(props.character).length){
		return null
	}

  const size = props.character.race.size
	let data = sizeSpaceReach(size)
  let space = data[0]
  let reach = data[1]

  return(
    <div id='size' className='shadow shrink character-show' style={{boxShadow: `5px 4px 2px #${props.settings.shadeColor}`, opacity: "0.95", backgroundColor: `#${props.settings.bubbleColor}`, borderColor: `#${props.settings.borderColor}`}}>
      <span className='centered'>
        <div className='duller'><strong>Size: {size}</strong></div>
        <div className='container-2'>
          <span className='enhanced'>{space}</span>
          <span className='enhanced'>{reach}</span>
          <span>Space</span>
          <span>Reach</span>
        </div>
      </span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    character: state.character,
		settings: state.settings
  }
}

export default connect(mapStateToProps)(Size)
