import Store from '../../store'

const { getState, dispatch } = Store

export const startWebsocketAction = websocket => dispatch({type: "START WEBSOCKET", websocket})
export const subscribeAction = websocket => dispatch({type: "SUBSCRIBE WEBSOCKET", websocket})
