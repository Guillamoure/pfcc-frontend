import React from 'react';
import { connect } from 'react-redux'
import localhost from '../localhost'
import _ from 'lodash'

import Classes from '../components/campaign/classes'
import Races from '../components/campaign/races'

const NewCampaign = props => {

  const [calendars, setCalendars] = React.useState([])
  const [races, setRaces] = React.useState([])
  const [classes, setClasses] = React.useState([])

  const [displayAvailableRaces, toggleAvailableRaces] = React.useState(false)
  const [selectedRaceIds, updateSelectedRaceIds] = React.useState([])

  const [selectedClassIds, updateSelectedClassIds] = React.useState([])

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


  const renderRaces = () => {
    let displayAllRaces = null
    if (displayAvailableRaces){
      let checkboxRaces = []
      // make an array of sources, sorted by code
      let sortedRacesBySource = races.sort((cl1, cl2) => cl1.source.code >= cl2.source.code ? 1 : -1)
      let sources = _.uniq(sortedRacesBySource.map(cl => cl.source.title))
      // "custom" has no code, so it gets sorted funny
      let removedCustom = sources.filter(s => s !== "Custom")
      if (removedCustom.length + 1 === sources.length){
        sources = removedCustom
        sources.push("Custom")
      }
      console.log(sources)
      // go through that array
      checkboxRaces = sources.map((source, i) => {
        let onlyThoseSpecificRaces = races.filter(cl => cl.source.title === source)
        let racesDOMNode = onlyThoseSpecificRaces.map(race => {
          // display valid checkboxes
          return (
            <span key={race.id * 3 - 1}>
              <input type="checkbox" id={race.name} name={race.name} value={race.id} checked={selectedRaceIds.includes(race.id)} onChange={() => toggleSelectedRaces(race.id)}/>
              <label htmlFor={race.name}> {race.name}</label>
            </span>
          )
        })

        // give that array a h4 with the title (subtitle of prevalence)
        return (
          <section key={i * 3 + 1}>
            <h4>{source}:</h4>
            <section className="form-races-checkbox-options">{racesDOMNode}</section>
          </section>
        )
      })
      displayAllRaces = <div id="new-campaign-form-all-races">{checkboxRaces}</div>
    }
    return (
      <>
        <h3>Available Races</h3>
        <input type="checkbox" id="all-races" name="all-races" value="All" checked={!displayAvailableRaces} onChange={() => toggleAvailableRaces(!displayAvailableRaces)}/>
        <label htmlFor="all-races"> All Races</label><br/>
        {displayAllRaces}
      </>
    )
  }

  const toggleSelectedRaces = (id) => {
    let updatedIdArray = selectedRaceIds.filter(sri => sri !== id)
    if (updatedIdArray.length === selectedRaceIds.length){
      updatedIdArray.push(id)
    }
    updateSelectedRaceIds(updatedIdArray)
  }

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
        race_ids: selectedRaceIds,
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
        <section id="new-campaign-form-races">
          {renderRaces()}
        </section>
        <Classes classes={classes} selectedClassIds={selectedClassIds} updateSelectedClassIds={updateSelectedClassIds}/>
        <section id='new-campaign-form-submit'>
          <input type="submit" />
        </section>
      </form>
    )
  }

  if (localStorage.computer === "true"){
    return (
      <>
        {renderForm()}
      </>
    )
  } else if (localStorage.computer === "false"){
    return (
      <div>
        Mobile Yo
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStateToProps)(NewCampaign)
