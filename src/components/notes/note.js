import React from 'react'
import localhost from '../../localhost'
import { connect } from 'react-redux'

const Note = props => {

  const { title, date, id, details } = props.note

  const [edit, setEdit] = React.useState(false);
  const [newDetails, setNewDetails] = React.useState(details);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDate, setNewDate] = React.useState(date);

  const renderDetails = (e) => {
    setNewDetails(e.target.value)
  }
  const renderTitle = (e) => {
    setNewTitle(e.target.value)
  }
  const renderDate = (e) => {
    setNewDate(e.target.value)
  }

  const saveDetails = (e) => {
    if (newDetails.length){
      e.preventDefault()
      console.log('how many fetches did i make?')
      fetch(`${localhost}/api/v1/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          newTitle, newDate, newDetails
        })
      })
      .then(r => r.json())
      .then(data => {
        if (!data.errors){
          props.dispatch({type: 'NEW NOTE', note: data})
          setEdit(false)
        } else {
          console.log(data)
        }
      })
    }
  }

  const renderForm = () => {
    return (
      <section>
        <form>
          <label for='newnote'>
              <input className='new-note-input' type='text' name='new note title' value={newTitle} onChange={renderTitle}/>
              <input className='new-note-header' type='text' name='new note date' value={newDate} onChange={renderDate}/>
              <button onClick={saveDetails}>Save</button>
              <textarea className='new-note-input' type='text' name='new note' value={newDetails} onChange={renderDetails} rows='14'/>
          </label>
        </form>
      </section>
    )
  }

  const renderNote = () => {
    return (
      <div className='note-list-item' onClick={() => props.makeActive(id)}>
        <p><strong>{title}</strong> - <small>{date}</small></p>
        {props.activeNote === id &&
          <React.Fragment>
            <div>{details}</div>
            <button onClick={() => setEdit(true)}>Edit</button>
          </React.Fragment>
        }
      </div>
    )
  }

  return (
    <React.Fragment>
      {edit ? renderForm() : renderNote()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Note)
