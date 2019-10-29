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
      return {...state, classes: action.classes, races: action.races}
    case "CAST SPELL":
      return {...state, character_info: action.character_info};
    case "ALL CAST SPELLS":
      return {...state, character_info: action.character_info};
    default:
      return state
  }


}

export default reducer;
