import store from '../../store'
import { replaceCharacterAction, discoverEquipmentAction } from '../action_creator/character'
import { patchFetch } from '../fetches'

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
		case "potion":
			adjust = "character_potions"
			break
		case "scroll":
			adjust = "character_scrolls"
			break
		case "wand":
			adjust = "character_wands"
			break
		default:
			debugger
			break
	}

	let duplicate = [...character[adjust]]
	if (options?.knownItem){
		duplicate = duplicate.filter(d => d.id !== payload.data.id)
	}
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
		case "potion":
			adjust = "character_potions"
			break
		case "scroll":
			adjust = "character_scrolls"
			break
		case "wand":
			adjust = "character_wands"
			break
		default:
			debugger
			break
	}
	patchFetch(`${adjust}_discovered/${payload.data.id}`)
		.then(data => {
			console.log(data.message || "Successful Item Discovered!")
		})
	discoverEquipmentAction(adjust, payload.data.id)
}
