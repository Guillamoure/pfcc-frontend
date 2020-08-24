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
import { statusConditionDistribution, removeStatusConditionDistribution } from  './status_conditions'

export const defaultCharacterInfo = () => {
	return {
    bonuses: [],
    effects: [],
    features: [],
		forbidden: [],
    proficiencies: { weapon: {groups: [], individualIds: []}, armor: {groups: [], individualIds: []} },
    movement: [],
		statusConditions: []
  }
}

export const initialCharacterDistribution = (character) => {
	// NEW DATA
  let character_info = defaultCharacterInfo()

  // racial traits
  // klass features
  character.applicable_klass_features.forEach(akf => {
    akf.features.forEach((feature) => {
      if (!feature.action){
        klassFeaturesFeatureDistribution(feature, character_info, { sourceId: akf.id, source: "applicable_klass_features", featureId: feature.id })
      }
    })
  })

  // weapon
  // armor
  // magic items
  character.character_magic_items.forEach(cmi => {
    cmi.magic_item.features.forEach((feature) => {
      if (!feature.action){
        klassFeaturesFeatureDistribution(feature, character_info, { sourceId: cmi.id, source: "character_magic_items", featureId: feature.id })
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
}


export const featureDistribution = (feature) => {
	// NEW DATA
	let character_info = defaultCharacterInfo()
	let source = {featureId: feature.id, sourceId: feature.sourceId, source: feature.source}

	// STORED DATA
	let activeFeatures = store.getState().character_info.activeFeatures
	let oldActiveFeaturesLength = activeFeatures.length

	// go through the feature, and add it to character_info
	klassFeaturesFeatureDistribution(feature, character_info, source)

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
	} else {
		// if removed
		character_info.bonuses.forEach((b) => {
			if (b.statistic === "Hit Points" && b.bonus_type === "temporary"){
				removeTemporaryHitPointsAction(b.source)
			} else {
				bonusAction(b, true)
			}
		})
		character_info.statusConditions.forEach(sc => {
			let statusConditions = [...store.getState().character_info.statusConditions]
			statusConditions = statusConditions.filter(c => c.condition !== sc.condition)
			adjustStatusConditionsAction(statusConditions)
			removeStatusConditionDistribution(sc)
		})
		// AFTER THE MAIN FEATURE HAS ENDED
		// LOOK FOR ANY AFTER EFFECTS
		if (!feature.after){
			let featureSource = store.getState().character[feature.source].find(ability => ability.id === feature.sourceId)
			let featureSourceFeaturesAfter = featureSource.features.filter(fs => fs.after)

			character_info = defaultCharacterInfo()

			featureSourceFeaturesAfter.forEach(after => {
				source = {featureId: after.id, sourceId: feature.sourceId, source: feature.source}
				klassFeaturesFeatureDistribution(after, character_info, source)
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


const klassFeaturesFeatureDistribution = (feature, obj, source) => {
  feature.skill_bonuses.forEach((el) => {
    obj.bonuses.push(skillBonusFeature(el, source))
  })
  feature.stat_bonuses.forEach((el) => {
    obj.bonuses.push(statBonusFeature(el, source))
  })
  feature.movements.forEach((el) => {
    obj.movement.push(movementsFeature(el, source, feature.usage, feature.applications, feature.conditions))
  })
	feature.armor_proficiencies.forEach(el => {
		weaponArmorProficienciesFeature(el, source, obj.proficiencies.armor)
	})
	feature.weapon_proficiencies.forEach(el => {
		weaponArmorProficienciesFeature(el, source, obj.proficiencies.weapon)
	})
	feature.status_conditions.forEach(el => {
		obj.statusConditions.push(statusConditionsFeature(el, source))
	})
}

const skillBonusFeature = (sk, source) => {
  const { skill_id, bonus, bonus_type, duration } = sk
  return {
    type: 'skill',
    skill_id,
    bonus,
    bonus_type,
    duration,
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

const weaponArmorProficienciesFeature = (wap, source, obj) => {

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
