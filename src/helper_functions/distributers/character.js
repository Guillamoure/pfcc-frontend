import {
  characterAction,
  characterClassesAction,
  abilityScoreAction,
  abilityScoreImprovementAction
} from '../action_creator/character'
import {
  dispatchClassLevels,
  renderAbilityScoreCalc
} from '../calculations/character'
import { initialCharacterDistribution } from './features'


export const characterDistributer = (character) => {
  characterAction(character)

  abilityScoreAction(renderAbilityScoreCalc("Strength", character))
  abilityScoreAction(renderAbilityScoreCalc("Dexterity", character))
  abilityScoreAction(renderAbilityScoreCalc("Constitution", character))
  abilityScoreAction(renderAbilityScoreCalc("Intelligence", character))
  abilityScoreAction(renderAbilityScoreCalc("Wisdom", character))
  abilityScoreAction(renderAbilityScoreCalc("Charisma", character))

  characterClassesAction(dispatchClassLevels(character))

  character.character_klasses.forEach(lvl => {
    if (lvl.ability_score_improvement){
      abilityScoreImprovementAction(lvl.ability_score_improvement)
    }
  })

  initialCharacterDistribution(character)
}
