import React from 'react'

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

  render() {
    console.log(this.state.classes[0])
    return (
      <div>
        Barbarian bro
        {this.state.classes[0] ? this.renderClasses() : null}
      </div>
    )
  }

}

export default Home
