import React from 'react'
// import _ from 'lodash'

class NewFeature extends React.Component {

  state = {
    feature: {
      name: "",
      level_learned: "",
      description: ""
    }
  }
  componentDidMount() {
    if (this.props.feature){
      this.setState({
        feature: {
          name: this.props.feature.name,
          level_learned: this.props.feature.level_learned,
          description: this.props.feature.description
        }
      })
    }
  }

  renderFeatureChange = (e) => {
    this.setState({feature:{...this.state.feature, [e.target.name]: e.target.value}})
  }

  clearAddFeature = () => {
    if (!this.props.feature) {

      if (this.state.feature.name !== "" && this.state.feature.level_learned !== "" && this.state.feature.description !== "") {
        this.setState({feature: {
          name: "",
          level_learned: "",
          description: ""
        }})
      }
    }
  }

  renderAddFeature = () => {
    return (
      <div>
        <form onSubmit={(e) => {
          this.props.renderSubmit(e, this.state.feature)
        }}>
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
        {this.props.toggleFeatureForm ? this.renderAddFeature() : this.clearAddFeature()}
        {this.props.feature ? <button onClick={this.props.deleteFeature}>Delete Feature</button> : null}
        < br />
      </div>
    )
  }



}

export default NewFeature
