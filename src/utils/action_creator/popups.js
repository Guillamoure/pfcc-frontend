import Store from '../../store'

const { getState, dispatch } = Store

export const modalAction = (detail, obj, options) => dispatch({type: "MODAL", detail, obj, options})
export const exitModalAction = () => ({type: "MODAL", remove: true})
export const updateNotificationsAction = notifications => dispatch({type: "UPDATE NOTIFICATIONS", notifications})
export const updateStoredNotificationsAction = notifications => dispatch({type: "UPDATE STORED NOTIFICATIONS", notifications})
export const tooltipAction = (message, target) => dispatch({type: "TOOLTIP", message, target})
export const diceAction = (obj) => dispatch({type: "ADD DICE", obj})
