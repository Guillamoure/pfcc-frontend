const initialState = {
  currentUser: "",
  admin: false,
  character: {},
  character_info: {
    ability_scores: []
  }
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
    case "CLASSES":
      return {...state, character_info: {...state.character_info, classes: action.classes}};
    default:
      return state
  }


}

export default reducer;
