import React from 'react';
import _ from 'lodash'

const Races = props => {

  const [displayAvailableRaces, toggleAvailableRaces] = React.useState(false)

  let displayAllRaces = null

  if (displayAvailableRaces){
    let checkboxRaces = []
    // make an array of sources, sorted by code
    let sortedRacesBySource = props.races.sort((cl1, cl2) => cl1.source.code >= cl2.source.code ? 1 : -1)
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
      let onlyThoseSpecificRaces = props.races.filter(cl => cl.source.title === source)
      let racesDOMNode = onlyThoseSpecificRaces.map(race => {
        // display valid checkboxes
        return (
          <span key={race.id * 3 - 1}>
            <input type="checkbox" id={race.name} name={race.name} value={race.id} checked={props.selectedRaceIds.includes(race.id)} onChange={() => toggleSelectedRaces(race.id)}/>
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

  const toggleSelectedRaces = (id) => {
    let updatedIdArray = props.selectedRaceIds.filter(sri => sri !== id)
    if (updatedIdArray.length === props.selectedRaceIds.length){
      updatedIdArray.push(id)
    }
    props.updateSelectedRaceIds(updatedIdArray)
  }

  const changeDisplay = () => {
    if (!displayAvailableRaces){
      props.updateSelectedRaceIds(props.races.map(r => r.id))
    }
    toggleAvailableRaces(!displayAvailableRaces)
  }

  const display = () => {
    if (!props.races.length){
      return <>{props.loadingDie}</>
    } else {
      return (
        <>
          <input type="checkbox" id="all-races" name="all-races" value="All" checked={!displayAvailableRaces} onChange={changeDisplay}/>
          <label htmlFor="all-races"> All Races</label><br/>
          {displayAllRaces}
        </>
      )
    }
  }

  return (
    <section id="new-campaign-form-races" className="standard-container-bubble">
      <h3>Available Races</h3>
      {display()}
    </section>
  )
}

export default Races
