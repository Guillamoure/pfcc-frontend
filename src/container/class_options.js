import React from 'react'
import OptionShow from '../components/class_show/option_show'

const ClassOptions = props => {

	const renderOptions = () => {
		return props.options.map(opt => {
			return <OptionShow option={opt} />
		})
	}

	return (
		<ul id="chosen-class-options-container">
			{renderOptions()}
		</ul>
	)
}

export default ClassOptions
