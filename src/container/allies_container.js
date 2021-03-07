import React from 'react'
import { useSelector } from 'react-redux'
import { modalAction } from '../utils/action_creator/popups'


const AlliesContainer = props => {

	let { character_creatures: characterCreatures } = useSelector(state => state.character)

	const renderFamiliars = () => {
		return characterCreatures.filter(cc => cc.relationship === "familiar").map(cc => {
			return <p><div className="underline-hover" onClick={() => modalAction("familiar", cc)}>{cc.creature.name}</div></p>
		})
	}

	return (
		<section>
			{renderFamiliars()}
		</section>
	)
}

export default AlliesContainer
