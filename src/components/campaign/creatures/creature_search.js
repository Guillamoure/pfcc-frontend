import React from 'react'
import { getFetch } from '../../../helper_functions/fetches'

const CreatureSearch = props => {

	const [searchTerm, setSearchTerm] = React.useState("")
	const [creatures, setCreatures] = React.useState([])

	const renderSearchField = () => {
		return (
			<aside>
				<label forHTML="campaign-creature-search"><strong>Creature Search</strong></label>
				<br/>
				<input type="text" id="campaign-creature-search" name="campaign-creature-search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
				<button onClick={renderSubmit}>Search</button>
			</aside>
		)
	}

	const renderSubmit = () => {
		getFetch("creatures")
			.then(data => {
				setCreatures(data)
			})
	}

	const displayCreatures = () => {
		let creatureNodes = creatures.map(c => {
			let challengeRating = c.challenge_rating
			if (challengeRating < 1){challengeRating = `1/${1/challengeRating}`}
			return (
				<li onClick={() => props.displayCreature(c)}>
					CR {challengeRating} | <strong>{c.name}</strong> | {c.size} {c.creature_type.name}
				</li>
			)
		})
		return <ul>{creatureNodes}</ul>
	}

	return (
		<section>
			{renderSearchField()}
			{displayCreatures()}
		</section>
	)
}

export default CreatureSearch
