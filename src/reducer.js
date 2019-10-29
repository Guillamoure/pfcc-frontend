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
      return {...state, character: action.character};
    case "ABILITY SCORE":
      return {...state, character_info: {...state.character_info, ability_scores: {...state.character_info.ability_scores, [action.ability]: action.score}}};
    case "CHARACTER_CLASSES":
      return {...state, character_info: {...state.character_info, classes: action.classes}};
    // case "CLASSES":
    //   return {...state, classes: action.classes}
    case "EVERYTHING":
      return {...state, classes: action.classes, races: action.races};
    case "CAST SPELL":
      const updatedState = castingSpells(state, action)
      return {...state, character_info: updatedState};
    default:
      return state
  }


}

const castingSpells = (state, action) => {
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

export default reducer;
