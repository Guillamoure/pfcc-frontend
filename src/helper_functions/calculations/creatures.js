import _ from 'lodash'
import { mod, pluser } from '../fuf'
import { specialSizeMod, sizeMod } from './size'

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

export const savingThrow = (save, abilityScore, totalHitDice) => {
	let abilityMod = mod(abilityScore)
	let bonus = Math.floor(abilityMod + (save * totalHitDice))
	if (save === 0.5){bonus += 2}
	return pluser(bonus)
}

export const bab = (totalHitDice, creatureTypeHitDie) => {
	let babMod = 1
	if (creatureTypeHitDie === 8){babMod = 0.75}
	if (creatureTypeHitDie === 6){babMod = 0.5}
	return Math.floor(babMod * totalHitDice)
}

export const babString = (totalHitDice, creatureTypeHitDie) => {
	return pluser(bab(totalHitDice, creatureTypeHitDie))
}
export const cmbString = (creature) => {
	return pluser(cmb(creature))
}

export const cmb = creature => {
	let baseAttackBonus = bab(creature.hit_dice, creature.creature_type.hit_die)
	let sizeModifier = specialSizeMod(creature.size)
	let abilityMod = mod(creature.strength)
	if (sizeModifier <= -2){abilityMod = mod(creature.dexterity)}
	return baseAttackBonus + sizeModifier + abilityMod
}

export const cmd = creature => {
	let sizeModifier = specialSizeMod(creature.size)
	let additionalAbilityMod = mod(creature.dexterity)
	if (sizeModifier <= -2){additionalAbilityMod = mod(creature.strength)}
	return 10 + cmb(creature) + additionalAbilityMod
}

export const acMods = creature => {
	let array = []

	let dexMod = mod(creature.dexterity)
	array.push({name: "Dex", mod: dexMod})

	let sizeModifier = sizeMod(creature.size)
	array.push({name: "size", mod: sizeModifier})

	return array
}
export const acModsString = creature => {
	let armorClassMods = acMods(creature)
	let array = armorClassMods.map(mod => {
		return `${pluser(mod.mod)} ${mod.name}`
	})
	return `(${array.join(", ")})`
}

export const armorClassTotal = (creature) => {
	// NEW DATA
	let ac = {armorClass: 10, touch: 10, flatFooted: 10}

	// CALCULATED DATA
	let acModifiers = acMods(creature)

	// BASE ARMOR CLASS
	ac.armorClass += _.sum(acModifiers.map(m => m.mod))

	// TOUCH ARMOR CLASS
	let touchModifiers = acModifiers.filter(m => {
		return (m.name !== "armor" && m.name !== "natural")
	})
	ac.touch += _.sum(touchModifiers.map(m => m.mod))

	// FLAT FOOTED ARMOR CLASS
	let flatFootedModifiers = acModifiers.filter(m => {
		return (m.name !== "Dex" && m.name !== "dodge")
	})
	ac.flatFooted += _.sum(flatFootedModifiers.map(m => m.mod))

	return ac
}
