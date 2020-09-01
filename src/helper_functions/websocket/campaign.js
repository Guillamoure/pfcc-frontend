import store from '../../store'
import * as WebsocketAction from '../action_creator/websocket'
import { websocketFeatureDistribution } from '../distributers/features'
import { updateNotificationsAction, updateStoredNotificationsAction } from '../action_creator/popups'
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
				websocket.campaign.send({character_id: character.id, message: `My name is ${character.name}`})
			},
			received: data => {
				console.log("received websocket data", data.data)
				parseSentCampaignData(data.data)
			}
		})

	WebsocketAction.subscribeAction(websocket)
}

export const sendCampaignWebsocket = (payload, source, options) => {
	// NEW DATA
	// STORED DATA
	// CALCULATED DATA
	const { websocket, character } = {...store.getState()}
	websocket.campaign.send({sender_id: character.id, payload, source, options})
}

const parseSentCampaignData = data => {
	let { sender_id, payload, source, options } = data
	if (sender_id){
		const { character, notifications, storedNotifications } = store.getState()
		if (sender_id === character.id) {return null}
		let sender = character.campaign.characters.find(ch => ch.id === sender_id)


		// distribute feature
		if (!options.toggleable){
			websocketFeatureDistribution(payload, {...source, senderName: sender.name, senderId: sender_id}, options)
		}

		// craft message for notification
		if (options.remove){
			// remove active notification
			// remove stored notification
			// display new notification
			let updatedNotifications = [...notifications]
			updatedNotifications = updatedNotifications.filter(n => !n.message.includes(sender.name) && !n.message.includes(source.sourceName))
			let message = `${sender.name} revoked the abilities of ${source.sourceName}.`
			let notification = {message}

			updatedNotifications.push(notification)
			updateNotificationsAction(updatedNotifications)

			let updatedStoredNotifications = [...storedNotifications]
			updatedStoredNotifications = updatedStoredNotifications.filter(usn => usn.source.sourceName !== source.sourceName && usn.source.senderName !== sender.name)

			updateStoredNotificationsAction(updatedStoredNotifications)

		} else {
			let updatedNotifications = [...notifications]
			let message = `${sender.name} gave you the abilities of ${source.sourceName}.`
			if (options.toggleable){message += " Are you able to accept it?"}
			let notification = {message}
			if (options.toggleable){notification.toggleable = {payload, source:{...source, senderName: sender.name, senderId: sender_id}, options}}

			updatedNotifications.push(notification)
			updateNotificationsAction(updatedNotifications)
		}
		// don't distribute inherently if there is a togglable attribute
	}
}
