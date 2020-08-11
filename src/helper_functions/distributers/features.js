import {
  bonusAction,
  addMovementAction,
	proficiencyAction
} from '../action_creator/features'

export const initialCharacterDistribution = (character) => {
  let character_info = {
    bonuses: [],
    effects: [],
    features: [],
    proficiencies: { weapon: {groups: [], individualIds: []}, armor: {groups: [], individualIds: []} },
    movement: []
  }

  // racial traits
  // klass features
  character.applicable_klass_features.forEach(akf => {
    akf.features.forEach((feature) => {
      if (!feature.action){
        klassFeaturesFeatureDistribution(feature, character_info, { id: akf.id, type: "applicable_klass_features", feature_id: feature.id })
      }
    })
  })

  // weapon
  // armor
  // magic items
  character.character_magic_items.forEach(cmi => {
    cmi.magic_item.features.forEach((feature) => {
      if (!feature.action){
        klassFeaturesFeatureDistribution(feature, character_info, { id: cmi.id, type: "character_magic_items", feature_id: feature.id })
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

const klassFeaturesFeatureDistribution = (feature, character_info, source) => {
  feature.skill_bonuses.forEach((el) => {
    character_info.bonuses.push(skillBonusFeature(el, source))
  })
  feature.stat_bonuses.forEach((el) => {
    character_info.bonuses.push(statBonusFeature(el, source))
  })
  feature.movements.forEach((el) => {
    character_info.movement.push(movementsFeature(el, source, feature.usage, feature.applications, feature.conditions))
  })
	feature.armor_proficiencies.forEach(el => {
		armorProficienciesFeature(el, source, character_info.proficiencies.armor)
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

const statBonusFeature = (sb, source) => {
  const { statistic, bonus, bonus_type, duration, specific_statistic, bonus_multiplier } = sb
  return {
    type: 'stat',
    statistic,
    bonus,
    bonus_type,
    duration,
    specific_statistic,
    bonus_multiplier,
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

const armorProficienciesFeature = (ap, source, armorObj) => {

	if (ap.proficiency_group){
		armorObj.groups.push({source, proficiency_group: ap.proficiency_group, additive: ap.additive })
	}
	if (ap.armor_id){
		armorObj.individualIds.push({source, armor_id: ap.armor_id, additive: ap.additive })
	}

}
