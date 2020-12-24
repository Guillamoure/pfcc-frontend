import { allKlassSpecializations } from './character_choices'

export const doWeNeedARedNotification = () => {
	let red = false
	allKlassSpecializations().forEach(kspec => {
		if (!kspec.hasSpecialization){red = true}
	})

	return red
}
