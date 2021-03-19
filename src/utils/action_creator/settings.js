import Store from '../../store'

const { getState, dispatch } = Store

export const updateColorThemeAction = (obj) => dispatch({type: "UPDATE COLOR THEME", obj})
