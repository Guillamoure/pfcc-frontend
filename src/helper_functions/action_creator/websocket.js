import Store from '../../store'

const { getState, dispatch } = Store

export const startWebsocketAction = websocket => dispatch({type: "START WEBSOCKET", websocket})
// export subscribeAction = (channel, uuid)
