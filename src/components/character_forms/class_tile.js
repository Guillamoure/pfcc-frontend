import React from 'react'

const ClassTile = props => {

	const [displayHoverButtons, toggleHoverButtons] = React.useState(false)

	const buttons = () => {
		return (
			<>
				<br/>
				<button onClick={() => props.renderClassChange(props.klass.id)}>+</button>
				<button onClick={() => props.displayChosenClass(props.klass.id)}>?</button>
			</>
		)
	}

	const areHoverButtonsDisplayed = () => {
		if (!displayHoverButtons){
			toggleHoverButtons(true)
		}
	}

	return (
		<div className="dynamic-card" style={{border: "4px solid transparent"}} onMouseEnter={() => toggleHoverButtons(true)} onMouseLeave={() => toggleHoverButtons(false)} onMouseOver={areHoverButtonsDisplayed}>
			<img className='dynamic-card-img' alt={props.klass.name} src={props.klass.img_url}></img>
			<p className='dynamic-card-content-button'>
				{props.klass.name}
				{displayHoverButtons && buttons()}
			</p>
		</div>
	)
}
export default ClassTile
