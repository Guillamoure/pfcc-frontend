import Store from '../../store'

const { getState, dispatch } = Store

export const skillBonusAction = (bonus) => dispatch({type: 'BONUS', bonus})
