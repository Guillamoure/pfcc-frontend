import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDungeon} from '@fortawesome/free-solid-svg-icons'
import { doWeNeedAYellowNotification } from '../../utils/notifications/yellow_notification'
import { doWeNeedARedNotification } from '../../utils/notifications/red_notification'

const NotificationDoor = props => {

	const greenBadge = () => {
		let badge = false
		let cmis = props.character?.character_magic_items || []
		cmis.forEach(cmi => {
			if (!cmi.discovered){
				badge = true
			}
		})
		return badge
	}

	const yellowBadge = () => {
		// let badge = false
		//
		// let prepared = false
		// this.props.character_info.classes.forEach(cl => {
		//   if (cl.spellcasting && cl.spellcasting.prepared){
		//     prepared = true
		//   }
		// })
		// badge = prepared ? (!this.props.character.is_done_preparing_spells ? true : badge) : badge
		// return badge
		return doWeNeedAYellowNotification()
	}

	const redBadge = () => {
		return doWeNeedARedNotification()
	}

	return (
		<span style={{marginLeft: "1vw"}}>
			<div className='notification'>
				{greenBadge() && <span className='badge green-badge'></span>}
				{yellowBadge() && <span className='badge yellow-badge'></span>}
				{redBadge() && <span className='badge red-badge'></span>}
				<FontAwesomeIcon icon={faDungeon} size='3x' onClick={() => props.editModal('notifications')} />
			</div>
		</span >
	)
}

export default NotificationDoor
