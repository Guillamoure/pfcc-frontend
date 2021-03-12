import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { modalAction } from '../../utils/action_creator/popups'
import _ from 'lodash'


const Details = props => {

  const [mobileDisplayDetails, setMobileDisplayDetails] = React.useState(false);


  const languages = (name) => {
    let knownLanguages = []
    switch(name){
      case "Nettie":
        knownLanguages = ["Common", "Draconic", "Aklo", "Infernal", "Sylvan", "Terran", "Undercommon", "Abyssal", "Celestial", "Sphinx", "Auran"]
        break
      case "Cedrick":
        knownLanguages = ["Common", "Grippli", "Druidic", "Infernal", "Draconic", "Sylvan"]
        break
      case 'Maddox':
        knownLanguages = ["Common", "Samsaran", 'Celestrial, Infernal', 'Protean', 'Aklo', 'Draconic', 'Sphinx', 'Elven', 'Gnome', 'Abyssal', 'Sylvan', 'Drow']
        break
      case 'Merg':
        knownLanguages = ['Common', 'Orc', 'Sylvan', 'Terran', 'Draconic', 'Giant', 'Undercommon']
        break
      case 'Robby':
        knownLanguages = ['Common', 'Aquan', 'Auran', 'Ignan', 'Halfling (Jabberjaw Gem)', 'Abyssal (Jabberjaw Gem)', 'Dwarven (Jabberjaw Gem)', 'Sylvan (Jabberjaw Gem)', 'Undercommon (Jabberjaw Gem)']
        break
      case 'Fire-Roasted Tomatoes':
        knownLanguages = ['Common', 'Sylvan', 'Aklo']
        break
      case 'Ildre':
        knownLanguages = ['Common', 'Goblin', 'Draconic', "Elven", "Undercommon", "Sylvan", "Abyssal"]
        break
      case 'Iyugi':
        knownLanguages = ['Common', "Elven", "Sylvan"]
        break
      case 'Natesse':
        knownLanguages = ['Common', "Hexadecimal", "Elven", "Goblin", "Draconic"]
        break
      case "Dz'eyn":
        knownLanguages = ['Common', "Grippli", "Aquan", "Read Lips"]
        break
      case "Dink Weatherbyrst":
        knownLanguages = ['Common', "Gnome"]
        break
      default:
        break
    }
    props.character_info.effects.forEach(e => {
      if (e.type === 'language'){
        knownLanguages.push(!!e.note.length ? `${e.language} (${e.note})` : e.language)
      }
    })
    return knownLanguages
  }

	const renderDisplayDescription = () => {
		const { displayDescriptions } = props.character_info

		return displayDescriptions.map(dd => {
			let description = dd.description
			if (dd.access_alignment){
				description += ` ${_.startCase(props.character.alignment)}`
			}
			return <li><strong>{dd.title}</strong>: {description}</li>
		})
	}

  if (localStorage.computer === "true"){
    return(
      <>
        <span className='header'>Background</span>
        {props.character.user_id === props.currentUser.id && <span className='edit' onClick={() => props.editModal('background')}><FontAwesomeIcon icon={faPencilAlt} /></span>}
          <div className='nested'>
            <div><strong>Full Name:</strong> {props.character.full_name}</div>
            <div><strong>Background:</strong> {props.character.background}</div>
            <div><strong>Age:</strong> {props.character.age}</div>
            <div><strong>Size:</strong> {props.character.race.size}</div>
            <div><strong>Alignment:</strong> {props.character.alignment}</div>
            <div><strong>Deity:</strong> {props.character.deity}</div>
            <div><strong>Homeland:</strong> {props.character.homeland}</div>
          </div>
        <div className='header'>Appearance</div>
          <div className='nested'>
            <div><strong>Description:</strong> {props.character.description}</div>
            <div><strong>Gender:</strong> {props.character.gender}</div>
            <div><strong>Hair:</strong> {props.character.hair}</div>
            <div><strong>Eyes:</strong> {props.character.eyes}</div>
            <div><strong>Height:</strong> {props.character.height}</div>
            <div><strong>Weight:</strong> {props.character.weight}</div>
          </div>
        <div className='header'>Languages</div>
          <div className='nested'>
          {languages(props.character.name).join(", ")}
          </div>
				<div className='header'>Statistics</div>
					<div className='nested'>
						{renderDisplayDescription()}
					</div>
      </>
    )
  } else if (localStorage.computer === "false"){
    let titleWidth = mobileDisplayDetails ? '85%' : '100%'
    return (
      <>
        <section className='mobile-feature-tab'>
          <span style={{display: 'inline-block', width: titleWidth}} onClick={() => setMobileDisplayDetails(true)}>Character Details </span>
          {mobileDisplayDetails && <span><button className='mobile-close-button' onClick={() => setMobileDisplayDetails(false)}>X</button></span>}
          {mobileDisplayDetails &&
            <section style={{maxHeight: `${window.outerHeight * 0.25}px`, overflow: 'scroll'}}>
              <div className='header'>Background</div>
              <div className='nested'>
                <div><strong>Full Name:</strong> {props.character.full_name}</div>
                <div><strong>Background:</strong> {props.character.background}</div>
                <div><strong>Age:</strong> {props.character.age}</div>
                <div><strong>Size:</strong> {props.character.race.size}</div>
                <div><strong>Alignment:</strong> {props.character.alignment}</div>
                <div><strong>Deity:</strong> {props.character.deity}</div>
                <div><strong>Homeland:</strong> {props.character.homeland}</div>
              </div>
              <div className='header'>Appearance</div>
                <div className='nested'>
                  <div><strong>Description:</strong> {props.character.description}</div>
                  <div><strong>Gender:</strong> {props.character.gender}</div>
                  <div><strong>Hair:</strong> {props.character.hair}</div>
                  <div><strong>Eyes:</strong> {props.character.eyes}</div>
                  <div><strong>Height:</strong> {props.character.height}</div>
                  <div><strong>Weight:</strong> {props.character.weight}</div>
                </div>
              <div className='header'>Languages</div>
              <div className='nested'>
              {languages(props.character.name).join(", ")}
              </div>
            </section>
          }
        </section>
      </>
    )
  }

}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default withRouter(connect(mapStatetoProps)(Details))
