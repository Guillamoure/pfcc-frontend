import React from 'react'

import CreatureSearch from './creature_search'
import CreatureDetails from '../../creature_details'

const CreatureContainer = props => {

	const [selectedCreature, setSelectedCreature] = React.useState(null)

	const displayCreature = creature => {
		if (selectedCreature?.id === creature.id){setSelectedCreature(null)}
		else {setSelectedCreature(creature)}
	}

	return (
		<main id="campaign-show-creatures">
			<CreatureSearch displayCreature={displayCreature}/>
			{selectedCreature && <CreatureDetails creature={selectedCreature}/>}
		</main>
	)
}

export default CreatureContainer
