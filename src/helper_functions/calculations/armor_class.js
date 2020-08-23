import store from '../../store'
import _ from 'lodash'
import { size } from '../../fuf'
import { areYouProficientWithThisArmor } from './proficiencies'
import { abilityScoreMod } from './ability_scores'

export const armorClassModifiers = () => {
	// NEW DATA
	let acModifiers = []

	// STORED DATA
	const { character, character_info } = store.getState()
	let equippedCharacterArmor = character.character_armors.find(ca => ca.equipped) || null
	const bonuses = character_info.bonuses.filter(b => b.statistic === "Armor Class")

	// CALCULATED DATA
	let dexMod = abilityScoreMod("dexterity")
	let wornArmorBonus = wornArmor(equippedCharacterArmor, character.character_armors)

	// DEXTERITY BONUS
	acModifiers.push({
		bonus: "dex",
		mod: equippedCharacterArmor?.armor.max_dex_bonus < dexMod ? equippedCharacterArmor.armor.max_dex_bonus : dexMod
	})

	// ARMOR BONUS
	acModifiers.push({
		bonus: "armor",
		mod: wornArmorBonus
	})

	// SIZE BONUS
	acModifiers.push({
		bonus: "size",
		mod: size(character.race.size)
	})

	// does not account for shields, adjust equippedCharacterArmor to not seek shields
	// no other modifiers calculated
	// alchemical
	// circumstance
	// competence
	// deflection
	// dodge
	// enhancement
	// insight
	// luck
	// morale
	// natural
	// profane
	// resistance
	// sacred
	// shield
	// untyped (take name from ability/item/spell)
	bonuses.forEach(bonus => {
		if (bonus.bonus_type === "untyped"){
			let sourceName = character[bonus.source.source].find(ability => ability.id === bonus.source.sourceId).name
			sourceName = sourceName.toLowerCase()
			acModifiers.push({
				bonus: "untyped",
				source: sourceName,
				mod: bonus.bonus
			})
		}
	})


	return acModifiers
}

const wornArmor = (equipped, all) => {
	let bonus = 0
	// if not wearing any armor
	if (equipped === null){return bonus}

	if (equipped.extra_armor_options.length){
		let extraCharacterArmorIds = equipped.extra_armor_options.map(ex => ex.id)
		all.forEach(ca => {
			if(extraCharacterArmorIds.includes(ca.id)){
				bonus += ca.armor.bonus
			}
		})
	}
	bonus += equipped.armor.bonus

	return bonus
}

export const armorClassTotal = () => {
	// NEW DATA
	let ac = {armorClass: 10, touch: 10, flatFooted: 10}

	// CALCULATED DATA
	let acModifiers = armorClassModifiers()

	// BASE ARMOR CLASS
	ac.armorClass += _.sum(acModifiers.map(m => m.mod))

	// TOUCH ARMOR CLASS
	let touchModifiers = acModifiers.filter(m => {
		return (m.bonus !== "armor" && m.bonus !== "natural")
	})
	ac.touch += _.sum(touchModifiers.map(m => m.mod))

	// FLAT FOOTED ARMOR CLASS
	let flatFootedModifiers = acModifiers.filter(m => {
		return (m.bonus !== "dex" && m.bonus !== "dodge")
	})
	ac.flatFooted += _.sum(flatFootedModifiers.map(m => m.mod))

	return ac
}
