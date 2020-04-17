import React from 'react'

const Calendar = props => {

  const [showMonths, toggleMonths] = React.useState(false)
  const [showDays, toggleDays] = React.useState(false)

  let selectedCalendar = null

  if (props.selectedCalendarId !== "0"){
    let calendar = props.calendars.find(c => c.id === parseInt(props.selectedCalendarId))
    console.log(calendar)
    let selectedMonth = props.selectedMonth ? calendar.months.find(m => m.name === props.selectedMonth) : 0
    selectedCalendar =  (
      <p id="new-campaign-starting-date">
        <strong style={{gridArea: 'start'}}>Starting Date:</strong>
        <label htmlFor="new-campaign-calender-month" name="new-campaign-calender-month">Month:</label>
        <select id="new-campaigin-calendar-month" name="new-campaign-calendar-month" value={props.selectedMonth} onChange={(e) => props.updateMonth(e.target.value)}>
          <option value="">Month</option>
          {calendar.months.map((m, i) => <option key={m.id * 3 - 1} value={m.name}>{i+1}. {m.name} ({m.num_of_days ? m.num_of_days : "??"} days)</option>)}
        </select>
        <label htmlFor="new-campaign-calender-day" name="new-campaign-calender-day">Weekday:</label>
        <select id="new-campaigin-calendar-day" name="new-campaign-calendar-day" value={props.selectedDay} onChange={(e) => props.updateDay(e.target.value)}>
          <option value="">Day</option>
          {calendar.days.map((d, i) => <option key={d.id * 3 - 1} value={d.name}>{i+1}. {d.name}</option>)}
        </select>
        <label htmlFor="new-campaign-calendar-day-number" name="new-campaign-calendar-day-number">Day:</label>
        <input
          type="number"
          id="new-campaign-calendar-day-number"
          name="new-campaign-calendar-day-number"
          value={props.selectedDayNumber}
          onChange={(e) => props.updateDayNumber(e.target.value)}/>
        <label htmlFor="new-campaign-calendar-year" name="new-campaign-calendar-year">Year:</label>
        <input
          type="number"
          id="new-campaign-calendar-year"
          name="new-campaign-calendar-year"
          value={props.selectedYear}
          onChange={(e) => props.updateYear(e.target.value)}/>
        <label htmlFor="new-campaign-calendar-age" name="new-campaign-calendar-age">Age:</label>
        <input
          type="text"
          id="new-campaign-calendar-age"
          name="new-campaign-calendar-age"
          value={props.selectedAge}
          placeholder="3rd Age, Cenozoic Period, BCE, etc."
          onChange={(e) => props.updateAge(e.target.value)}/>
      </p>
    )
  }
  // <h4 onClick={() => toggle("month")}>Months ({calendar.months.length})</h4>
  // {showMonths && <ol style={{fontSize: "10px", overflowY: "scroll", maxHeight: "10vh"}}>{calendar.months.map(m => <li key={m.id * 3 - 1}>{m.name}</li>)}</ol>}
  // <h4 onClick={() => toggle("day")}>Days ({calendar.days.length})</h4>
  // {showDays && <ol style={{fontSize: "10px", overflowY: "scroll", maxHeight: "10vh"}}>{calendar.days.map(d => <li key={d.id * 3 - 1}>{d.name}</li>)}</ol>}

  const toggle = (type) => {
    if (type === "month"){
      toggleMonths(!showMonths)
      toggleDays(false)
    } else if (type === "day"){
      toggleDays(!showDays)
      toggleMonths(false)
    }
  }


  const display = () => {
    if (!props.calendars.length){
      return <>{props.loadingDie}</>
    } else {
      return (
        <>
          <select id="new-campaigin-calendar" name="new-campaign-calendar" value={props.selectedCalendarId} onChange={(e) => props.updateSelectedCalendarId(e.target.value)}>
            <option value="0">Select A Calendar</option>
            {props.calendars.map(c => <option key={c.id * 3 - 1} value={c.id}>{c.name}</option>)}
          </select>

          {selectedCalendar}
        </>
      )
    }
  }


  return (
    <section id="new-campaign-form-calendar" className="standard-container-bubble">

      <label htmlFor="new-campaign-calendar"><h3>Calendar</h3></label>
      {display()}

    </section>
  )
}

export default Calendar
