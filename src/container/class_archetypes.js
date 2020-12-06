import React from 'react'
import ArchetypeShow from '../components/archetypes/archetype_show'

const ClassArchetypes = props => {

	const renderArchetypes = () => {
		if (!props.archetypes.length){ return null }
		return props.archetypes.map(arch => {
			return <ArchetypeShow archetype={arch} displayKlassArchetype={props.displayKlassArchetype} archetypeChange={props.archetypeChange}/>
		})
	}

	return (
		<ul id="chosen-class-archetype-container">
			{renderArchetypes()}
		</ul>
	)
}

export default ClassArchetypes
