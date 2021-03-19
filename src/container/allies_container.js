import React from 'react'
import { useSelector } from 'react-redux'
import { modalAction } from '../utils/action_creator/popups'
import { replaceCharacterInfoAction } from '../utils/action_creator/character'
import _ from 'lodash'


const AlliesContainer = props => {

	let { character_creatures: characterCreatures } = useSelector(state => state.character)
	let summonedAllies = useSelector(state => state.character_info.summonedAllies)

	const renderFamiliars = () => {
		return characterCreatures.filter(cc => cc.relationship === "familiar").map(cc => {
			return <p><div className="underline-hover" onClick={() => modalAction("familiar", cc)}>{cc.creature.name}</div></p>
		})
	}

	const renderSummonedAllies = () => {
		return summonedAllies.map((sa, i) => {
			let name = `${_.capitalize(sa.template)} ${sa.creature.name}`
			return <p><div className="underline-hover" onClick={() => modalAction("statBlock", {...sa.creature, augmentSummoning: sa.augmentSummoning, template: sa.template}, {name})}>{name} </div> <button onClick={() => removeSummonedAlly(i)}>Dismiss</button></p>
		})
	}

	const removeSummonedAlly = idx => {
		let duplicateArr = [...summonedAllies]
		duplicateArr.splice(idx, 1)

		replaceCharacterInfoAction("summonedAllies", duplicateArr)
	}

	return (
		<section>
			{renderFamiliars()}
			{renderSummonedAllies()}
		</section>
	)
}

export default AlliesContainer
