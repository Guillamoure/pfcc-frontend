import { allCharacterChoices } from './character_choices'

export const doWeNeedAYellowNotification = () => {
	let yellow = false
	allCharacterChoices().forEach(cc => {
		if (cc.isNew){yellow = true}
	})

	return yellow
}
