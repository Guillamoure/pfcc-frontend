import Store from '../../store'

const { getState, dispatch } = Store

export const updateNotificationsAction = notifications => dispatch({type: "UPDATE NOTIFICATIONS", notifications})
