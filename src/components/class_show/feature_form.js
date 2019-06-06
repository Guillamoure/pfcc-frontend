import React from 'react'
import _ from 'lodash'

class NewFeature extends React.Component {

  state = {
    feature: {
      name: "",
      level_learned: "",
      description: ""
    }
  }

  renderFeatureChange = (e) => {
    this.setState({feature:{...this.state.feature, [e.target.name]: e.target.value}})
  }

  clearAddFeature = () => {
    if (this.state.feature.name !== "" && this.state.feature.level_learned !== "" && this.state.feature.description !== "") {
      this.setState({feature: {
        name: "",
        level_learned: "",
        desciption: ""
      }})
    }
  }

  renderAddFeature = () => {
    return (
      <div>
        <form onSubmit={(e) => this.props.renderSubmit(this.state.feature)}>
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

  render () {
    return (
      <div>
        {this.props.toggleCreateFeature ? this.renderAddFeature() : this.clearAddFeature()}
      </div>
    )
  }



}

export default NewFeature
