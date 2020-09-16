import React from 'react'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import { getFetch } from '../../helper_functions/fetches'

const SetDate = props => {

  const [weekday, setWeekday] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [day, setDay] = React.useState(1)
  const [age, setAge] = React.useState(5)
  const [year, setYear] = React.useState(5)
	const [calendarData, setCalendarData] = React.useState({
		months: [],
		days: []
	})

  React.useEffect(() => {
    console.log(props)
    const { current_weekday, current_month, current_day, current_age, current_year } = props.campaign
    setWeekday(current_weekday)
    setMonth(current_month)
    setDay(current_day)
    setAge(current_age)
    setYear(current_year)
		getFetch(`calendars/${props.campaign.calendar.id}`)
			.then(data => {
				setCalendarData(data)
			})
  }, [props.campaign])

  const changeWeekday = (e) => {
    setWeekday(e.target.value)
  }
  const changeMonth = (e) => {
    setMonth(e.target.value)
  }
  const changeDay = (e) => {
    setDay(e.target.value)
  }
  const changeAge = (e) => {
    setAge(e.target.value)
  }
  const changeYear = (e) => {
    setYear(e.target.value)
  }

  const changeDate = (e) => {
    e.preventDefault()
    fetch(`${localhost}/api/v1/campaigns/${props.campaign.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        current_weekday: weekday,
				current_month: month,
				current_day: day,
				current_age: age,
				current_year: year
      })
    })
      .then(r => r.json())
      .then(data => {
        if (!data.error){
          props.dispatch({type: 'UPDATE DATE', date: data})
        } else {
          console.log(data)
        }
      })
  }

  const renderForm = () => {
		let weekdays = calendarData.days.map(d => <option value={d.name}>{d.name}</option>)
		let months = calendarData.months.map(m => <option value={m.name}>{m.name}</option>)
    return (
      <form>
        <label>
          <select name="weekday" value={weekday} onChange={changeWeekday}>
						{weekdays}
          </select>
        </label>
        <label>
          <select name="month" value={month} onChange={changeMonth}>
            {months}
          </select>
        </label>
        <label>
          <input type="number" name="day" style={{width: '4%'}} value={day} onChange={changeDay}/>
        </label>
        <label>
          <input type="text" name="age" style={{width: '6%'}} value={age} onChange={changeAge}/>
        </label>
        <label>
          <input type="number" name="year" style={{width: '6%'}} value={year} onChange={changeYear}/>
        </label>
        <button onClick={changeDate}>Change Date</button>
      </form>
    )
  }

  return (
    <React.Fragment>
      {renderForm()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStatetoProps)(SetDate)
