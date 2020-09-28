import Store from '../../store'

const { getState, dispatch } = Store

export const modalAction = (detail, obj, remove) => dispatch({type: "MODAL", detail, obj, remove})
export const exitModalAction = () => ({type: "MODAL", remove: true})
export const updateNotificationsAction = notifications => dispatch({type: "UPDATE NOTIFICATIONS", notifications})
export const updateStoredNotificationsAction = notifications => dispatch({type: "UPDATE STORED NOTIFICATIONS", notifications})
export const tooltipAction = (message, target) => dispatch({type: "TOOLTIP", message, target})
