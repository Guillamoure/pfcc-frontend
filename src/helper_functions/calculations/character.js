import _ from 'lodash'

export const dispatchClassLevels = (character) => {
  let cKArray = []
  let completedClasses = []
  character.character_klasses.forEach(cK => {
    const id = cK.klass_id
    if (!completedClasses.includes(id)){
      let characterKlass = character.character_klasses.filter(ck => ck.klass_id === id)
      const level = characterKlass.length
      let klass = character.uniq_klasses.find(k => k.id === id)

      completedClasses.push(id)
      const classInfo = {id, level}

      // changing fetch data, this part is not applicable with starting fetch

      let spellsFeature = klass.klass_features.find(f => f.name === 'Spells' || f.name === 'Alchemy')
      let spellcasting = spellsFeature ? spellsFeature.spellcasting : null

      // look to see if there are any cast spells for the given class
      const castSpellsForThisClass = character.cast_spells.filter(cs => cs.klass_id === id)
      // if (castSpellsForThisClass[0]){
      const castSpells = {}
      const transformedCastSpellsToLevelCast = castSpellsForThisClass.map(cs => cs.spell_level)
      transformedCastSpellsToLevelCast.forEach(lvl => {
        castSpells[lvl] ? castSpells[lvl] = castSpells[lvl] + 1 : castSpells[lvl] = 1
      })
      classInfo.castSpells = castSpells
      classInfo.spellcasting = spellcasting
      // hardcoded start
      let name = character.name
        if (name === "Nettie" || name === "Persephone" || name === "Maddox"){
          classInfo.spellcastingAbility = 'intelligence'
        } else if (name === "Sylvester"){
          classInfo.spellcastingAbility = 'charisma'
        }
      // hardcoded end
      // }

      // relocate to a new function when data is applcable

      cKArray.push(classInfo)
    }
  })
  // debugger
  return cKArray
  // dispatch({type: 'CHARACTER_CLASSES', classes: cKArray})
}

export const renderAbilityScoreCalc = (ability, character) => {
  const downcaseAbility = _.lowerCase(ability)
  let score = character[downcaseAbility]
  character.race.race_ability_score_modifiers.forEach(mod => {
    if (ability === mod.ability_score){
      score += mod.bonus
    }
  })
  if (character.any_bonus === ability){
    score +=2
  }
  return { ability: downcaseAbility, score }
}
