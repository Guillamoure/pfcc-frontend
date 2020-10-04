import { mod, pluser } from '../fuf'

export const crCalc = (cr) => {
	if (cr < 1){return `1/${1/cr}`}
	return cr
}

export const crXPCalc = cr => {
	let starting = cr % 2 ? 400 : 600
	if (cr >= 1){
		let exp = Math.ceil((cr/2.0)-1.0)
		let mult = Math.pow(2, exp)
		return starting * mult
	} else {
		switch(1/cr){
			case 2:
				return 200
			case 3:
				return 135
			case 4:
				return 100
			case 6:
				return 65
			case 8:
				return 50
			default:
				return 0
		}
	}
}

export const averageHP = (totalHitDice, creatureTypeHitDie, constitutionScore) => {
	let averageDiceRoll = (creatureTypeHitDie + 1.0) / 2
	let baseHP = Math.floor(totalHitDice * averageDiceRoll)
	let hp = baseHP + mod(constitutionScore)

	let modString = mod(constitutionScore) !== 0 ? pluser(mod(constitutionScore)) : ""
	return `${hp} (${totalHitDice}d${creatureTypeHitDie}${modString})`
}
