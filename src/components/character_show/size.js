import React from 'react'
import { connect } from 'react-redux'

const Size = props => {

  const size = props.character_info.size
  let space = '5 ft'
  let reach = '5 ft'

  switch(size){
    case "Tiny":
      space = '2.5 ft'
      reach = '0 ft'
      break
    case "Small" || "Medium":
      space = '5 ft'
      reach = '5 ft'
      break
    case "Large":
      space = '10 ft'
      reach = '10 ft'
      break
    default:
      break;
  }

  return(
    <div id='size' className='shadow shrink character-show'>
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
    currentUser: state.currentUser,
    admin: state.admin,
    character_info: state.character_info,
    classes: state.classes
  }
}


export default connect(mapStateToProps)(Size)
