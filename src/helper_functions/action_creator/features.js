import Store from '../../store'

const { getState, dispatch } = Store

export const bonusAction = (bonus) => dispatch({type: 'BONUS', bonus})
export const addMovementAction = (movement) => dispatch({type: 'ADD MOVEMENT', movement})
