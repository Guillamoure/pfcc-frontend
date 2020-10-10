import React from 'react'

import CreatureSearch from './creature_search'
import CreatureStatBlock from '../../creature_stat_block'

const CreatureContainer = props => {

	const [selectedCreature, setSelectedCreature] = React.useState(null)

	const displayCreature = creature => {
		if (selectedCreature?.id === creature.id){setSelectedCreature(null)}
		else {
			console.log("creature changed")
			setSelectedCreature(creature)
		}
	}

	const displayStatBlock = () => {
		if (selectedCreature){
			console.log(selectedCreature)
			return <CreatureStatBlock creature={selectedCreature}/>
		}
	}

	return (
		<main id="campaign-show-creatures">
			<CreatureSearch displayCreature={displayCreature}/>
			{displayStatBlock()}
		</main>
	)
}

export default CreatureContainer
