import actionCable from 'actioncable'
import websocket from '../../websocket'
import { startWebsocketAction } from '../action_creator/websocket'

const Initialization = () => {
	const Websocket = {}
	Websocket.cable = actionCable.createConsumer(`${websocket}/cable`)

	startWebsocketAction(Websocket)
}
// Initialization is used in index.js

export default Initialization
