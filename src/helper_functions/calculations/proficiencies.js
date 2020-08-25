import store from '../../store'

export const proficientWeapons = () => {

}

export const proficientArmors = () => {

}

export const areYouProficientWithThisWeapon = () => {

}

export const areYouProficientWithThisArmor = (characterArmor) => {
	const { armor } = store.getState().character_info.proficiencies
	let isProficient = false

	armor.groups.forEach(gr => {
		if (characterArmor.proficiency === gr.proficiency_group){
			isProficient = true
		}
	})

	armor.individualIds.forEach(ii => {
		if (ii.armor_id === characterArmor.id){
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
