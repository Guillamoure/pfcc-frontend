import store from '../../store'

export const proficientWeapons = () => {

}

export const proficientArmors = () => {

}

export const areYouProficientWithThisWeapon = () => {

}

export const proficienctWithCurrentArmor = () => {
	return areYouProficientWithThisArmor(currentEquippedCharacterArmor())
}

export const areYouProficientWithThisArmor = (characterArmor) => {
	const { armor } = store.getState().character_info.proficiencies
	let isProficient = false

	armor.groups.forEach(gr => {
		if (characterArmor.armor.proficiency === gr.proficiency_group){
			isProficient = true
		}
	})

	armor.individualIds.forEach(ii => {
		if (ii.armor_id === characterArmor.armor.id){
			if (ii.additive){
				isProficient = true
			} else {
				isProficient = false
			}
		}
	})


	return isProficient
}

export const currentEquippedCharacterArmor = () => {
	const { character_armors } = store.getState().character
	return character_armors.find(ca => ca.equipped) ||  false
}

export const armorCheckPenalty = () => {
	let ceca = currentEquippedCharacterArmor()
	let penalty = ceca.armor?.armor_check_penalty || 0
	if (penalty < 0 && ceca.masterwork){
		penalty += 1
	}
	return penalty
}

export const armorCheckPenaltyOnOtherAbilities = () =>{
	let characterArmor = currentEquippedCharacterArmor()
	return (!characterArmor || areYouProficientWithThisArmor(characterArmor)) ? 0 : characterArmor.armor.armor_check_penalty
}
