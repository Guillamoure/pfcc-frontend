import React from 'react'
import { connect } from 'react-redux'

const Tooltip = props => {

  const tooltipEl = React.useRef(null)
  const [elementWidth, setWidth] = React.useState(200)

  React.useEffect(() => {
    setWidth(tooltipEl.current.offsetWidth)
  }, [])

  const howFarElementIsFromTop = window.pageYOffset + props.tooltip.target.getBoundingClientRect().top
  const heightOfElement = props.tooltip.target.offsetHeight
  const howFarElementIsFromLeft = window.pageXOffset + props.tooltip.target.getBoundingClientRect().left
  const widthOfElement = props.tooltip.target.offsetWidth

  const style = {
    left: (howFarElementIsFromLeft + (widthOfElement/2)-(elementWidth/2) + 'px'),
    top: (howFarElementIsFromTop + heightOfElement + 17 + 'px'),
    position: 'absolute',
    zIndex: 1
  }

  return (
    <section ref={tooltipEl} id='tooltip' className='on top' style={style}>
      <div className='tooltip-arrow'></div><div className='tooltip-inner' style={{maxWidth: elementWidth+'px'}}>{props.tooltip.message}</div>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    tooltip: state.tooltip
  }
}

export default connect(mapStatetoProps)(Tooltip);
