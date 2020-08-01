import {
  bonusAction
} from '../action_creator/features'

export const initialCharacterDistribution = (character) => {
  let character_info = {
    bonuses: [],
    effects: [],
    features: [],
    proficiencies: {}
  }

  // racial traits
  // klass features
  character.applicable_klass_features.forEach(akf => {
    akf.features.forEach((el) => klassFeaturesFeatureDistribution(el, character_info, { id: el.id, type: "applicable_klass_features" }))
  })

  // weapon
  // armor
  // magic items
  character.character_magic_items.forEach(cmi => {
    cmi.magic_item.features.forEach((el) => klassFeaturesFeatureDistribution(el, character_info, { id: cmi.id, type: "character_magic_items" }))
  })


  character_info.bonuses.forEach(b => {
    bonusAction(b)
  })
}

const klassFeaturesFeatureDistribution = (feature, character_info, source) => {
  feature.skill_bonuses.forEach((el) => {
    character_info.bonuses.push(skillBonusFeature(el, source))
  })
  feature.stat_bonuses.forEach((el) => {
    character_info.bonuses.push(statBonusFeature(el, source))
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
