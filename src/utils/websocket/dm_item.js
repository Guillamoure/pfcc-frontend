import store from '../../store'
import { replaceCharacterAction, discoverEquipmentAction } from '../action_creator/character'

export const incorporateItemToCharacter = (payload, source, options) => {

	const { character } = store.getState()

	let adjust
	switch(payload.itemType){
		case "item":
			adjust = "items"
			break
		case "poison":
			adjust = "poisons"
			break
		case "weapon":
			adjust = "character_weapons"
			break
		case "armor":
			adjust = "character_armors"
			break
		case "magic_item":
			adjust = "character_magic_items"
			break
		default:
			debugger
			break
	}

	let duplicate = [...character[adjust]]
	duplicate.push(payload.data)

	replaceCharacterAction(adjust, duplicate)

}

export const makeItemDiscovered = (payload, source, options) => {

	let adjust
	switch(payload.itemType){
		case "item":
			adjust = "items"
			break
		case "poison":
			adjust = "poisons"
			break
		case "weapon":
			adjust = "character_weapons"
			break
		case "armor":
			adjust = "character_armors"
			break
		case "magic_item":
			adjust = "character_magic_items"
			break
		default:
			debugger
			break
	}
	discoverEquipmentAction(adjust, payload.data.id)
}
