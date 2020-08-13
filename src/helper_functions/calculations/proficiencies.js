import store from '../../store'

export const proficientWeapons = () => {

}

export const proficientArmors = () => {

}

export const areYouProficientWithThisWeapon = () => {

}

export const areYouProficientWithThisArmor = (characterArmor) => {
	const { armor } = store.getState().character_info.proficiencies

	debugger
}
