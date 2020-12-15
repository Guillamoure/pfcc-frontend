import React from 'react'
import { connect } from 'react-redux'
import { getFetch } from '../utils/fetches'
import { descriptionParser } from '../utils/fuf'
import { addToSkillsAction } from '../utils/action_creator/additional_info'

const SkillDescription = props => {

	const [ skill, setSkill ] = React.useState({})

	React.useState(() => {
		if (props.skillId){
			let foundSkill = props.skills.find(sk => sk.id === props.skillId)
			if (foundSkill){
				setSkill(foundSkill)
			} else {
				getFetch(`skills/${props.skillId}`)
					.then(data => {
						if (!data.error){
							setSkill(data.skill)
							addToSkillsAction(data.skill)
						}
					})
			}
		}
	}, [])

	const renderSkill = () => {
		const { description, action, try_again, special } = props.skill || skill
		return (
			<>
				{descriptionParser(description)}
				<strong>Action:</strong> {descriptionParser(action)}
				{!!try_again && <><strong>Try Again:</strong> {descriptionParser(try_again)}</>}
				{!!special && <><strong>Special:</strong> {descriptionParser(special)}</>}
			</>
		)
	}

	// console.log(skill)
	console.log("New Skill", props.skill)
	return (
		<aside>
			<h2>{props.skill.name || skill.name}</h2>
			<p><em>{props.skill.blurb || skill.blurb}</em></p>
			{renderSkill()}
		</aside>
	)
}

const mapStateToProps = (state) => {
  return {
    skills: state.skills
  }
}

export default connect(mapStateToProps)(SkillDescription)
