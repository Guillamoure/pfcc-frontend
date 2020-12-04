import React from 'react'
import ArchetypeShow from '../components/archetypes/archetype_show'

const ClassArchetypes = props => {

	const renderArchetypes = () => {
		if (!props.archetypes.length){ return null }
		return props.archetypes.map(arch => {
			return <ArchetypeShow archetype={arch}/>
		})
	}

	return (
		<aside>
			{renderArchetypes()}
		</aside>
	)
}

export default ClassArchetypes
