import React from 'react'
import { useSelector } from 'react-redux'
import { updateColorThemeAction } from '../../utils/action_creator/settings'
import themes from '../../themes'

const Settings = () => {

	let settings = useSelector(state => state.settings)

	const displayLayoutOptions = () => {
		return (
			<form>
				<h4>Layout</h4>
				<div>
					<label>
						<input type="radio" name="layout" value="detailed" checked={settings.layout === "detailed"}/>
						Detailed
					</label>
				</div>
				<div>
					<label>
						<input type="radio" name="layout" value="brief" checked={settings.layout === "brief"}/>
						Brief
					</label>
				</div>
				<div>
					<label>
						<input type="radio" name="layout" value="stat block" checked={settings.layout === "stat block"}/>
						Stat Block
					</label>
				</div>
			</form>
		)
	}

	const displayColorThemeOptions = () => {

		const clickFunction = (th) => {
			localStorage.setItem("theme", th.name)
			updateColorThemeAction(th.colors)
		}

		let themeElements = themes.map(th => <li style={{color: `#${th.colors.textColor}`, backgroundImage: `linear-gradient(#${th.colors.background1} 30%, #${th.colors.background2} 50%, #${th.colors.bubbleColor})`, padding: "0.8%", border: `1px solid #${th.colors.borderColor}`, margin: "0.5%", borderRadius: "0.5em", boxShadow: `2px 1px 1px #${th.colors.shadeColor}`}}><label onClick={() => clickFunction(th)}>{th.name}</label></li>)

		return (
			<form>
				<h4>Color Theme</h4>
				<ul style={{display: "flex", listStyleType: "none", margin: "0", padding: "0", flexWrap: "wrap"}}>
					{themeElements}
				</ul>
			</form>
		)
	}

	console.log(settings)
	return (
		<section>
			<h3>Character Settings</h3>
			{displayColorThemeOptions()}
		</section>
	)
}

export default Settings
