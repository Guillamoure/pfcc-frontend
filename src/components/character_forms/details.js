import React from 'react'
// import _ from 'lodash'

const Details = props => {


  // <label>Alignment</label>
  // <br />
  // <select value={props.alignment} onChange={props.renderChange} name='alignment'>
  //   <option value= "" > </option>
  //   <option value= "Lawful Good" >Lawful Good</option>
  //   <option value= "Neutral Good" >Neutral Good</option>
  //   <option value= "Chaotic Good" >Chaotic Good</option>
  //   <option value= "Lawful Neutral" >Lawful Neutral</option>
  //   <option value= "Neutral" >Neutral</option>
  //   <option value= "Chaotic Neutral" >Chaotic Neutral</option>
  //   <option value= "Lawful Evil" >Lawful Evil</option>
  //   <option value= "Neutral Evil" >Neutral Evil</option>
  //   <option value= "Chaotic Evil" >Chaotic Evil</option>
  // </select>

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
        <label>Character Name</label>
        <input style={{width: '10em'}} type="text" name="name" value={props.name} onChange={props.renderChange}/>
      </section>
    )
  }

  const renderAgeGender = () => {
    return (
      <section id="new-character-details-age-gender" className="standard-container-bubble">
      <label>Age</label>
      <input type="number" name="age" value={props.age} onChange={props.renderChange}/>
      <br/>
      <label>Gender</label>
      <input type="text" name="gender" value={props.gender} onChange={props.renderChange}/>
      </section>
    )
  }

  const renderDescription = () => {
    return (
      <section id="new-character-details-description" className="standard-container-bubble">
        <label>Description</label>
        <br />
        <textarea style={{width: '15em'}} type="textfield" className="desc-box" rows="6" name="description" value={props.description} onChange={props.renderChange}/>
        <section id="new-character-details-description-misc">
          <label>Hair</label>
          <input type="text" name="hair" value={props.hair} onChange={props.renderChange}/>
          <label>Eye Color</label>
          <input type="text" name="eyes" value={props.eyes} onChange={props.renderChange}/>
          <label>Height</label>
          <input type="text" name="height" value={props.height} onChange={props.renderChange}/>
          <label>Weight</label>
          <input type="text" name="weight" value={props.weight} onChange={props.renderChange}/>
        </section>
      </section>
    )
  }


  return (
    <section id="new-character-details">
      {renderName()}
      {renderAlignment()}
      {renderAgeGender()}
      {renderDescription()}
      <span>
        <label>Background</label>
        <br />
        <textarea style={{width: '15em'}} type="textfield" className="desc-box" rows="6" name="background" value={props.background} onChange={props.renderChange}/>
        <br />
        <label>Homeland</label>
        <br />
        <input style={{width: '10em'}} type="text" name="homeland" value={props.homeland} onChange={props.renderChange}/>
        <br />
        <label>Deity</label>
        <br />
        <input style={{width: '10em'}} type="text" name="deity" value={props.deity} onChange={props.renderChange}/>
      </span>

    </section>
  )
}


export default Details
