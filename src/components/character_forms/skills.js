import React from 'react'
import _ from 'lodash'
import localhost from '../../localhost'
import { isThisAClassSkill } from '../../utils/calculations/skills'
import { mod, pluser } from '../../utils/fuf'
import SkillDescription from '../skill_description'

const Skills = props => {

	const [ skillsets, setSkillsets ] = React.useState([])
	const [ skillDetails, setDetails ] = React.useState({})
	const [ customizable, customize ] = React.useState([])
	const [ customSkillDetails, setCustomDetails ] = React.useState([])

	React.useEffect(() => {
		fetch(`${localhost}/api/v1/skillsets`)
		.then(r => r.json())
		.then(data => {
			setSkillsets(data)
		})
		if (props.campaignDetails){
			if (props.activeSkillset !== props.campaignDetails.skillset.id){
				props.renderChange({target: {value: props.campaignDetails.skillset.id, name: "activeSkillset"}})
			}
		}
	}, [])

  const renderActiveSkillset = () => {
		if (props.campaignDetails?.skillset?.id){
			return (
				<div>Active Skillset: <strong>{props.campaignDetails.skillset.name}</strong></div>
			)
		}
    return (
      <div>
        <label>
          Active Skillset:
          <select name="activeSkillset" value={props.activeSkillset} onChange={props.renderChange}>
            {skillsets.map(ss => <option value={ss.id}>{ss.name}</option>)}
          </select>
        </label>
      </div>
    )
  }

  const renderClassSkill = (skill) => {
    let isThisAClassSkill = false
    props.character.klasses.forEach(klass => {
      klass.class_skillset_skills.forEach(csss => {
        if (csss.skill_id === skill.id && csss.skillset_id === props.character.skillset.id) {
          isThisAClassSkill = true
        }
      })
    })
    return isThisAClassSkill
  }

	const renderSkillName = (skill) => {
		return skill.detail ? `${skill.name} (${skill.detail})` : skill.name
	}

  const renderSkillTableRow = () => {
		const skillset = skillsets.find(ss => ss.id === parseInt(props.activeSkillset)) ?? {}
		let skills = skillset?.skills ?? []

		if (props.skillRanks){
			let customSkill = false
			props.skillRanks.forEach(sr => {
				if (sr.detail){
					if (!skills.find(sk => sk.id === sr.skill.id && sr.detail === sk.detail))
					skills.push({...sr.skill, detail: sr.detail})
				}
			})
		}

		const sortedSkills = skills.sort((a,b) => a.name.localeCompare(b.name)) ?? []
		let character = {
			skillset: {id: props.activeSkillset},
			uniq_klasses: props.classes.filter(cl => props.chosenClasses.includes(cl.id))
		}
		return sortedSkills.map(skill => {
			return (
				<tr>
					<td>{isThisAClassSkill(skill, character) ? "X" : ""}</td>
					<td><strong>{skill.ability_score.slice(0, 3)}</strong></td>
					<td className="underline-hover" style={{color: "black"}} onClick={() => setDetails(skill)}>{renderSkillName(skill)}</td>
					<td>{renderBonus(skill, character)}</td>
					<td><strong>{props.skillRanks.find(sr => sr.skill?.id === skill.id)?.ranks ?? 0}</strong></td>
					<td>{renderOptions(skill)}</td>
				</tr>
			)
		})
  }

	const renderBonus = (skill, character) => {
		let abilityScore = props.[skill.ability_score.toLowerCase()]
		let abilityMod = mod(abilityScore)
		let ranks = props.skillRanks.find(sr => sr.skill?.id === skill.id)?.ranks ?? 0
		let classSkill = isThisAClassSkill(skill, character) && ranks > 0 ? 3 : 0

		return pluser(abilityMod + ranks + classSkill)
	}

	const renderOptions = skill => {

		let ranks = props.skillRanks.find(sr => sr.skill?.id === skill.id)?.ranks ?? 0
		let level = props.chosenClasses.length
		let canAddRanks = true
		if (calculateSkillRanks() <= 0){
			canAddRanks = false
		}

		const addRank = () => {
			let newRanks = [...props.skillRanks]
			let i = newRanks.findIndex(sr => {
				return skill.detail ? sr.skill?.id === skill.id && sr.detail === skill.detail : sr.skill?.id === skill.id
			})
			if (i > -1){
				newRanks[i] = {...newRanks[i], ranks: newRanks[i].ranks + 1}
			} else {
				newRanks.push({skill, ranks: 1})
			}

			props.renderChange({target: {name: "skillRanks", value: newRanks}})
		}

		const removeRank = () => {
			let newRanks = [...props.skillRanks]
			let i = newRanks.findIndex(sr => {
				return skill.detail ? sr.skill?.id === skill.id && sr.detail === skill.detail : sr.skill?.id === skill.id
			})
			if (newRanks[i].ranks > 1){
				newRanks[i] = {...newRanks[i], ranks: newRanks[i].ranks - 1}
			} else {
				newRanks.splice(i, 1)
			}
			props.renderChange({target: {name: "skillRanks", value: newRanks}})
		}

		if (skill.customizable && !skill.detail){
			const customizeSkill = () => {
				let newRanks = [...props.skillRanks]

				let arr = [...customSkillDetails]
				let i = arr.findIndex(sd => sd.id === skill.id)
				let arr2 = [...customizable].filter(id => id !== skill.id)

				newRanks.push({skill, ranks: 0, detail: arr[i].text})
				props.renderChange({target: {name: "skillRanks", value: newRanks}})

				arr.splice(i, 1)
				setCustomDetails(arr)
				customize(arr2)
			}
			if (customizable.includes(skill.id)){
				let i = customSkillDetails.findIndex(sd => sd.id === skill.id)
				const updateText = e => {
					let arr = [...customSkillDetails]
					arr = arr.map((sd, j) => {
						if (j !== i){return sd}
						return {...sd, text: e.target.value}
					})
					setCustomDetails(arr)
				}
				return (
					<>
						<input type="text" value={customSkillDetails[i].text} onChange={updateText}/>
						<button onClick={customizeSkill}>OK</button>
					</>
				)
			} else {
				const makeCustomizable = () => {
					customize([...customizable, skill.id])
					setCustomDetails([...customSkillDetails, {id: skill.id, text: ""}])
				}

				return (<button onClick={makeCustomizable}>Customize</button>)
			}

		}

		return (
			<>
				{(ranks < level && canAddRanks) ? <button onClick={addRank}>+</button> : <button className="inactive-button">+</button>}
				{ranks > 0 ? <button onClick={removeRank}>-</button> : <button className="inactive-button">-</button>}
			</>
		)
	}

	const numberOfRanks = () => {
		if (!props.chosenClasses.length){
			return (<p>Make sure your Character has at least one class chosen and rolls your stats if you haven't yet!</p>)
		}
		let skillRanks = calculateSkillRanks()
		return (<p>Total Skill Ranks Remaining: <strong>{skillRanks}</strong></p>)
	}

	const calculateSkillRanks = () => {
		let total = 0

		props.chosenClasses.forEach(cc => {
			let klass = props.classes.find(cl => cl.id === cc)
			total += klass.skill_ranks
			total += mod(props.intelligence)
		})

		props.skillRanks.forEach(sr => {
			total -= sr.ranks
		})

		return total
	}

	const renderSkillDetails = () => {
		return (
			<div style={{textAlign: "left", height: "80vh", overflowY: "scroll", padding: "0.4em"}}>
				<SkillDescription skill={skillDetails}/>
			</div>
		)
	}

  return(
    <div>
      <span>Skillset</span>
      {skillsets && renderActiveSkillset()}
			{numberOfRanks()}
			<section id="character-creation-skills">
	      <table>
	        <thead>
	          <tr>
	            <th>Class</th>
	            <th>Ability</th>
	            <th>Skill</th>
							<th>Bonus</th>
	            <th>Ranks</th>
	            <th></th>
	          </tr>
	        </thead>
	        <tbody>
	          {skillsets && renderSkillTableRow()}
	        </tbody>
	      </table>
				<ul>
					<li>Add Ranks to increase your proficiency in certain skills. Click on a skill to see more details!</li>
					<li>The <strong>Bonus</strong> calculation does not include Racial Ability Score Adjustments. Jack didn't have time for that srry.</li>
					<li>For the skills with a <strong>Customize</strong> button, you choose a specific field that you specialize in. See the skill details for Craft, Perform, and Profession for more details. For Knowledge, you automatically are proficient in Knowledge about your given Guild. If you have reason to, you can be proficient in another Guild. Run it by Jack!</li>
				</ul>
				{!!skillDetails.id && renderSkillDetails()}
			</section>
    </div>
  )

}

export default Skills
