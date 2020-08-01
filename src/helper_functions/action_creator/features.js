import Store from '../../store'

const { getState, dispatch } = Store

export const bonusAction = (bonus) => dispatch({type: 'BONUS', bonus})
