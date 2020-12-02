import React from 'react'

const ClassTile = props => {

	const [displayHoverButtons, toggleHoverButtons] = React.useState(false)

	const buttons = () => {
		return (
			<>
				<br/>
				<button onClick={() => props.renderClassChange(props.klass.id)}>+</button>
				<button>?</button>
			</>
		)
	}

	return (
		<div className="dynamic-card" style={{border: "4px solid transparent"}} onMouseEnter={() => toggleHoverButtons(true)} onMouseLeave={() => toggleHoverButtons(false)}>
			<img className='dynamic-card-img' alt={props.klass.name} src={props.klass.img_url}></img>
			<p className='dynamic-card-content-button'>
				{props.klass.name}
				{displayHoverButtons && buttons()}
			</p>
		</div>
	)
}
export default ClassTile
