import React from 'react'
import ArchetypeShow from '../components/archetypes/archetype_show'

const ClassArchetypes = props => {

	const renderArchetypes = () => {
		if (!props.archetypes.length){ return null }
		return props.archetypes.map(arch => {
			let chosen = props.chosenArchetypeIds.includes(arch.id)
			return <ArchetypeShow archetype={arch} displayKlassArchetype={props.displayKlassArchetype} archetypeChange={props.archetypeChange} chosen={chosen}/>
		})
	}

	return (
		<ul id="chosen-class-archetype-container">
			{renderArchetypes()}
		</ul>
	)
}

export default ClassArchetypes
