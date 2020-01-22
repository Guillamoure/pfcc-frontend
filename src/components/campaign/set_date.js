import React from 'react'
import { connect } from 'react-redux'
import localhost from '../../localhost'

const SetDate = props => {

  const [weekday, setWeekday] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [day, setDay] = React.useState(1)
  const [age, setAge] = React.useState(5)
  const [year, setYear] = React.useState(5)

  React.useEffect(() => {
    console.log(props)
    const { weekday, month, day, age, year } = props.campaign
    setWeekday(weekday)
    setMonth(month)
    setDay(day)
    setAge(age)
    setYear(year)
  }, [props.character])

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
        weekday, month, day, age, year
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
    return (
      <form>
        <label>
          <select name="weekday" value={weekday} onChange={changeWeekday}>
            <option value="Moonday">Moonday</option>
            <option value="Everglow">Everglow</option>
            <option value="Wyrmsrite">Wyrmsrite</option>
            <option value="Feyblessed">Feyblessed</option>
            <option value="Radiance">Radiance</option>
            <option value="Solarday">Solarday</option>
            <option value="Demoncrest">Demoncrest</option>
          </select>
        </label>
        <label>
          <select name="month" value={month} onChange={changeMonth}>
            <option value="Floreau Budding">Floreau Budding</option>
            <option value="Floreau Equinox">Floreau Equinox</option>
            <option value="Floreau Blossom">Floreau Blossom</option>
            <option value="Harvest Flourish">Harvest Flourish</option>
            <option value="Harvest Solstice">Harvest Solstice</option>
            <option value="Harvest Scorch">Harvest Scorch</option>
            <option value="Autumn Cornucopia">Autumn Cornucopia</option>
            <option value="Autumn Equinox">Autumn Equinox</option>
            <option value="Autumn Festival">Autumn Festival</option>
            <option value="Borealis Snowfall">Borealis Snowfall</option>
            <option value="Borealis Solstice">Borealis Solstice</option>
            <option value="Borealis Renewal">Borealis Renewal</option>
            <option value="Lunalis">Lunalis</option>
          </select>
        </label>
        <label>
          <input type="number" name="day" style={{width: '4%'}} value={day} onChange={changeDay}/>
        </label>
        <label>
          <select name="age" value={age} onChange={changeAge}>
            <option value={1}>1st Age</option>
            <option value={2}>2nd Age</option>
            <option value={3}>3rd Age</option>
            <option value={4}>4th Age</option>
            <option value={5}>5th Age</option>
          </select>
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
