import store from '../../store'
import WebsocketAction from '../action_creator/websocket'
// 	this.props.cableApp.room =
// 		this.props.cableApp.cable.subscriptions.create({
// 			channel: "RoomChannel",
// 			room: "1"
// 		}, {
// 			received: (data) => {
// 				console.log(data)
// 			},
// 			connected: () => console.log("connected!")
// 		})

export const initializeCampaignWebsocket = async (character) => {
	// NEW DATA

	// STORED DATA
	let websocket = {...store.getState().websocket}
	const websocketCode = character.campaign.websocket_code

	// CALCULATED DATA

	// let addedSubscriptionWebsocket =
	websocket.campaign =
		await {...websocket}.cable.subscriptions.create({
			channel: "CampaignsChannel",
			campaign_code: websocketCode
		}, {
			connected: () => {
				console.log("connected!")
				console.log(websocket)
				websocket.campaign.send({sentData: "does this work?"})
			},
			received: data => console.log(data)
		})


}
