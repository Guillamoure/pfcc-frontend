import store from '../../store'
import {
  bonusAction,
  addMovementAction,
	proficiencyAction,
	activeFeatureAction,
	addTemporaryHitPointsAction,
	removeTemporaryHitPointsAction,
	adjustStatusConditionsAction
} from '../action_creator/features'
import { replaceCharacterInfoAction } from '../action_creator/character'
import { statusConditionDistribution, removeStatusConditionDistribution } from  './status_conditions'
import { sendCampaignWebsocket } from '../websocket/campaign'
import { makeItemDiscovered } from '../websocket/dm_item'
import { locateAbility } from '../fuf'
import { modalAction } from '../action_creator/popups'

export const defaultCharacterInfo = () => {
	return {
    bonuses: [],
		displayDescriptions: [],
    effects: [],
    features: [],
		forbidden: [],
    proficiencies: { weapon: {groups: [], individualIds: []}, armor: {groups: [], individualIds: []} },
    movement: [],
		statusConditions: [],
		summonedAllies: []
  }
}

export const doesThisFeatureNeedToBeDistributed = (ability) => {
	let hasFeatures = false
	let array = ["skill_bonuses", "stat_bonuses", "display_descriptions", "conditions", "languages", "movements", "weapon_proficiencies", "armor_proficiencies"]
	array.forEach(feature => {
		if (ability[feature].length){hasFeatures = true}
	})
	if (ability.action){
		let actionArray = ["castable_spells"]
		actionArray.forEach(feature => {
			if (ability[feature].length){hasFeatures = true}
		})
	}
	return hasFeatures
}

export const initialCharacterDistribution = (character, options) => {
	// NEW DATA
  let character_info = defaultCharacterInfo()

	let characterLevel = store.getState().character_info?.classes?.reduce((agg, el) => (agg + el.level), 0)

	let { specific_feature_id_to_be_updated } = options ?? {}

  // racial traits
  // klass features
  character.applicable_klass_features.forEach(akf => {
    akf.features.forEach((feature) => {
      if (!feature.action && !feature.usage && (!specific_feature_id_to_be_updated || (specific_feature_id_to_be_updated && feature.id !== specific_feature_id_to_be_updated))) {
				let characterChoice = character.character_choices.find(ccc => ccc.feature_id === feature.id)
				if (characterChoice){
					let featureCC = feature.character_choices[0]
					characterChoice.column = featureCC.column
					characterChoice.sub_feature = featureCC.sub_feature
				}
        klassFeaturesFeatureDistribution(feature, character_info, { sourceId: akf.id, source: "applicable_klass_features", featureId: feature.id }, {characterLevel, klassId: akf.klass_id, characterChoice})
      }
    })
  })

  // weapon
  // armor
  // magic items
  character.character_magic_items.forEach(cmi => {
    cmi.magic_item.features.forEach((feature) => {
      if (!feature.action){
        klassFeaturesFeatureDistribution(feature, character_info, { sourceId: cmi.id, source: "character_magic_items", featureId: feature.id }, {characterLevel})
      }
    })
  })


  character_info.bonuses.forEach(b => {
    bonusAction(b)
  })
  // HARDCODE TESTING
  character_info.movement.push({movement: "Base", feet: 30, bonus: false, penalty: false})

  character_info.movement.forEach(addMovementAction)

	proficiencyAction(character_info.proficiencies)

	replaceCharacterInfoAction("displayDescriptions", character_info.displayDescriptions)
}


export const featureDistribution = (feature, options) => {
	// NEW DATA
	let character_info = defaultCharacterInfo()
	let source = {featureId: feature.id, sourceId: feature.sourceId, source: feature.source}

	// STORED DATA
	let { activeFeatures, classes } = store.getState().character_info
	let oldActiveFeaturesLength = activeFeatures.length
	let characterLevel = classes.reduce((agg, el) => (agg + el.level), 0)

	// if some feature that is activated has a spell that is cast on activation
	if (feature.action && feature.castable_spells.length){
		feature.castable_spells.forEach(fcs => {
			// see if that spell has any features
			if (fcs.spell.features.length){
				fcs.spell.features.forEach(spF => {
					// check for any features to be distributed
					featureDistribution(spF, {featureName: fcs.spell.name})
				})
			}
		})
	}

	// go through the feature, and add it to character_info
	klassFeaturesFeatureDistribution(feature, character_info, source, {characterLevel})

	// add/remove this feature to the list of active features in character_info.activeFeatures (redux)
	activeFeatureAction(source)

	// check to see if this feature was added or removed
	activeFeatures = store.getState().character_info.activeFeatures

	if(activeFeatures.length > oldActiveFeaturesLength){
		// if added
		character_info.bonuses.forEach((b) => {
			if (b.statistic === "Hit Points" && b.bonus_type === "temporary"){
				let redux = store.getState()
				let tempHP = { source: {...b.source} }
				let ability = redux.character[b.source.source].find(a => a.id === b.source.sourceId)
				let multiplier = redux.character_info.classes.find(cl => cl.id === ability.klass_id).level

				tempHP.bonus = b.bonus * multiplier
				addTemporaryHitPointsAction(tempHP)
			} else {
				bonusAction(b)
			}
		})
		// v websockets! v
		if (feature.applications.find(app => app.affects_allies)){
			let payload = {...character_info}
			let ability = locateAbility(source)
			let featureSource = {
				sourceName: ability.name,
				sourceId: ability.id,
				featureName: feature.name,
				featureId: feature.id
			}
			let options = { additive: true, toggleable: !!feature.applications.find(app => app.toggleable) }
			if (ability.klass_id){featureSource.klassId = ability.klass_id}
			sendCampaignWebsocket(payload, featureSource, options)
		}
	} else {
		// if removed
		character_info.bonuses.forEach((b) => {
			if (b.statistic === "Hit Points" && b.bonus_type === "temporary"){
				removeTemporaryHitPointsAction(b.source)
			} else {
				bonusAction(b, true)
			}
		})
		// v websockets! v
		if (feature.applications.find(app => app.affects_allies)){
			let payload = {...character_info}
			let ability = locateAbility(source)
			let featureSource = {
				sourceName: ability.name,
				sourceId: ability.id,
				featureName: feature.name,
				featureId: feature.id
			}
			let options = {
				remove: true,
				additive: false
			}
			if (ability.klass_id){featureSource.klassId = ability.klass_id}
			sendCampaignWebsocket(payload, featureSource, options)
		}
		character_info.statusConditions.forEach(sc => {
			let statusConditions = [...store.getState().character_info.statusConditions]
			statusConditions = statusConditions.filter(c => c.condition !== sc.condition)
			adjustStatusConditionsAction(statusConditions)
			removeStatusConditionDistribution(sc)
		})
		// AFTER THE MAIN FEATURE HAS ENDED
		// LOOK FOR ANY AFTER EFFECTS
		if (feature.after){
			// featureSource wont find any Feats nests in character_klasses, be warned
			let featureSource = store.getState().character[feature.source].find(ability => ability.id === feature.sourceId)
			let featureSourceFeaturesAfter = featureSource.features.filter(fs => fs.after)

			character_info = defaultCharacterInfo()

			featureSourceFeaturesAfter.forEach(after => {
				source = {featureId: after.id, sourceId: feature.sourceId, source: feature.source}
				klassFeaturesFeatureDistribution(after, character_info, source, {characterLevel})
			})

			character_info.statusConditions.forEach(sc => {
				let statusConditions = [...store.getState().character_info.statusConditions]
				let mappedSCs = [...statusConditions].map(c => c.condition)
				if (mappedSCs.includes(sc.condition)){
					statusConditions = statusConditions.filter(rsc => rsc.condition !== sc.condition)
				} else {
					statusConditions.push(sc)
				}
				activeFeatureAction(sc.source)
				adjustStatusConditionsAction(statusConditions)
				statusConditionDistribution(sc)
			})

		}

	}
}

export const websocketFeatureDistribution = (payload, source, options) => {
	let character_info = payload

	activeFeatureAction(source, options)

	if (payload.itemType){
		makeItemDiscovered(payload, source, options)
	} else {
		if (options.remove){
			character_info.bonuses.forEach(b => {
				bonusAction(b, true)
			})
		} else {
			character_info.bonuses.forEach(b => {
				bonusAction(b)
			})
		}
	}

}


export const klassFeaturesFeatureDistribution = (feature, obj, source, options) => {
	const { characterLevel, klassId, characterChoice } = options
	let classLevel = store.getState().character_info.classes?.find(cl => cl.id === klassId)?.level

  feature.skill_bonuses.forEach((el) => {
    obj.bonuses.push(skillBonusFeature(el, source))
  })
  feature.stat_bonuses.forEach((el) => {
		if (!el.applicable_level || el.applicable_level <= characterLevel){
			obj.bonuses.push(statBonusFeature(el, source))
		}
  })
  feature.movements.forEach((el) => {
    obj.movement.push(movementsFeature(el, source, feature.usage, feature.applications, feature.conditions))
  })
	feature.armor_proficiencies.forEach(el => {
		weaponArmorProficienciesFeature(el, source, obj.proficiencies.armor, { characterChoice })
	})
	feature.weapon_proficiencies.forEach(el => {
		weaponArmorProficienciesFeature(el, source, obj.proficiencies.weapon, { characterChoice })
	})
	feature.status_conditions.forEach(el => {
		obj.statusConditions.push(statusConditionsFeature(el, source))
	})
	feature.display_descriptions.forEach(el => {
		if (!el.applicable_level || el.applicable_level <= classLevel){
			obj.displayDescriptions.push(displayDescriptionsFeature(el, source))
		}
	})
	if (feature.animal && feature.animal.animal_type === "summoned"){
		modalAction("summonedAllies", feature.animal, {name: "Creature List"})
	}
}

const skillBonusFeature = (sk, source) => {
  const { skill_id, bonus, bonus_type, duration, bonus_multiplier, bonus_multiplier_based_on_feature_level, custom, minimum_bonus, round_down, specific_statistic } = sk
  return {
    type: 'skill',
    skill_id,
    bonus,
    bonus_type,
    duration,
		bonus_multiplier,
		bonus_multiplier_based_on_feature_level,
		custom,
		minimum_bonus,
		round_down,
		specific_statistic,
    source
  }
}

export const statBonusFeature = (sb, source) => {
  const { statistic, bonus, bonus_type, duration, specific_statistic, bonus_multiplier, bonus_multiplier_based_on_feature_level } = sb
  return {
    type: 'stat',
    statistic,
    bonus,
    bonus_type,
    duration,
    specific_statistic,
    bonus_multiplier,
		bonus_multiplier_based_on_feature_level,
    source
  }
}

const movementsFeature = (m, source, usage, applications, conditions) => {
  const { movement, feet, bonus, penalty, permanent } = m
  if (permanent){
    return {
      movement,
      feet,
      bonus,
      penalty,
      permanent,
      usage,
      applications,
      conditions,
      source
    }
  } else {
    return {}
  }
}

const weaponArmorProficienciesFeature = (wap, source, obj, options) => {
	if (options.characterChoice){
		if (wap.player_choice && wap[options.characterChoice.column] === null){
			wap[options.characterChoice.column] = parseInt(options.characterChoice.choice)
			source = {...source, characterChoiceId: options.characterChoice.id}
		}
	}

	if (wap.proficiency_group){
		obj.groups.push({ source, proficiency_group: wap.proficiency_group, additive: wap.additive })
	}
	if (wap.armor_id){
		obj.individualIds.push({ source, armor_id: wap.armor_id, additive: wap.additive })
	}
	if (wap.weapon_id){
		obj.individualIds.push({ source, weapon_id: wap.weapon_id, additive: wap.additive })
	}

}

const statusConditionsFeature = (sc, source) => {
	return {
		condition: sc.condition,
		source
	}
}

export const forbiddenFeature = (f, source) => {
	return {
		forbidden: f,
		source
	}
}

export const displayDescriptionsFeature = (dd, source) => {
	return {
		access_alignment: dd.access_alignment,
		description: dd.description,
		title: dd.title,
		source
	}
}
