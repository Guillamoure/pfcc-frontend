const initialState = {
  currentUser: "",
  admin: false,
  character: {},
  character_info: {
    ability_scores: {},
    classes: [],
  },
  classes: [

  ],
  races: [

  ]
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case "SIGNIN":
      return {...state, currentUser: action.user, admin: action.admin};
    case "SIGNOUT":
      return {...state, currentUser: "", admin: false};
    case "CHARACTER":
      let classesCopy = state.character_info.classes
      let clearedCopy = classesCopy.map(cc => {
        let copiedClassInfo = {...cc}
        copiedClassInfo.castSpells = {}
        return copiedClassInfo
      })
      return {...state, character: action.character, character_info: {...state.character_info, classes: clearedCopy}};
    case "ABILITY SCORE":
      return {...state, character_info: {...state.character_info, ability_scores: {...state.character_info.ability_scores, [action.ability]: action.score}}};
    case "CHARACTER_CLASSES":
      return {...state, character_info: {...state.character_info, classes: action.classes}};
    // case "CLASSES":
    //   return {...state, classes: action.classes}
    case "EVERYTHING":
      return {...state, classes: action.classes, races: action.races};
    case "CAST CANTRIP SPA OR SPONTANEOUS SPELL":
      let updatedState = castingCantripSPASpontaneous(state, action)
      return {...state, character_info: updatedState};
    case "CAST PREPARED NONCANTRIP SPELL":
      let updatedPreparedSpellState = castingPrepared(state, action);
      return {...state, character: updatedPreparedSpellState};
    case "REMOVE PREPARED SPELL":
      return {...state, character: {...state.character, prepared_spells: action.newPreparedSpells}};
    case "PREPARE SPELLS":
      let preparedCopy = [...state.character.prepared_spells]
      action.spells.forEach(sp => preparedCopy.push(sp))
      return {...state, character: {...state.character, prepared_spells: preparedCopy}}
    default:
      return state
  }
}

const castingCantripSPASpontaneous = (state, action) => {
  // duplicate state
  let modifiedState = {...state.character_info}
  // find out which class you are modifying
  const klass = modifiedState.classes.find(cl => cl.id === action.spell.klass_id)
  // find out which level spell you cast
  const lvl = action.spell.spell_level
  // if redux doesn't have that spell level, create it. if not, update the value by one
  klass.castSpells[lvl] ? klass.castSpells[lvl] = klass.castSpells[lvl] + 1 : klass.castSpells[lvl] = 1
  // merge changes into duplicate of state
  modifiedState.classes.map(cl => cl.id === klass.id ? klass : cl)
  return modifiedState
}

const castingPrepared = (state, action) => {
  // duplicate state
  let modifiedState = {...state.character}
  // loop though all the character's prepared spells
  let modifiedPrepared = modifiedState.prepared_spells.map(cs => {
    // find the cast spell within the character's prepared spells
    if (cs.id === action.spell.id){
      // return the updated cast spell
      return action.spell
    } else {
      // otherwise, return the original spell
      return cs
    }
  })
  modifiedState.prepared_spells = modifiedPrepared
  return modifiedState
}

export default reducer;
