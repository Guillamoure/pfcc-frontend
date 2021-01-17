import React from 'react'
import { useSelector } from 'react-redux'

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
		return (
			<form>
				<h4>Color Theme</h4>
				<ul style={{display: "flex", listStyleType: "none", margin: "0", padding: "0"}}>
					<li>
						<label className="noir-color">Noir</label>
					</li>
				</ul>
			</form>
		)
	}

	console.log(settings)
	return (
		<section>
			<h3>Character Settings</h3>
			{displayLayoutOptions()}
			{displayColorThemeOptions()}
		</section>
	)
}

export default Settings
