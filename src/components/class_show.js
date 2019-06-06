import React from 'react'
import _ from 'lodash'

class Class extends React.Component {

  state ={
    klass : {},
    toggleCreateFeature: false,
    feature: {
      name: "",
      level_learned: 0,
      description: ""
    }
  }

  componentDidMount() {
    const klass = this.renderURL()
    fetch(`http://localhost:3000/api/v1/klasses/${klass}`)
    .then(r => r.json())
    .then(data => this.setState({klass: data}))
  }

  renderURL = () => {
    let url = window.location.href
    let urlArray = url.split("/")
    return urlArray[urlArray.length - 1]
  }

  renderFeatures = () => {
    const sortedFeatures = this.state.klass.klass_features.sort((a, b) => {
      return a.level_learned - b.level_learned
    })
    
    return sortedFeatures.map(feature => <ul><h4>{feature.name}</h4><li>A {this.state.klass.name} learns this at <strong>level {feature.level_learned}</strong></li><li>Description: {feature.description}</li></ul>)
  }


  renderBAB = () => {
    switch (this.state.klass.hit_die){
      case 6:
        return 0.5;
      case 8:
        return 0.75;
      case 10:
        return 1;
      case 12:
        return 1;
      default:
        return 1;
    }
  }

  renderFeatureChange = (e) => {

    this.setState({feature:{...this.state.feature, [e.target.name]: e.target.value}})
  }

  changeAddFeatureToggle = () => {
    this.setState({toggleCreateFeature: !this.state.toggleCreateFeature})
  }

  renderSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/klass_features', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_id: this.state.klass.id,
        features: this.state.feature
      })
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        klass: {
          ...this.state.klass,
          klass_features: [
            ...this.state.klass.klass_features,
            data.klass_feature
          ]
        },
        toggleCreateFeature: false,
        feature: {
          name: "",
          level_learned: 0,
          description: ""
        }
      })
    })
  }

  renderAddFeature = () => {
    return (
      <div>
        <form onSubmit={this.renderSubmit}>
          <label>
             Feature Name:
            <input type="text" name="name" value={this.state.feature.name} onChange={this.renderFeatureChange}/>
          </label>
          <br />
          <br />
          <label>
            Description:
            <textarea type="textfield" rows="6" className="desc-box" name="description" value={this.state.feature.description} onChange={this.renderFeatureChange}/>
          </label>
          <br />
          <br />
          <label>
            Level Learned:
            <input type="number" name="level_learned" value={this.state.feature.level_learned} onChange={this.renderFeatureChange}/>
          </label>
          <br />
          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }
  renderClassTableRow = () => {
    let level = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    return level.map(num => {
      return (
        <tr>
          <td>{num}</td>
          <td>+{_.floor(num * this.renderBAB())}</td>
          <td>{"Nothing"}</td>
        </tr>
      )
    })
  }

  renderClassTable = () => {
    return (
      <table >
        <thead >
          <tr >
            <th >Level</th>
            <th >BAB</th>
            <th >Features</th>
          </tr>
        </thead>
        <tbody >
          {this.renderClassTableRow()}
        </tbody>
      </table>
    )
  }


  render() {
    console.log(this.state)
    return (
      <span>
        <h3>{this.state.klass.name}</h3>
        <p>{this.state.klass.description}</p>
        <p><strong>Hit Die</strong>: d{this.state.klass.hit_die}</p>
        <p><strong>Skill Ranks per Level</strong>: {this.state.klass.skill_ranks} + Int modifier</p>
        {this.renderClassTable()}
        {this.state.klass.klass_features && this.renderFeatures()}
        <button onClick={this.changeAddFeatureToggle}>{this.state.toggleCreateFeature ? "Hide new Feature Form" : "Add a new Class Feature"}</button>
        < br />
        < br />
        {this.state.toggleCreateFeature ? this.renderAddFeature() : null}
      </span>
    )
  }


}

export default Class
