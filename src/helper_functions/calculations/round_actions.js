import store from '../../store'

export const isThisActionAvailable = (action) => {
	// 	STORED DATA
	let actions = store.getState().character_info.actions

	// CALCULATED DATA
	action = actionClass(action.name)

	// if you are trying to do a standard, move, or swift, and you've already used your full
	// cannot use the action
	if ((action === 'standard' || action  === 'move' || action === 'swift') && actions.full){
		return 'cannot-cast'
	// if you are trying to do a full, and you've already used your standard, move, or swift
	// cannot use the action
	} else if (action === 'full' && (actions.standard || actions.move || actions.swift)){
		return 'cannot-cast'
	// if you've already used the action
	// cannot use the action
	} else if (actions[action]){
		return 'cannot-cast'
	} else {
		return action
	}

}

export const actionClass = a => {
  switch(a){
    case 'Standard Action':
      return 'standard'
    case 'Swift Action':
      return 'swift'
    case 'Move Action':
      return 'move'
    case 'Full-Round Action':
      return 'full'
    case 'Immediate Action':
      return 'immediate'
    case 'Free Action':
      return 'free'
    default:
      return a
  }
}
