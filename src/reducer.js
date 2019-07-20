const initialState = {
  currentUser: "",
  admin: false,
  character: {}
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case "SIGNIN":
      return {...state, currentUser: action.user, admin: action.admin};
    case "SIGNOUT":
      return {...state, currentUser: "", admin: false};
    case "CHARACTER":
      return {...state, character: action.character}
    default:
      return state
  }


}

export default reducer;
