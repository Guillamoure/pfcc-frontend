import React from 'react';
import _ from 'lodash'

const Classes = props => {

  const [displayAvailableClasses, toggleAvailableClasses] = React.useState(false)

  let displayAllClasses = null

  if (displayAvailableClasses){
    let checkboxClasses = []
    // make an array of sources, sorted by code
    let sortedClassesBySource = props.classes.sort((r1, r2) => r1.source.code >= r2.source.code ? 1 : -1)
    let sources = _.uniq(sortedClassesBySource.map(r => r.source.title))
    // "custom" has no code, so it gets sorted funny
    let removedCustom = sources.filter(s => s !== "Custom")
    if (removedCustom.length + 1 === sources.length){
      sources = removedCustom
      sources.push("Custom")
    }
    console.log(sources)
    // go through that array
    checkboxClasses = sources.map((source, i) => {
      let onlyThoseSpecificClasses = props.classes.filter(r => r.source.title === source)
      let classesDOMNode = onlyThoseSpecificClasses.map(cl => {
        // display valid checkboxes
        return (
          <span key={cl.id * 3 - 1}>
            <input type="checkbox" id={cl.name} name={cl.name} value={cl.id} checked={props.selectedClassIds.includes(cl.id)} onChange={() => toggleSelectedClasses(cl.id)}/>
            <label htmlFor={cl.name}> {cl.name}</label>
          </span>
        )
      })

      // give that array a h4 with the title (subtitle of prevalence)
      return (
        <section key={i * 3 + 1}>
          <h4>{source}:</h4>
          <section className="form-races-checkbox-options">{classesDOMNode}</section>
        </section>
      )
    })
    displayAllClasses = <div id="new-campaign-form-all-races">{checkboxClasses}</div>
  }


  const toggleSelectedClasses = (id) => {
    let updatedIdArray = props.selectedClassIds.filter(sci => sci !== id)
    if (updatedIdArray.length === props.selectedClassIds.length){
      updatedIdArray.push(id)
    }
    props.updateSelectedClassIds(updatedIdArray)
  }

  const changeDisplay = () => {
    if (!displayAvailableClasses){
      props.updateSelectedClassIds(props.classes.map(cl => cl.id))
    }
    toggleAvailableClasses(!displayAvailableClasses)
  }

  const display = () => {
    if (!props.classes.length){
      return <>{props.loadingDie}</>
    } else {
      return (
        <>
          <input type="checkbox" id="all-classes" name="all-classes" value="All" checked={!displayAvailableClasses} onChange={changeDisplay}/>
          <label htmlFor="all-classes"> All Classes</label><br/>
          {displayAllClasses}
        </>
      )
    }
  }

  return (
    <section id="new-campaign-form-classes" className="standard-container-bubble">
      <h3>Available Classes</h3>
      {display()}
    </section>
  )
}

export default Classes
