import React from 'react'

const Calendar = props => {

  const [showMonths, toggleMonths] = React.useState(false)
  const [showDays, toggleDays] = React.useState(false)

  let selectedCalendar = null

  if (props.selectedCalendarId !== "0"){
    let calendar = props.calendars.find(c => c.id === parseInt(props.selectedCalendarId))
    console.log(calendar)
    selectedCalendar =  (
      <>
        <h4 onClick={() => toggle("month")}>Months ({calendar.months.length})</h4>
        {showMonths && <ol style={{fontSize: "10px", overflowY: "scroll", maxHeight: "10vh"}}>{calendar.months.map(m => <li key={m.id * 3 - 1}>{m.name}</li>)}</ol>}
        <h4 onClick={() => toggle("day")}>Days ({calendar.days.length})</h4>
        {showDays && <ol style={{fontSize: "10px", overflowY: "scroll", maxHeight: "10vh"}}>{calendar.days.map(d => <li key={d.id * 3 - 1}>{d.name}</li>)}</ol>}
      </>
    )
  }

  const toggle = (type) => {
    if (type === "month"){
      toggleMonths(!showMonths)
      toggleDays(false)
    } else if (type === "day"){
      toggleDays(!showDays)
      toggleMonths(false)
    }
  }


  return (
    <section id="new-campaign-form-calendar">

      <label htmlFor="new-campaign-calendar"><h3>Calendar</h3></label>
      <select id="new-campaigin-calendar" name="new-campaign-setting" value={props.selectedCalendarId} onChange={(e) => props.updateSelectedCalendarId(e.target.value)}>
        <option value="0">Select A Calendar</option>
        {props.calendars.map(c => <option key={c.id * 3 - 1} value={c.id}>{c.name}</option>)}
      </select>

      {selectedCalendar}
    </section>
  )
}

export default Calendar
