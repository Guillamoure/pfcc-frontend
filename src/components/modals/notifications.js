import React from 'react'
import { useSelector } from 'react-redux'
import { updateNotificationsAction, updateStoredNotificationsAction } from '../../helper_functions/action_creator/popups'
import { websocketFeatureDistribution } from '../../helper_functions/distributers/features'


const Notifications = props => {

	const { notifications, storedNotifications } = useSelector(state => state)

	const renderNotifications = () => {
		return notifications.map((n, i) => {
			let toggleable = null
			if (n.toggleable){
				toggleable = <><button onClick={() => renderDistribution(n.toggleable, i)}>Accept</button><button onClick={() => storeNotification(n.toggleable, i)}>Reject</button></>
			}
			return (
				<li className="popup-notification">
					<button className="popup-notification-close-button" onClick={() => renderExit(i)}>x</button>
					{n.message}
					{toggleable}
				</li>
			)
		})
	}

	const renderExit = (index) => {
		let updatedNotifications = [...notifications]
		updatedNotifications.splice(index, 1)
		updateNotificationsAction(updatedNotifications)
	}

	const storeNotification = (data, index) => {
		let updateStoredNotifications = [...storedNotifications]
		updateStoredNotifications.push(data)
		updateStoredNotificationsAction(updateStoredNotifications)
		renderExit(index)
	}

	const renderDistribution = (data, index) => {
		const { payload, source, options } = data
		websocketFeatureDistribution(payload, source, options)
		renderExit(index)
	}


	return (
		<aside id="popup-notifications-container">
			{renderNotifications()}
		</aside>
	)

}
export default Notifications
