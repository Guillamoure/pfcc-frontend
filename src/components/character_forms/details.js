import React from 'react'
import AbilityForm from './ability_scores'
// import _ from 'lodash'

const Details = props => {

  const renderAlignment = () => {
    return (
      <section id="new-characte-details-alignment" className="standard-container-bubble">
        <section className="square-container-9">
          <button className="square-btn top-left-corner" style={{backgroundColor: selectedAlignment("Lawful Good")}} name="alignment" value="Lawful Good" onClick={props.renderChange}>LG</button>
          <button className="square-btn" style={{backgroundColor: selectedAlignment("Neutral Good")}} name="alignment" value="Neutral Good" onClick={props.renderChange}>NG</button>
          <button className="square-btn top-right-corner" style={{backgroundColor: selectedAlignment("Chaotic Good")}} name="alignment" value="Chaotic Good" onClick={props.renderChange}>CG</button>
          <button className="square-btn" style={{backgroundColor: selectedAlignment("Lawful Neutral")}} name="alignment" value="Lawful Neutral" onClick={props.renderChange}>LN</button>
          <button className="square-btn" style={{backgroundColor: selectedAlignment("Neutral")}} name="alignment" value="Neutral" onClick={props.renderChange}>N</button>
          <button className="square-btn" style={{backgroundColor: selectedAlignment("Chaotic Neutral")}} name="alignment" value="Chaotic Neutral" onClick={props.renderChange}>CN</button>
          <button className="square-btn bottom-left-corner" style={{backgroundColor: selectedAlignment("Lawful Evil")}} name="alignment" value="Lawful Evil" onClick={props.renderChange}>LE</button>
          <button className="square-btn" style={{backgroundColor: selectedAlignment("Neutral Evil")}} name="alignment" value="Neutral Evil" onClick={props.renderChange}>NE</button>
          <button className="square-btn bottom-right-corner" style={{backgroundColor: selectedAlignment("Chaotic Evil")}} name="alignment" value="Chaotic Evil" onClick={props.renderChange}>CE</button>
          <button style={{gridArea: "clear", padding: "0.5em", height: "2.5em", marginTop: "0.5em"}} value="" name="alignment" onClick={props.renderChange}>Clear Alignment</button>
        </section>
      </section>
    )
  }

  const selectedAlignment = (al) => {
    return props.alignment === al ? "#9b111e" : "#fff"
  }

  const renderName = () => {
    return (
      <section id="new-character-details-name" className="standard-container-bubble">
				<label htmlFor="new-character-name" className="new-character-label"><strong>Character Name</strong></label>:
				<input className="new-character-text-input" type="text"id="new-character-name" name="name" value={props.name} onChange={props.renderChange} autocomplete="off"/>
      </section>
    )
  }

	const renderAbilityForm = () => {
		return (
				<AbilityForm renderChange={props.renderChange} strength={props.strength}  dexterity={props.dexterity} constitution={props.constitution} intelligence={props.intelligence} wisdom={props.wisdom} charisma={props.charisma} mapAbilityScores={props.mapAbilityScores}/>
		)
	}

  const renderDescription = () => {
    return (
      <section id="new-character-details-description" className="standard-container-bubble">
				<span style={{gridArea: "description"}}>
        	<label htmlFor="new-character-description" className="new-character-label"><strong>Description</strong></label>:
        	<textarea className="new-character-text-input" type="textfield" rows="6" id="new-character-description" name="description" value={props.description} onChange={props.renderChange} placeholder="Appearance, outfit, aesthetic, attitude, etc." autocomplete="off"/>
				</span>

				<span style={{gridArea: "background"}}>
        	<label htmlFor="new-character-background" className="new-character-label"><strong>Background</strong></label>:
        	<textarea className="new-character-text-input" type="textfield" rows="6" id="new-character-background" name="background" value={props.background} onChange={props.renderChange} placeholder="Family, motivation, goals, experiences, education, career, training, upbringing, etc." autocomplete="off"/>
				</span>

				<span style={{gridArea: "extras"}}>
					<div>
	        	<label htmlFor="new-character-age" className="new-character-label"><strong>Age</strong></label>:
	        	<input className="new-character-text-input" type="number" id="new-character-age" name="age" value={props.age} onChange={props.renderChange} placeholder="25" autocomplete="off"/>
					</div>

					<div>
	        	<label htmlFor="new-character-gender" className="new-character-label"><strong>Gender</strong></label>:
	        	<input className="new-character-text-input" type="text" id="new-character-gender" name="gender" value={props.gender} onChange={props.renderChange} placeholder="Non-Binary" autocomplete="off"/>
					</div>

					<div>
	        	<label htmlFor="new-character-hair" className="new-character-label"><strong>Hair</strong></label>:
	        	<input className="new-character-text-input" type="text" id="new-character-hair" name="hair" value={props.hair} onChange={props.renderChange} placeholder="too much" autocomplete="off"/>
					</div>

					<div>
	        	<label htmlFor="new-character-eyes" className="new-character-label"><strong>Eye Color</strong></label>:
	        	<input className="new-character-text-input" type="text" id="new-character-eyes" name="eyes" value={props.eyes} onChange={props.renderChange} placeholder="piercing" autocomplete="off"/>
					</div>

					<div>
	        	<label htmlFor="new-character-height" className="new-character-label"><strong>Height</strong></label>:
	        	<input className="new-character-text-input" type="text" id="new-character-height" name="height" value={props.height} onChange={props.renderChange} placeholder="just so" autocomplete="off"/>
					</div>

					<div>
	        	<label htmlFor="new-character-weight" className="new-character-label"><strong>Weight</strong></label>:
	        	<input className="new-character-text-input" type="text" id="new-character-weight" name="weight" value={props.weight} onChange={props.renderChange} placeholder="just right" autocomplete="off"/>
					</div>

					<div>
						<label htmlFor="new-character-homeland" className="new-character-label"><strong>Homeland</strong></label>:
						<input className="new-character-text-input" type="text" id="new-character-homeland" name="homeland" value={props.homeland} onChange={props.renderChange} placeholder="Arcadia" autocomplete="off"/>
					</div>

					<div>
						<label htmlFor="new-character-deity" className="new-character-label"><strong>Deity</strong></label>:
						<input className="new-character-text-input" type="text" id="new-character-deity" name="deity" value={props.deity} onChange={props.renderChange} placeholder="Pharasma" autocomplete="off"/>
					</div>
				</span>

      </section>
    )
  }

  return (
    <section id="new-character-details">
      {renderName()}
      {renderAlignment()}
			{renderAbilityForm()}
      {renderDescription()}
    </section>
  )
}


export default Details
