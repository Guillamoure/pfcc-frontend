import Store from '../../store'

const { getState, dispatch } = Store

export const bonusAction = (bonus, remove = false) => dispatch({type: 'BONUS', bonus, remove})
export const addMovementAction = (movement) => dispatch({type: 'ADD MOVEMENT', movement})
export const proficiencyAction = (proficiencies) => dispatch({type: 'NEW PROFICIENCY', proficiencies})
export const activeFeatureAction = featureSource => dispatch({type: 'ACTIVE FEATURE', featureSource})
