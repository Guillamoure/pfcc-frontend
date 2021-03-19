import React from 'react'
import { useSelector } from 'react-redux'
import { modalAction } from '../../utils/action_creator/popups'

const Traits = props => {

	const { name } = useSelector(state => state.character)

	const renderTraits = () => {
		let arr = []
		switch(name){
			case "Iyugi":
				arr.push({name: "Reactionary", description: "You were bullied often as a child, but never quite developed an offensive response. Instead, you became adept at anticipating sudden attacks and reacting to danger quickly. You gain a +2 trait bonus on initiative checks."})
				arr.push({name: "Extremely Fashionable", description: "You really know how to make a good impression when you’re dressed well. Whenever you are wearing clothing and/or jewelry worth at least 150 gp (and not otherwise covered in gore, sewage, or other things that mar your overall look), you gain a +1 trait bonus on Bluff, Diplomacy, and Intimidate checks. One of these skills (your choice) is a class skill for you."})
				break
			case "Natesse":
				arr.push({name: "Magical Lineage", description: "One of your parents was a gifted spellcaster who not only used metamagic often, but also developed many magical items and perhaps even a new spell or two—and you have inherited a fragment of this greatness. Pick one spell when you choose this trait. When you apply metamagic feats to this spell that add at least 1 level to the spell, treat its actual level as 1 lower for determining the spell’s final adjusted level."})
				arr.push({name: "Nanite Revival", description: "You can instinctively activate your nanites to save your life. Once per day as an immediate action, you can command your nanites to stabilize you while you are dying, even while unconscious or helpless. This does not count as a use of your nanite surge ability."})
				break
			default:
				break
		}
		return arr.map((trait, i) => {
			return (
				<li data-id={i * 3 + 1} onClick={() => modalAction("generic", trait, {name: trait.name})} className='highlight mobile-selected-tab-content'  style={{maxHeight: window.outerHeight * 0.4}}>
					<strong data-id={i * 3 + 1}>{trait.name}</strong>
				</li>
			)
		})
	}

	return (
		<div style={{padding: '1em'}} className={localStorage.computer === "false" ? 'mobile-tab-selected-tab-container shadow' : 'none'}>
			{renderTraits()}
		</div>
	)
}

export default Traits
