import React from 'react';
import { connect } from 'react-redux'
import localhost from '../localhost'
import _ from 'lodash'

import Classes from '../components/campaign/classes'
import Races from '../components/campaign/races'
import Calendar from '../components/campaign/calendar'

const NewCampaign = props => {

  const [calendars, setCalendars] = React.useState([])
  const [races, setRaces] = React.useState([])
  const [classes, setClasses] = React.useState([])

  const [selectedRaceIds, updateSelectedRaceIds] = React.useState([])

  const [selectedClassIds, updateSelectedClassIds] = React.useState([])

  const [selectedCalendarId, updateSelectedCalendarId] = React.useState("0")

  const [name, setName] = React.useState("")
  const [setting, setSetting] = React.useState("")
  const [theme, setTheme] = React.useState("")

  React.useEffect(() => {
    fetch(`${localhost}/api/v1/campaigns/new`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setCalendars(data.calendars)
        setRaces(data.races)
        setClasses(data.klasses)
        updateSelectedRaceIds(data.races.map(r => r.id))
        updateSelectedClassIds(data.klasses.map(cl => cl.id))
      })
  }, [])

  const renderSubmit = (e) => {
    e.preventDefault();
    fetch(`${localhost}/api/v1/campaigns/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        theme,
        setting,
        calendar_id: selectedCalendarId,
        race_ids: selectedRaceIds,
        klass_ids: selectedClassIds,
        dm_id: props.currentUser.id
      })
    })
      .then(r => r.json)
      .then(console.log)
  }


  const renderForm = () => {
    return (
      <form id="new-campaign-form" onSubmit={renderSubmit}>
        <section id="new-campaign-form-setting">
          <label htmlFor="new-campaign-name">Campaign Name</label><br/>
          <input type="text" id="new-campaign-name" name="new-campaign-name" value={name} onChange={(e) => setName(e.target.value)}/><br/>

          <label htmlFor="new-campaign-setting">Setting</label><br/>
          <input type="text" id="new-campaign-setting" name="new-campaign-setting"  value={setting} onChange={(e) => setSetting(e.target.value)}/><br/>

          <label htmlFor="new-campaign-theme">Theme</label><br/>
          <input type="text" id="new-campaign-theme" name="new-campaign-theme"  value={theme} onChange={(e) => setTheme(e.target.value)}/><br/>
        </section>
        <Calendar calendars={calendars} selectedCalendarId={selectedCalendarId} updateSelectedCalendarId={updateSelectedCalendarId}/>
        <Races races={races} selectedRaceIds={selectedRaceIds} updateSelectedRaceIds={updateSelectedRaceIds}/>
        <Classes classes={classes} selectedClassIds={selectedClassIds} updateSelectedClassIds={updateSelectedClassIds}/>
        <section id='new-campaign-form-submit'>
          <input type="submit" />
        </section>
      </form>
    )
  }

  return (
    <>
      {renderForm()}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStateToProps)(NewCampaign)
