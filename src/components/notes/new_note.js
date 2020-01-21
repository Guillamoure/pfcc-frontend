import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../../localhost'

const NewNote = props => {

  const [details, setDetails] = React.useState('');
  const [title, setTitle] = React.useState('New Note');
  const [date, setDate] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const [save, setSave] = React.useState(false)

  React.useEffect(() => {
    setDate(props.character.campaign.date)
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
      e.preventDefault()
      fetch(`${localhost}/api/v1/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title, date, details, character_id: props.character.id
        })
      })
      .then(r => r.json())
      .then(data => {
        if (!data.errors){
          setLoading(false)
          setSave(true)
          props.dispatch({type: 'NEW NOTE', note: data})
          props.noteCreated()
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
        <label for='newnote'>
            <input className='new-note-input' type='text' name='new note title' value={title} onChange={renderTitle}/>
            <input className='new-note-header' type='text' name='new note date' value={date} onChange={renderDate}/>
            {/*save && <span>X</span>*/}
            <button onClick={saveDetails}>Save</button>
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

export default connect(mapStatetoProps)(NewNote)
