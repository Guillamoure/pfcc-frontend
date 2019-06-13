import React from 'react'
// import _ from 'lodash'

class NewTrait extends React.Component {

  state = {
    trait: {
      name: "",
      description: ""
    }
  }
  componentDidMount() {
    if (this.props.trait){
      this.setState({
        trait: {
          name: this.props.trait.name,
          description: this.props.trait.description
        }
      })
    }
  }

  renderTraitChange = (e) => {
    this.setState({trait:{...this.state.trait, [e.target.name]: e.target.value}})
  }

  clearAddTrait = () => {
    if (!this.props.trait) {

      if (this.state.trait.name !== "" && this.state.trait.level_learned !== "" && this.state.trait.description !== "") {
        this.setState({trait: {
          name: "",
          level_learned: "",
          description: ""
        }})
      }
    }
  }

  renderAddTrait = () => {
    return (
      <div>
        <form onSubmit={(e) => {
          this.props.renderSubmit(e, this.state.trait)
        }}>
          <label>
             Trait Name:
            <input type="text" name="name" value={this.state.trait.name} onChange={this.renderTraitChange}/>
          </label>
          <br />
          <br />
          <label>
            Description:
            <textarea type="textfield" rows="6" className="desc-box" name="description" value={this.state.trait.description} onChange={this.renderTraitChange}/>
          </label>
          <br />
          <br />
          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }


  render () {
    return (
      <div>
        {this.props.toggleTraitForm ? this.renderAddTrait() : this.clearAddTrait()}
        {this.props.trait ? <button onClick={this.props.deleteTrait}>Delete Trait</button> : null}
        < br />
      </div>
    )
  }



}

export default NewTrait
