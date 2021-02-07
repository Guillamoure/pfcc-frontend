import React from 'react'
import { useSelector } from 'react-redux'
import { characterLevel } from '../../utils/calculations/character'
import { justInitials } from '../../utils/fuf'

const DetailsBrief = props => {

	const { layout, colorTheme } = useSelector(state => state.settings)

	const renderDetails = () => {
		const { name, alignment, deity, homeland, race, gender, age, height, weight, hair, eyes } = props.character

		return (
			<>
				<div className="character-details-details-brief-name fill-space">
					<p className="underline-input-field user-data">{name || ""}</p>
					<div className="underline-description">Character Name</div>
				</div>
				<div className="character-details-details-brief-alignment fill-space">
					<p className="underline-input-field user-data">{justInitials(alignment) || ""}</p>
					<div className="underline-description">Alignment</div>
				</div>
				<div className="character-details-details-brief-character-level fill-space">
					<p className="underline-input-field user-data">{characterLevel(props.character) || ""}</p>
					<div className="underline-description">Character Level</div>
				</div>
				<div className="character-details-details-brief-deity fill-space">
					<p className="underline-input-field user-data">{deity || ""}</p>
					<div className="underline-description">Diety</div>
				</div>
				<div className="character-details-details-brief-homeland fill-space">
					<p className="underline-input-field user-data">{homeland || ""}</p>
					<div className="underline-description">Homeland</div>
				</div>
				<div className="character-details-details-brief-race fill-space">
					<p className="underline-input-field user-data">{race.name || ""}</p>
					<div className="underline-description">Race</div>
				</div>
				<div className="character-details-details-brief-size fill-space">
					<p className="underline-input-field user-data">{justInitials(race.size) || ""}</p>
					<div className="underline-description">Size</div>
				</div>
				<div className="character-details-details-brief-gender fill-space">
					<p className="underline-input-field user-data">{gender || ""}</p>
					<div className="underline-description">Gender</div>
				</div>
				<div className="character-details-details-brief-age fill-space">
					<p className="underline-input-field user-data">{age || ""}</p>
					<div className="underline-description">Age</div>
				</div>
				<div className="character-details-details-brief-height fill-space">
					<p className="underline-input-field user-data">{height || ""}</p>
					<div className="underline-description">Height</div>
				</div>
				<div className="character-details-details-brief-weight fill-space">
					<p className="underline-input-field user-data">{weight || ""}</p>
					<div className="underline-description">Weight</div>
				</div>
				<div className="character-details-details-brief-hair fill-space">
					<p className="underline-input-field user-data">{hair || ""}</p>
					<div className="underline-description">Hair</div>
				</div>
				<div className="character-details-details-brief-eyes fill-space">
					<p className="underline-input-field user-data">{eyes || ""}</p>
					<div className="underline-description">Eyes</div>
				</div>
			</>
		)
	}

	return (
		<section id="character-details-details-brief" className="section-background">
			{renderDetails()}
		</section>
	)
}

export default DetailsBrief
