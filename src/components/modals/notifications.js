import React from 'react'
import { useSelector } from 'react-redux'
import { updateNotificationsAction } from '../../helper_functions/action_creator/popups'


const Notifications = props => {

	const { notifications } = useSelector(state => state)

	const renderNotifications = () => {
		return notifications.map((n, i) => {
			return (
				<li className="popup-notification">
					{n.message}
					<button className="popup-notification-close-button" onClick={() => renderExit(i)}>x</button>
				</li>
			)
		})
	}

	const renderExit = (index) => {
		let updatedNotifications = [...notifications]
		updatedNotifications.splice(index, 1)
		updateNotificationsAction(updatedNotifications)
	}

	return (
		<aside id="popup-notifications-container">
			{renderNotifications()}
		</aside>
	)

}
export default Notifications
