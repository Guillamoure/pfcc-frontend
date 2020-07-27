import {
  skillBonusAction
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
    akf.features.forEach((el) => klassFeaturesFeatureDistribution(el, character_info, { id: akf.id, type: "applicable_klass_features" }))
  })
  // weapon
  // armor
  // magic items
  character.character_magic_items.forEach(cmi => {
    cmi.magic_item.features.forEach((el) => klassFeaturesFeatureDistribution(el, character_info, { id: cmi.id, type: "character_magic_items" }))
  })
  console.log(character_info)
}

const klassFeaturesFeatureDistribution = (feature, character_info, source) => {
  feature.skill_bonuses.forEach((el) => {
    character_info.bonuses.push(skillBonusFeature(el, source))
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
