import React from 'react'
import { connect } from 'react-redux'
import NewNote from '../notes/new_note'
import Note from '../notes/note'

const Notes = props => {

  const [newNote, setNewNote] = React.useState(false);
  const [activeNote, setActiveNote] = React.useState(0);

  const renderNew = () => {
    return <li className='note-list-item'>
      <p><button onClick={() => setNewNote(true)}><strong>+</strong></button> Create New Note</p>
    </li>
  }

  const noteCreated = () => {
    setNewNote(false)
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
    return sorted.map(n => <Note note={n} makeActive={makeActive} activeNote={activeNote}/>)
  }

  return (
    <div>
      <ul className='note-list'>
        {!newNote && renderNew()}
        {newNote && <NewNote noteCreated={noteCreated}/>}
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
