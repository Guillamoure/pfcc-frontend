import {
  skillBonusAction
} from '../action_creator/features'

export const initialCharacterDistribution = (character) => {
  // racial traits
  // klass features
  character.applicable_klass_features.forEach(akf => {
    akf.features.forEach(klassFeaturesFeatureDistribution)
  })
  // weapon
  // armor
  // magic items
  character.character_magic_items.forEach(cmi => {
    cmi.magic_item.features.forEach(klassFeaturesFeatureDistribution)
  })
}

const klassFeaturesFeatureDistribution = (feature) => {
  feature.skill_bonuses.forEach(skillBonusFeature)
}

const skillBonusFeature = (sk) => {
  const { skill_id, bonus, bonus_type, duration } = sk
  const obj = {
    type: 'skill',
    skill_id,
    bonus,
    bonus_type,
    duration,
    source: "does this work?"
  }
  skillBonusAction(obj)
}
