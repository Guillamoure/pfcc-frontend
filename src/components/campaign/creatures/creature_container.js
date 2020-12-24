import React from 'react'

import CreatureSearch from './creature_search'
import CreatureStatBlock from '../../creature_stat_block'

const CreatureContainer = props => {

	const [selectedCreature, setSelectedCreature] = React.useState(null)

	const displayCreature = creature => {
		if (selectedCreature?.id === creature.id){setSelectedCreature(null)}
		else {setSelectedCreature(creature)}
	}

	return (
		<main id="campaign-show-creatures">
			<CreatureSearch displayCreature={displayCreature}/>
			{selectedCreature && <CreatureStatBlock creature={selectedCreature}/>}
		</main>
	)
}

export default CreatureContainer
