import store from '../../store'
import { mod, size } from '../../fuf'
import { areYouProficientWithThisArmor } from './proficiencies'

export const armorClass = () => {
	// NEW DATA
	let acModifiers = []

	// STORED DATA
	const { character, character_info } = store.getState()
	let equippedCharacterArmor = character.character_armors.find(ca => ca.equipped)

	// CALCULATED DATA
	let dexMod = mod(character_info.ability_scores.dexterity)
	let wornArmorBonus = wornArmor(equippedCharacterArmor, character.character_armors)

	// DEXTERITY BONUS
	acModifiers.push({
		bonus: "dex",
		mod: equippedCharacterArmor.armor.max_dex_bonus < dexMod ? equippedCharacterArmor.armor.max_dex_bonus : dexMod
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


	return acModifiers
}

const wornArmor = (equipped, all) => {
	let bonus = 0
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
