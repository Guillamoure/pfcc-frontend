import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import localhost from '../localhost'
import _ from 'lodash'

import Classes from '../components/campaign/classes'
import Races from '../components/campaign/races'
import Calendar from '../components/campaign/calendar'
import Setting from '../components/campaign/setting'
import Details from '../components/campaign/details'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import SideBar from './sidebar/sidebar'


const NewCampaign = props => {

  const [calendars, setCalendars] = React.useState([])
  const [races, setRaces] = React.useState([])
  const [classes, setClasses] = React.useState([])
  const [skillsets, setSkillsets] = React.useState([])

  const [selectedRaceIds, updateSelectedRaceIds] = React.useState([])
  const [selectedClassIds, updateSelectedClassIds] = React.useState([])
  const [selectedCalendarId, updateSelectedCalendarId] = React.useState("0")
  const [selectedSkillsetId, updateSelectedSkillsetId] = React.useState("0")
  const [selectedMonth, updateMonth] = React.useState("")
  const [selectedDay, updateDay] = React.useState("")
  const [selectedDayNumber, updateDayNumber] = React.useState(0)
  const [selectedYear, updateYear] = React.useState(0)
  const [selectedAge, updateAge] = React.useState("")

  const [name, setName] = React.useState("")
  const [setting, setSetting] = React.useState("")
  const [theme, setTheme] = React.useState("")

  const loadingDie = <FontAwesomeIcon icon={faDiceD20} className="spinning-die"/>

  const [startingLvl, setStartingLvl] = React.useState(1)
  const [startingLvlError, toggleStartingLvlError] = React.useState(false)
  const [customNotes, setCustomNotes] = React.useState("")

  const [usingVirtualKeyboard, toggleVirtualKeyboard] = React.useState(false)
  const [sidebar, toggleSidebar] = React.useState({display: false})

  React.useEffect(() => {
    fetch(`${localhost}/api/v1/campaigns/new`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setCalendars(data.calendars)
        setRaces(data.races)
        setClasses(data.klasses)
        setSkillsets(data.skillsets)
        updateSelectedRaceIds(data.races.map(r => r.id))
        updateSelectedClassIds(data.klasses.map(cl => cl.id))
      })
  }, [])

  const renderSubmit = (e) => {
    if (startingLvl >= 1 && startingLvl <= 20){
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
          customNotes,
          calendar_id: selectedCalendarId,
          race_ids: selectedRaceIds,
          klass_ids: selectedClassIds,
          skillset_id: selectedSkillsetId,
          dm_id: props.currentUser.id,
          starting_level: startingLvl,
          month: selectedMonth,
          weekday: selectedDay,
          day: selectedDayNumber,
          year: selectedYear,
          age: selectedAge
        })
      })
        .then(r => r.json())
        .then(data => {
           props.history.push(`/campaigns/${data.id}`)
        })
    } else {
      validateStartingLvl(0)
    }

  }

  const validateStartingLvl = (lvl) => {
    if (lvl >= 1 && lvl <= 20){
      setStartingLvl(lvl)
      toggleStartingLvlError(false)
    } else {
      if (lvl === ""){
        setStartingLvl(lvl)
      }
      toggleStartingLvlError(true)
      setTimeout(() => toggleStartingLvlError(false), 2900)
    }
  }

  const editSidebar = (display, position, description, content) => {
    toggleSidebar({display, position, description, content})
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
  // pantheon


  const renderForm = () => {
    return (
      <>
        <form id="new-campaign-form" onSubmit={renderSubmit}>
          <Setting name={name} setName={setName} theme={theme} setTheme={setTheme} setting={setting} setSetting={setSetting}/>
          <Calendar calendars={calendars} selectedCalendarId={selectedCalendarId} updateSelectedCalendarId={updateSelectedCalendarId} selectedMonth={selectedMonth} updateMonth={updateMonth} selectedDay={selectedDay} updateDay={updateDay} selectedDayNumber={selectedDayNumber} updateDayNumber={updateDayNumber} selectedYear={selectedYear} updateYear={updateYear} selectedAge={selectedAge} updateAge={updateAge} loadingDie={loadingDie}/>
          <Races races={races} selectedRaceIds={selectedRaceIds} updateSelectedRaceIds={updateSelectedRaceIds} loadingDie={loadingDie}/>
          <Classes classes={classes} selectedClassIds={selectedClassIds} updateSelectedClassIds={updateSelectedClassIds} loadingDie={loadingDie}/>
          <Details startingLvl={startingLvl} setStartingLvl={validateStartingLvl} startingLvlError={startingLvlError} customNotes={customNotes} setCustomNotes={setCustomNotes} toggleVirtualKeyboard={toggleVirtualKeyboard} skillsets={skillsets} selectedSkillsetId={selectedSkillsetId} updateSelectedSkillsetId={updateSelectedSkillsetId} loadingDie={loadingDie} editSidebar={editSidebar}/>
          <section id='new-campaign-form-submit' style={{display: usingVirtualKeyboard ? "none" : "block"}}>
            <input type="submit" value="Create Campaign"/>
          </section>
        </form>
        {sidebar.display && <SideBar sidebar={sidebar} editSidebar={editSidebar}/>}
      </>
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

export default withRouter(connect(mapStateToProps)(NewCampaign))
