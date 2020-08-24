import Store from '../../store'

const { getState, dispatch } = Store

export const bonusAction = (bonus, remove = false) => dispatch({type: 'BONUS', bonus, remove})
export const addMovementAction = (movement) => dispatch({type: 'ADD MOVEMENT', movement})
export const proficiencyAction = (proficiencies) => dispatch({type: 'NEW PROFICIENCY', proficiencies})
export const activeFeatureAction = featureSource => dispatch({type: 'ACTIVE FEATURE', featureSource})
export const addTemporaryHitPointsAction = tempHP => dispatch({type: 'ADD TEMP HP', tempHP})
export const removeTemporaryHitPointsAction = source => dispatch({type: 'REMOVE TEMP HP', source})
export const adjustStatusConditionsAction = conditions => dispatch({type: "ADJUST STATUS CONDITION", conditions})
export const forbiddenAction = (forbidden, remove = false) => dispatch({type: 'FORBIDDEN', forbidden, remove})
