import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import NoteForm from './note_form'

const Note = props => {

  const { title, id, details } = props.note

  const [edit, setEdit] = React.useState(false);

  const deleteNote = (e) => {
    fetch(`${localhost}/api/v1/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        props.dispatch({type: 'REMOVE NOTE', note: data})
        setEdit(false)
      } else {
        console.log(data)
      }
    })
  }

  const renderNote = () => {
    return (
      <div className='note-list-item' onClick={() => props.makeActive(id)}>
        <p><strong>{title}</strong> {props.activeNote !== id ? <small>{props.truncatedDate}</small> : <div><small>{props.date}</small></div>}</p>
        {props.activeNote === id &&
          <React.Fragment>
            <div id='white-space'>{details}</div>
            <br/>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={deleteNote}>Delete</button>
          </React.Fragment>
        }
      </div>
    )
  }

  return (
    <React.Fragment>
      {!edit ? renderNote() : <NoteForm note={props.note} method={'PATCH'} finishFetch={() => setEdit(false)}/>}
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
