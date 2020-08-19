import React from 'react'

const Details = props => {

  const [startingLvlField, toggleStartingLvl] = React.useState(false)
  const [customNotesField, toggleCustomNotes] = React.useState(false)

  const startingLvlEl = React.useRef(null);
  const customNotesEl = React.useRef(null);

  let rows = 1
  if (customNotesEl.current){
    let stillAdding = true
    let textLength = customNotesEl.current.value.length
    let averageCharactersInRow = customNotesEl.current.offsetWidth/7.5

    while (stillAdding){
      if (textLength > averageCharactersInRow){
        textLength -= averageCharactersInRow
        rows++
      } else {
        stillAdding = false
      }
    }

  }

  const onBlur = () => {
    toggleCustomNotes(false)
    props.toggleVirtualKeyboard(false)
  }

  const moreInfoSidebar = () => {
    if (parseInt(props.selectedSkillsetId)){
      let skillset = props.skillsets.find(sk => sk.id == props.selectedSkillsetId)
      return ( <span onClick={() => props.editSidebar(true, 'bottom', 'skillset', skillset)}>More Info</span>)
    }
  }

  return (
    <section id="new-campaign-form-details" className="standard-container-bubble">
      <p style={{textAlign: 'left'}}>
        <label htmlFor="new-campaign-starting-level"
        onClick={() => toggleStartingLvl(true)}>
          <strong
          style={{fontSize: '1.2rem', fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif", color: startingLvlField && "grey"}}>
            Starting Level
          </strong>
        </label>: <strong>
          {props.startingLvl}
        </strong>
        {startingLvlField && <input
          type="number"
          ref={startingLvlEl}
          id="new-campaign-starting-level"
          name="new-campaign-starting-level"
          value={props.startingLvl}
          min="1"
          max="20"
          style={{position: 'absolute', top: '-25px'}}
          onChange={(e) => props.setStartingLvl(e.target.value)}
          onBlur={(() => toggleStartingLvl(false))}/>
        }
        {props.startingLvlError && <span id="decay-animation"> Level must be between 1 and 20</span>}
      </p>
      <p style={{textAlign: 'left'}}>
        <label htmlFor="new-campaign-skillset">
          <strong
          style={{fontSize: '1.2rem', fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"}}>
            Skillset:
          </strong>
        </label>
        {!!props.skillsets.length && <select id="new-campaigin-skillset" name="new-campaign-skillset" value={props.selectedSkillsetId} onChange={(e) => props.updateSelectedSkillsetId(e.target.value)}>
          <option value="0">Select A Skillset</option>
          {props.skillsets.map(sk => <option key={sk.id * 3 - 1} value={sk.id}>{sk.name} ({sk.skills.length})</option>)}
        </select>}
        {moreInfoSidebar()}
        {!props.skillsets.length && <>{props.loadingDie}</>}
      </p>
      <p style={{textAlign: 'left'}}>
        <label htmlFor="new-campaign-custom-notes"
        onClick={() => toggleCustomNotes(true)}>
          <strong
          style={{fontSize: '1.2rem', fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif", color: customNotesField && "grey"}}>
            Custom Notes
          </strong>
        </label>:<br/>
        <textarea
          type="text"
          ref={customNotesEl}
          id="new-campaign-custom-notes"
          name="new-campaign-custom-notes"
          value={props.customNotes}
          style={{background: 'none', border: 'none', width: '100%', color: '#0f52ba', overflowWrap: 'break-word'}}
          rows={rows}
          onChange={(e) => props.setCustomNotes(e.target.value)}
          onBlur={onBlur}
          onFocus={() => props.toggleVirtualKeyboard(true)}
        />
      </p>
    </section>
  )
}

export default Details
