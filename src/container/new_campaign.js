import React from 'react';
import { connect } from 'react-redux'
import localhost from '../localhost'
import _ from 'lodash'

import Classes from '../components/campaign/classes'
import Races from '../components/campaign/races'
import Calendar from '../components/campaign/calendar'
import Setting from '../components/campaign/setting'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'

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

  const loadingDie = <FontAwesomeIcon icon={faDiceD20} className="spinning-die"/>


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

  // Theme
  // setting
  // classes and races
  // calendar
  // skillset
  // start date
  // TODO: campaign page, next day patch button
  // TODO: random days for some months
  // starting level
  // custom notes


  const renderForm = () => {
    return (
      <form id="new-campaign-form" onSubmit={renderSubmit}>
        <Setting name={name} setName={setName} theme={theme} setTheme={setTheme} setting={setting} setSetting={setSetting}/>
        <Calendar calendars={calendars} selectedCalendarId={selectedCalendarId} updateSelectedCalendarId={updateSelectedCalendarId} loadingDie={loadingDie}/>
        <Races races={races} selectedRaceIds={selectedRaceIds} updateSelectedRaceIds={updateSelectedRaceIds} loadingDie={loadingDie}/>
        <Classes classes={classes} selectedClassIds={selectedClassIds} updateSelectedClassIds={updateSelectedClassIds} loadingDie={loadingDie}/>

        <section id='new-campaign-form-submit'>
          <input type="submit" value="Create Campaign"/>
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
