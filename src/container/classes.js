import React from 'react'
import NewClass from '../components/new_class'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Home extends React.Component {

  state = {
    classes: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/klasses')
    .then(r => r.json())
    .then(data => this.setState({classes: data}))
  }

  renderClasses = () => {
    return this.state.classes.map(klass => <div>{klass.name}</div>)
  }


  renderNewClass = () => {
    console.log("clicked")

  }

  // <button onClick={this.renderNewClass}>Create New Class</button>
  render() {
    console.log(this.state.classes[0])
    return (
      <div className='background'>
        Dees the Classes:
        {this.state.classes[0] ? this.renderClasses() : null}
        < br />
        < br />
        <Link to='/classes/new' >Hit Me, Boi</Link>
      </div>
    )
  }

}

export default Home
