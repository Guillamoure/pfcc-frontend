import React from 'react'

const HP = props => {

	const { layout, colorTheme } = useSelector(state => state.settings)

	const renderHP = () => {
		const { temp_hp, lethal_damage, non_lethal_damage } = props.character

	}

	return (
		<section id="character-details-hp" className="section-background">
			{renderHP()}
		</section>
	)
}

export default HP
