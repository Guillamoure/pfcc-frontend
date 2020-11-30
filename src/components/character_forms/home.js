import React from 'react'

const CharacterHome = props => {

	const renderName = () => {
		return (
			<section id="new-character-home-name" className="standard-container-bubble">
				<label htmlFor="new-character-name" className="new-character-label"><strong>Character Name</strong></label>:
				<input className="new-character-text-input" type="text"id="new-character-name" name="name" value={props.name} onChange={props.renderChange} autocomplete="off"/>
			</section>
		)
	}

	const renderCampaignCode = () => {
		return (
			<section id="new-character-home-campaign" className="standard-container-bubble">
				<label htmlFor="new-character-campaign" className="new-character-label"><strong>Campaign Code</strong></label>:
				<input className="new-character-text-input" type="number"id="new-character-campaign" name="campaign_id" value={props.campaign_id} onChange={props.renderChange} autocomplete="off"/>
				{props.campaignDetails && <span>{props.campaignDetails.name}</span>}
			</section>
		)
	}

	const renderSelectedCampaign = () => {
		const { name, setting, theme, notes } = props.campaignDetails
		return (
			<section id="character-creation-home-campaign-details" className="standard-container-bubble">
				<h4>{name}</h4>
				<p><strong>Theme:</strong> {theme}</p>
				<p><strong>Setting:</strong> {setting}</p>
				<p><strong>Notes:</strong> {notes}</p>
			</section>
		)
	}

	return (
		<main id="character-creation-home">
			{renderName()}
			{renderCampaignCode()}
			{props.campaignDetails?.id && renderSelectedCampaign()}
		</main>
	)
}

export default CharacterHome
