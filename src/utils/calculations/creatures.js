import React from 'react'
import _ from 'lodash'
import { mod, pluser } from '../fuf'
import { specialSizeMod, sizeMod, sizeDamage } from './size'
import { modalAction } from '../action_creator/popups'

export const crCalc = (cr) => {
	if (cr < 1){return `1/${Math.ceil(1/cr)}`}
	return cr
}

export const crXPCalc = cr => {
	let starting = cr % 2 ? 400 : 600
	if (cr >= 1){
		let exp = Math.ceil((cr/2.0)-1.0)
		let mult = Math.pow(2, exp)
		return starting * mult
	} else {
		switch(Math.ceil(1/cr)){
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

export const averageHP = (totalHitDice, creatureTypeHitDie, constitutionScore, options) => {
	let averageDiceRoll = (creatureTypeHitDie + 1.0) / 2
	let baseHP = Math.floor(totalHitDice * averageDiceRoll)
	let con = totalHitDice * mod(constitutionScore)
	if (options.augmentSummoning){
		con += 2 * totalHitDice
	}
	let hp = baseHP + con

	let modString = mod(constitutionScore) !== 0 ? pluser(con) : ""
	return `${hp} (${totalHitDice}d${creatureTypeHitDie}${modString})`
}

export const savingThrow = (save, abilityScore, totalHitDice, options) => {
	let abilityMod = mod(abilityScore)
	let bonus = Math.floor(abilityMod + (save * totalHitDice))
	if (save === 0.5){bonus += 2}
	if (options.augmentSummoning){bonus += 2}
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
	let otherMods = 0
	if (creature.augmentSummoning){otherMods += 2}
	return baseAttackBonus + sizeModifier + abilityMod + otherMods
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

export const renderFeats = (feats) => {
	let featNodes = []
	for (let i = 0; i < feats.length; i++) {
		featNodes.push(<span className="underline-hover" onClick={() => modalAction("feat", feats[i])}>{feats[i].name}</span>)
		if (i + 1 < feats.length){
			featNodes.push(", ")
		}
	}
	return featNodes
}

export const renderInitiative = (creature) => {
	let dexMod = mod(creature.dexterity)

	return pluser(dexMod)
}

export const renderAttacks = (creature, attackType) => {
	let typedAttacks = creature.weapons.filter(cw => cw.weapon.weapon_type === attackType)
	if (typedAttacks.length) {
		let abilityModifier = attackType === "Melee" ? mod(creature.strength) : mod(creature.dexterity)
		if (creature.augmentSummoning && attackType === "Melee"){abilityModifier += 2}
		let totalAttackBonus = renderAttackBonus(creature, attackType)

		let attackNodes = typedAttacks.map(cw => {
			let dice = cw.weapon.num_of_dice + "d" + cw.weapon.damage_dice
			dice = sizeDamage(creature.size, dice)

			return `${cw.weapon.name} ${pluser(totalAttackBonus)} (${dice}${pluser(abilityModifier)})`
		})

		return <p><strong>Melee</strong> {attackNodes.join(", ")}</p>
	} else {
		return null
	}
}

export const renderAttackBonus = (creature, attackType) => {
	let sizeModifier = sizeMod(creature.size)
	let abilityModifier = attackType === "Melee" ? mod(creature.strength) : mod(creature.dexterity)
	if (creature.augmentSummoning && attackType === "Melee"){abilityModifier += 2}

	creature.creatureInfo.effects.forEach(ef => {
		if (ef.could_apply_dex_for_attack_rolls === true && attackType === "Melee"){
			let greaterAbilityScore = creature.strength > creature.dexterity ? creature.strength : creature.dexterity
			abilityModifier = mod(greaterAbilityScore)
		}
	})

	return sizeModifier + abilityModifier + bab(creature.hit_dice, creature.creature_type.hit_die)
}
