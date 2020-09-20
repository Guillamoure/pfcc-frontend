import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { getFetch } from '../../helper_functions/fetches'

const SpontaneousCasting = props => {

	const { character } = useSelector(state => state)
	const [spells, setSpells] = React.useState([])
	const [chosenStatus, updateChosenStatus] = React.useState(true)

	React.useEffect(() => {
		if (chosenStatus){
			if (props.feature.spontaneous_castings[0].player_choice){

				let characterChoice = character.character_choices.find(ccc => ccc.feature_id === props.feature.id)
				let options = _.uniqBy(props.feature.spontaneous_castings, 'keyword').map(sc => sc.keyword)

				if (!characterChoice || !options.includes(characterChoice.choice)){
					updateChosenStatus(false)
					return
				}
			}
			props.feature.spontaneous_castings.forEach(sp => {
				debugger
			})

		}

	}, [props.feature, chosenStatus])

	return (
		<>
			{!chosenStatus && <h3>You have not chosen a category of Spontaneous Casting. Please go to the menu and choose, and try again.</h3>}
		</>
	)
}

export default SpontaneousCasting
