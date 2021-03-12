import React from 'react'
import store from '../../store'
import { abilityScoreMod } from './ability_scores'
import { stealthSizeMod } from './size'
import { armorCheckPenalty } from './proficiencies'
import { pluser } from '../../fuf'
import { locateAbility, locateFeatureThroughAbility } from '../fuf'
import { modalAction } from '../action_creator/popups'

export const skillBonusArray = (skillObj) => {
	let permanent = 0
	let temporary = 0

	const { character, character_info } = store.getState()

	// are there ranks
	let ranks = skillRanks(skillObj, character)
	permanent += ranks

	// is this a class skill?
	let classSkill = isThisAClassSkill(skillObj, character)
	permanent += (ranks > 0 && classSkill) ? 3 : 0

	// += ability score
	let mod = abilityScoreMod(skillObj.ability_score.toLowerCase())
	permanent += mod

	// any bonuses?
	let bonuses = calculateBonuses(skillObj, character_info, character)
	permanent += bonuses.permanent.map(b => b.bonus).reduce((b, agg) => (agg + b), 0)
	temporary += bonuses.temporary.map(b => b.bonus).reduce((b, agg) => (agg + b), 0)
	if (skillObj.name === "Stealth"){permanent += stealthSizeMod(character.race.size)}

	// armor check penalty
	let acp = armorCheckPenalty()
	if (skillObj.ability_score === "Strength" || skillObj.ability_score === "Dexterity"){
		permanent += acp
	}

	// HARDCODE
	if (skillObj.name === "Swim" && character.name === "Fire-Roasted Tomatoes"){permanent += 2}
	if (skillObj.name === "Profession (chef)" && character.name === "Fire-Roasted Tomatoes"){permanent += 3}
	if (skillObj.name === "Acrobatics" && character.name === "Iyugi"){permanent += 2}
	if (skillObj.name === "Perception" && character.name === "Natesse"){permanent += 2}
	if (skillObj.name === "Sense Motive" && character.name === "Natesse"){permanent += -4}
	if (skillObj.name === "Climb" && character.name === "Dz'eyn"){permanent += 8}
	if (skillObj.name === "Perception" && character.name === "Dink Weatherbyrst"){permanent += 2}
	// HARDCODE

	return [permanent, temporary]
}

const calculateBonuses = (skillObj, character_info, character) => {
	let permanent = []
	let temporary = []

	character_info.bonuses.forEach(b => {
		if (b.type === "skill" && b.skill_id === skillObj.id){
			// if (b.duration === "permanent"){
			// 	permanent += b.bonus
			// } else {
			// 	temporary += b.bonus
			// }
		} else if (b.type === "skill" && !b.skill_id) {
			if (b.specific_statistic === "Knowledge" && skillObj.knowledge){
				let level
				if (b.bonus_multiplier_based_on_feature_level){
					// occasionally getting an error on load
					// typeerror, cannot do "klass_id" on undefined
					// when id refresh, error doesn't exist
					// would occur with classes that didn't have bonuses, i.e. Cleric
					// could be vestigial from another class, like Bard? Bardic Knowledge?
					debugger
					let klassId = character[b.source.source].find(ability => ability.id === b.source.sourceId).klass_id
					level = character_info.classes.find(cl => cl.id === klassId).level
				} else {
					character_info.classes.forEach(cl => level += cl.level)
				}
				let specificBonus = b.bonus * level
				if (b.round_down){specificBonus = Math.floor(specificBonus)}
				if (specificBonus < b.minimum_bonus){specificBonus = b.minimum_bonus}
				if (b.duration === "permanent"){
					permanent.push({bonus: specificBonus, sourceName: renderBonusName(b), source: b.source})
				} else {
					temporary.push({bonus: specificBonus, sourceName: renderBonusName(b), source: b.source})
				}
			}
		}
	})


	return {permanent, temporary}
}

export const skillBonus = skillObj => {
	let array = skillBonusArray(skillObj)
	return array[0] + array[1]
}

export const skillBonusPluser = skillObj => {
	return pluser(skillBonus(skillObj))
}

export const isThisAClassSkill = (skillObj, character) => {
	let classSkill = false
	character.uniq_klasses.forEach(uk => {

		let validClassSkill = uk.class_skillset_skills.find(css => css.skill_id === skillObj.id && css.skillset_id === character.skillset.id)

		if (validClassSkill){
			classSkill = true
		}

		// HARDCODE
		if (character.name === "Fire-Roasted Tomatoes" && skillObj.name === "Handle Animal"){
			classSkill = true
		}
		// HARDCODE

	})
	return classSkill
}

export const skillRanks = (skillObj, character) => {
	let skillsetSkill = character.character_skillset_skills.find(css => {
		if (css.skill_id === skillObj.id){
			if (!css.detail){return true}
			if (css.detail === skillObj.detail){return true}
			return false
		} else {
			return false
		}
	})?.ranks || 0
	return skillsetSkill
}

export const renderBonusName = (bonus) => {
	let ability = locateAbility(bonus.source)
	let feature = locateFeatureThroughAbility(ability, bonus.source.featureId)
	return feature.name || ability.name
}

export const renderSkillTooltip = (skillObj) => {
	// NEW DATA
	let tooltips = []

	// STORED DATA
	const { character_info, character } = store.getState()

	// CALCULATED DATA
	let bonuses = calculateBonuses(skillObj, character_info, character)

	for (const category in bonuses) {
		bonuses[category].forEach(b => {
			tooltips.push(`${pluser(b.bonus)} from ${b.sourceName}`)
		})
	}

	let acp = armorCheckPenalty()
	if ((skillObj.ability_score === "Strength" || skillObj.ability_score === "Dexterity") && acp < 0){
		tooltips.push(`${pluser(acp)} from Armor Check Penalty`)
	}

	if (tooltips.length){
		return tooltips.join(", ")
	} else {
		return null
	}

}

export const renderSkillName = skillObj => {
	let hasACP = null
	let asterisk = null
	let name = skillObj.name

	let acp = armorCheckPenalty()
	if ((skillObj.ability_score === "Strength" || skillObj.ability_score === "Dexterity") && acp < 0){
		hasACP = <sup>acp</sup>
	}
	let tooltips = renderSkillTooltip(skillObj)
	if ((!!hasACP && !!tooltips && tooltips.includes(",")) || (!hasACP && !!tooltips)){
		asterisk = <sup>*</sup>
	}


	return <><span className="underline-hover" style={{color: "black"}} onClick={() => modalAction("skill", skillObj.id, {name})}>{name}</span>{hasACP}{asterisk}</>
}

export const addCustomSkills = (css, skills) => {
	let arr = []

	css.forEach(ss => {
		if (ss.detail){
			let skill = skills.find(sk => sk.id === ss.skill_id)
			arr.push({...skill, name: `${skill.name} (${ss.detail})`, detail: ss.detail})
		}
	})

	return arr
}

export const sortSkills = (skills) => {
	return skills.sort((a, b) => {
		if (a.id !== b.id){return a.name.localeCompare(b.name)}
		if ((a.detail && !b.detail)){return -1}
		if ((!a.detail && b.detail)){return 1}
		let aSubstring = a.name.split("(")[1].slice(0, -1)
		let bSubstring = b.name.split("(")[1].slice(0, -1)
		return aSubstring.localeCompare(bSubstring)
	})
}
