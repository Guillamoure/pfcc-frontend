import React from 'react'
import { useSelector } from 'react-redux'
import { getFetch, postFetch, deleteFetch } from '../../helper_functions/fetches'
import { replaceCharacterAction } from '../../helper_functions/action_creator/character'
import { injectSpellIntoDescription } from '../../helper_functions/fuf'
import SpellDescription from '../spell_description'

const KlassSpecialization = props => {

	const { character } = useSelector(state => state)
	const [specializationOptions, setSpecializationOptions] = React.useState([])
	const [specificSpecializationId, setSpecificSpecializationId] = React.useState(0)
	const [knownKSpecs, setKnownKSpecs] = React.useState([])
	const [spell, setSpell] = React.useState({})
	const { klassFeature, klassName } = props.klassFeature

	React.useEffect(() => {
		console.log(props.klassFeature)
		getFetch(`klass_specializations?klass_id=${props.klassFeature.klassFeature.id}`)
			.then(setSpecializationOptions)
	}, [props.klassFeature])

	const renderOptions = () => {
		let kspecNodes = specializationOptions.map(kspec => {
			let name = kspec.name
			if (character.klass_specializations.find(ks => ks.id === kspec.id)){name = <strong>{name}</strong>}
			return (
				<tr>
					<td><button onClick={() => setSpecificSpecializationId(kspec.id)}>{name}</button></td>
				</tr>
			)
		})
		return (
			<table className="klass-specialization-options">
				<thead>
					<tr>
						<th>{klassFeature.name} Options</th>
					</tr>
				</thead>
				<tbody>
					{kspecNodes}
				</tbody>
			</table>
		)
	}

	const renderDetails = () => {
		if (!specificSpecializationId){return null}
		let kspec = specializationOptions.find(spec => spec.id === specificSpecializationId)
		let { name, description, klass_specialization_features: features } = kspec
		let featureNodes = features.map(f => {
			let spells = []
			f.features.forEach(feature => {
				feature.castable_spells.forEach(cs => {
					spells.push(cs.spell)
				})
			})
			let desc = f.description
			if (spells.length){desc = injectSpellIntoDescription(desc, spells, renderSpellClick, {})}
			return (
				<p><strong>{f.name}:</strong> {desc}</p>
			)
		})
		return (
			<aside className="klass-specialization-details">
				<h3>{name}</h3>
				<p><em>{description}</em></p>
				{featureNodes}
			</aside>
		)
	}

	const renderSpellClick = (incomingSpell) => {
		if (spell.id === incomingSpell.id){setSpell({})}
		else {setSpell(incomingSpell)}
	}

	const renderSpell = () => {
		if (!spell.id){return null}
		return (
			<aside className="klass-specialization-spell-description">
				<SpellDescription spell={spell} />
			</aside>
		)
	}

	const selectSpec = () => {
		let klassFeatureKSpec
		specializationOptions.forEach(kspec => {
			kspec.klass_feature_klass_specializations.forEach(kfks => {
				if (kfks.klass_feature_id === klassFeature.id && kfks.klass_specialization_id === specificSpecializationId){klassFeatureKSpec = kfks}
			})
		})
		postFetch('character_klass_specializations', {character_id: character.id, klass_feature_klass_specialization_id: klassFeatureKSpec.id})
			.then(data => {
				let replacementKSpecs = [...character.klass_specializations]
				replacementKSpecs.push(data)
				replaceCharacterAction('klass_specializations', replacementKSpecs)
				props.exitModal()
			})
	}

	const removeSpec = () => {
		let character_klass_specialization_id = character.klass_specializations.find(ckspec => ckspec.id === specificSpecializationId).character_klass_specialization_id
		deleteFetch(`character_klass_specializations/${character_klass_specialization_id}`)
			.then(data => {
				let replacementKSpecs = character.klass_specializations.filter(ckspec => ckspec.id !== specificSpecializationId)
				replaceCharacterAction('klass_specializations', replacementKSpecs)
				props.exitModal()
			})
	}

	const renderSpecializationSelection = () => {
		if (!specificSpecializationId){return null}
		let kspec = specializationOptions.find(spec => spec.id === specificSpecializationId)
		let specTitle = klassFeature.choice_amount > 1 ? `one of your ${klassFeature.name}` : `your ${klassFeature.name}`
		if (character.klass_specializations.find(ckspec => ckspec.id === specificSpecializationId)){
			return (
				<>
					<p><strong>{kspec.name}</strong> is already {specTitle}.</p>
					<button onClick={removeSpec}>Remove</button>
				</>
			)
		}
		return (
			<>
				<p>You are choosing <strong>{kspec.name}</strong> as {specTitle}.</p>
				<button onClick={selectSpec}>Select</button>
			</>
		)
	}

	return (
		<>
			<h2>{klassName} {klassFeature.name} - Please Select {klassFeature.choice_amount}</h2>
			<section id="klass-specialization-container">
				{renderOptions()}
				{renderDetails()}
				{renderSpell()}
			</section>
			{renderSpecializationSelection()}
		</>
	)
}

export default KlassSpecialization
