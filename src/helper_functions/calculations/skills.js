import store from '../../store'
import { abilityScoreMod } from './ability_scores'
import { armorCheckPenalty } from './proficiencies'
import { pluser } from '../../fuf'

export const skillBonusArray = (skillObj) => {
	let permanent = 0
	let temporary = 0
	// let bonus = 0
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
	character_info.bonuses.forEach(b => {
		if (b.type === "skill" && b.skill_id === skillObj.id){
			if (b.duration === "permanent"){
				permanent += b.bonus
			} else {
				temporary += b.bonus
			}
		} else if (b.type === "skill" && !b.skill_id) {
			if (b.specific_statistic === "Knowledge" && skillObj.knowledge){
				let level
				if (b.bonus_multiplier_based_on_feature_level){
					let klassId = character[b.source.source].find(ability => ability.id === b.source.sourceId).klass_id
					level = character_info.classes.find(cl => cl.id === klassId).level
				} else {
					character_info.classes.forEach(cl => level += cl.level)
				}
				let specificBonus = b.bonus * level
				if (b.round_down){specificBonus = Math.floor(specificBonus)}
				if (specificBonus < b.minimum_bonus){specificBonus = b.minimum_bonus}
				if (b.duration === "permanent"){
					permanent += specificBonus
				} else {
					temporary += specificBonus
				}
			}
		}
	})
	// armor check penalty
	let acp = armorCheckPenalty()
	if (skillObj.ability_score === "Strength" || skillObj.ability_score === "Dexterity"){
		permanent += acp
	}

	return [permanent, temporary]
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

	})
	return classSkill
}

export const skillRanks = (skillObj, character) => {
	let skillsetSkill = character.character_skillset_skills.find(css => css.skill_id === skillObj.id)?.ranks || 0
	return skillsetSkill
}
