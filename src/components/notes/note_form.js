import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../../localhost'
import { consolidateDate } from '../../fuf'

const NoteForm = props => {

  const [details, setDetails] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const [save, setSave] = React.useState(false)

  React.useEffect(() => {
    let date = consolidateDate(props.character.campaign)
    setDate(date)
    if (props.note){
      setTitle(props.note.title)
      setDetails(props.note.details)
      setDate(consolidateDate(props.note))
    }
    if (props.create){
      setTitle(`New Note ${props.character.notes.length + 1}`)
    }
    let array = ['What would you like to say?', 'Have any news?', 'What did he do this time?', 'Anything exciting?']
    setPlaceholder(_.sample(array))
  }, [props.character])

  const renderDetails = (e) => {
    setDetails(e.target.value)
  }
  const renderTitle = (e) => {
    setTitle(e.target.value)
  }
  const renderDate = (e) => {
    setDate(e.target.value)
  }

  const saveDetails = (e) => {
    if (details.length){
      console.log('how many fetches did i make?')
      const { weekday, month, day, age, year } = props.character.campaign
      e.preventDefault()
      let url = props.method === 'PATCH' ? `${localhost}/api/v1/notes/${props.note.id}`: `${localhost}/api/v1/notes`
      fetch(url, {
        method: props.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title, weekday, month, day, age, year, details, character_id: props.character.id
        })
      })
      .then(r => r.json())
      .then(data => {
        if (!data.error){
          setLoading(false)
          setSave(true)
          props.dispatch({type: 'NEW NOTE', note: data})
          props.finishFetch()
        } else {
          console.log(data)
        }
      })
    }
  }

  const handle = _.debounce(saveDetails, 800)

  const debouncer = () => {
    // IT DOESNT WORK
    handle()
    // if (details.length){
    //   setLoading(true)
    // } else {
    //   setLoading(false)
    // }
  }

  return (
    <section>
      <form>
        <label htmlFor='newnote'>
            <input className='new-note-input' type='text' name='new note title' value={title} onChange={renderTitle}/>
            <span>{date}</span>
            {/*save && <span>X</span>*/}
            <button className='note-form-edit' onClick={saveDetails}>Save</button><button className='note-form-cancel' onClick={props.finishFetch}>X</button>
            <textarea className='new-note-input' type='text' name='new note' value={details} placeholder={placeholder} onChange={renderDetails} rows='14'/>
        </label>
      </form>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(NoteForm)
