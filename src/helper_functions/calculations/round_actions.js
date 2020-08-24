import store from '../../store'
import { remainingUsage } from './feature_usage'
import _ from 'lodash'

export const isThisActionAvailable = (feature) => {
	// 	STORED DATA
	let action = feature.action
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
	// if there are no points left
	// cannot use the action
	} else if (!remainingUsage(feature)) {
		return 'cannot-cast'
	} else if (sharingConditions(feature)) {
		return 'cannot-cast'
	// if the cost of this feature is higher than the remaining points
	// cannot use the action
	}	else {
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

export const sharingConditions = feature => {
	let statusConditions = store.getState().character_info.statusConditions.map(c => c.condition.toLowerCase())
	let preventativeConditions = feature.conditions.filter(c => c.if_affected_by_condition).map(c => c.if_affected_by_condition.toLowerCase())
	return _.intersection(statusConditions, preventativeConditions).length ? true : false
}
