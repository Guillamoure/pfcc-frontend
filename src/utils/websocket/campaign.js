import store from '../../store'
import * as WebsocketAction from '../action_creator/websocket'
import { websocketFeatureDistribution } from '../distributers/features'
import { updateNotificationsAction, updateStoredNotificationsAction } from '../action_creator/popups'
import { incorporateItemToCharacter } from './dm_item'
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

export const initializeCampaignWebsocket = async (character, options) => {
	// NEW DATA
	let websocketCode

	// STORED DATA
	let websocket = {...store.getState().websocket}
	if (options?.dm){
		websocketCode = options.websocketCode
	} else {
		websocketCode = character.campaign?.websocket_code
	}

	// CALCULATED DATA

	if (websocket.cable === undefined){
		return null
	}


	websocket.campaign =
		await {...websocket}.cable.subscriptions.create({
			channel: "CampaignsChannel",
			campaign_code: websocketCode
		}, {
			connected: () => {
				console.log("connected!")
				console.log(websocket)
				if (character){
					websocket.campaign.send({character_id: character.id, message: `My name is ${character.name}`})
				}
				if (options?.dm){
					websocket.campaign.send({message: "Hey, the DM is here!"})
				}
				// else if (options.encounter){
				// 	// websocket.campaign.send({message: "Initiating Encounter!"})
				// 	if (options.askForInitiative){
				// 		websocket.campaign.send({options: {askForInitiative: true}})
				// 	}
				// }
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
	console.log("CATCHING OUTGOING CONNECTIONS", payload)

	websocket.campaign.send({sender_id: character.id, payload, source, options})
}

const parseSentCampaignData = data => {
	console.log("CATCHING INCOMING CONNECTIONS", data)

	let { sender_id, payload, source, options } = data
	const { character, notifications, storedNotifications } = store.getState()

	if (sender_id){
		if (sender_id === character.id) {return null}

		if (payload.participatingPlayer && !character.id){return incomingCharacter(data)}

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
		// don't distribute inherently if there is a toggleable attribute
	} else if (payload?.askForInitiative){
		const { character, notifications, storedNotifications } = store.getState()

		if (character.id){
			console.log(payload, source)
			sendCampaignWebsocket({participatingPlayer: true, name: character.name})

			let updatedNotifications = [...notifications]
			let notification = {message: payload.message}
			updatedNotifications.push(notification)

			updateNotificationsAction(updatedNotifications)
		}
	} else if (source?.dm){
		console.log("MADE CONTACT FROM THE DM")
		// if a message is meant just for you
		if (payload.reciever_id === character.id){
			// if an item is know known
			let updatedNotifications = [...notifications]
			if (options?.knownItem){
				let notification = { message: payload.message }
				updatedNotifications.push(notification)
				updateNotificationsAction(updatedNotifications)

				incorporateItemToCharacter(payload, source, options)
				// if the message includes a present
			} else if (payload.itemType){

				let message = "The DM gave you an item!"
				let notification = { message }
				if (options.toggleable){notification.toggleable = {payload, source:{...source}, options: {...options, acceptOnly: true}}}

				updatedNotifications.push(notification)
				updateNotificationsAction(updatedNotifications)
				// add item to character's redux
				incorporateItemToCharacter(payload, source, options)
				// be able to accept the item from the notification (which'll make the item discovered)

			}
		}
	}
}

const incomingCharacter = ({ sender_id, payload, source, options }) => {

}
