import React from 'react'
import { useSelector } from 'react-redux'
import { getFetch, postFetch } from '../../helper_functions/fetches'

const KlassSpecialization = props => {

	const { character } = useSelector(state => state)
	const [specializationOptions, setSpecializationOptions] = React.useState([])
	const [specificSpecializationId, setSpecificSpecializationId] = React.useState(0)
	const [knownKSpecs, setKnownKSpecs] = React.useState([])
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
			<table style={{width: "30%", margin: "1%", overflowY: "scroll"}}>
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
			return (
				<p><strong>{f.name}:</strong> {f.description}</p>
			)
		})
		return (
			<aside style={{width: "68%", margin: "1%", overflowY: "scroll", textAlign: "left"}}>
				<h3>{name}</h3>
				<p><em>{description}</em></p>
				{featureNodes}
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
				debugger
				props.exitModal()
			})
	}

	const renderSpecializationSelection = () => {
		if (!specificSpecializationId){return null}
		let kspec = specializationOptions.find(spec => spec.id === specificSpecializationId)
		let specTitle = klassFeature.choice_amount > 1 ? `one of your ${klassFeature.name}` : `your ${klassFeature.name}`
		return (
			<>
				<p>You are choosing <strong>{kspec.name}</strong> as {specTitle}.</p>
				<button onClick={selectSpec}>Select</button>
			</>
		)
	}

	return (
		<>
			<section style={{display: "flex"}}>
				{renderOptions()}
				{renderDetails()}
			</section>
			{renderSpecializationSelection()}
		</>
	)
}

export default KlassSpecialization
