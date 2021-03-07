import React from 'react'
import CreatureStatBlock from '../creature_stat_block'

const FamiliarDescription = props => {

	const { creature } = props.familiar

	return (
		<section>
			<CreatureStatBlock creature={creature} />
		</section>
	)
}

export default FamiliarDescription
