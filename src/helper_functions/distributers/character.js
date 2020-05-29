import {
  characterAction,
  characterClassesAction,
  abilityScoreAction
} from '../action_creator/character'
import {
  dispatchClassLevels,
  renderAbilityScoreCalc
} from '../calculations/character'


export const characterDistributer = (character) => {
  characterAction(character)

  abilityScoreAction(renderAbilityScoreCalc("Strength", character))
  abilityScoreAction(renderAbilityScoreCalc("Dexterity", character))
  abilityScoreAction(renderAbilityScoreCalc("Constitution", character))
  abilityScoreAction(renderAbilityScoreCalc("Intelligence", character))
  abilityScoreAction(renderAbilityScoreCalc("Wisdom", character))
  abilityScoreAction(renderAbilityScoreCalc("Charisma", character))
  
  characterClassesAction(dispatchClassLevels(character))
}
