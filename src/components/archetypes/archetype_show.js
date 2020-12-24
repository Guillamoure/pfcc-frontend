import React from 'react'
import ArchetypeFeature from './archetype_feature'

const ArchetypeShow = props => {

	const [ displayFeatures, toggleDisplayFeatures ] = React.useState(false)

	const { name, description, klass_archetype_features: features, id } = props.archetype

	const renderBanner = () => {
		if (!displayFeatures){
			return <h4><strong>{name}</strong></h4>
		} else {
			return (
				<div style={{display: "flex", justifyContent: "space-between"}}>
					<span>
						<h4><strong>{name}</strong></h4>
					</span>
					<span>
						<button onClick={() => props.archetypeChange(id)}>{props.chosen ? "Remove" : "Add"} Archetype</button>
						<button onClick={collapseContent}>Collapse</button>
					</span>
				</div>
			)
		}
	}

	const archetypeFeatures = () => {
		return features.map(feat => {
			return <ArchetypeFeature feature={feat} />
		})
	}

	const expandContent = () => {
		if (!displayFeatures){
			toggleDisplayFeatures(true)
			props.displayKlassArchetype(props.archetype)
		}
	}

	const collapseContent = () => {
		toggleDisplayFeatures(false)
		props.displayKlassArchetype(props.archetype)
	}

	return (
		<li className="chosen-class-archetype" onClick={expandContent}>
			{renderBanner()}
			<p>{description}</p>
			<ul>
				{displayFeatures && archetypeFeatures()}
			</ul>
		</li>
	)
}

export default ArchetypeShow
