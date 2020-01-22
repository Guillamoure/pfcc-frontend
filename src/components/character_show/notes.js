import React from 'react'
import { connect } from 'react-redux'
import NoteForm from '../notes/note_form'
import Note from '../notes/note'

import { consolidateDate, truncatedDate } from '../../fuf'

const Notes = props => {

  const [newNote, setNoteForm] = React.useState(false);
  const [activeNote, setActiveNote] = React.useState(0);

  const renderNew = () => {
    return <li className='note-list-item'>
      <p onClick={() => setNoteForm(true)}>Create New Note</p>
    </li>
  }

  const noteCreated = () => {
    setNoteForm(false)
  }
  const makeActive = (id) => {
    if (activeNote === id){
      setActiveNote(0)
    } else {
      setActiveNote(id)
    }
  }

  const renderNotes = () => {
    let sorted = [...props.character.notes].sort((a,b) => b.updated_at > a.updated_at ? 1 : -1)
    return sorted.map(n => <Note note={n} makeActive={makeActive} activeNote={activeNote} date={consolidateDate(n)} truncatedDate={truncatedDate(n)}/>)
  }

  return (
    <div>
      <ul className='note-list'>
        {!newNote && renderNew()}
        {newNote && <NoteForm finishFetch={noteCreated} method={'POST'} create={true}/>}
        {renderNotes()}
      </ul>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Notes)
