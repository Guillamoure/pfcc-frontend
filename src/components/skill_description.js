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
		} else if (props.skill){
			setSkill(props.skill)
		}
	}, [])

	const renderSkill = () => {
		const { description, action, try_again, special } = skill
		return (
			<>
				{descriptionParser(description)}
				<strong>Action:</strong> {descriptionParser(action)}
				{!!try_again && <><strong>Try Again:</strong> {descriptionParser(try_again)}</>}
				{!!special && <><strong>Special:</strong> {descriptionParser(special)}</>}
			</>
		)
	}

	console.log(skill)
	return (
		<aside>
			<h2>{skill.name}</h2>
			<p><em>{skill.blurb}</em></p>
			{skill.id && renderSkill()}
		</aside>
	)
}

const mapStateToProps = (state) => {
  return {
    skills: state.skills
  }
}

export default connect(mapStateToProps)(SkillDescription)
