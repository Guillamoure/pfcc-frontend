const initialState = {
  currentUser: "",
  admin: false
}


const reducer = (state = initialState, action) => {
  console.log('State Changer is called')
  console.log('current state is', state)
  console.log('the action is', action)

  switch(action.type){
    case "SIGNIN":
      return {...state, currentUser: action.user, admin: action.admin};
    case "SIGNOUT":
      return {...state, currentUser: "", admin: false};
    default:
      return state
  }


}

export default reducer;
