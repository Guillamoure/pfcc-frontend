import React from 'react'
import Portal from '../portal'

class BackgroundForm extends React.Component{

  state = {
    background: "",
    age: 0,
    alignment: "",
    homeland: "",
    deity: "",
    id: ""
  }

  componentDidMount() {
    console.log("edit background", this.props.character)
    this.setState({
      background: this.props.character.background,
      age: this.props.character.age,
      alignment: this.props.character.alignment,
      homeland: this.props.character.homeland,
      deity: this.props.character.deity,
      id: this.props.character.id
    })
  }

  renderChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderSubmit = () => {

  }

  render() {
    return (
      <Portal>
        <div className="page-dimmer" onClick={this.props.clickOut}>
          <div className="edit-form" name="background">
            Background
            <label>Age</label>
            <input type="number" name="age" value={this.state.age} onChange={this.renderChange}/>
            <label>Background</label>
            <br />
            <textarea style={{width: '15em'}} type="textfield" className="desc-box" rows="6" name="background" value={this.state.background} onChange={this.renderChange}/>
            <br />
            <label>Alignment</label>
            <br />
            <select value={this.state.alignment} onChange={this.renderChange} name='alignment'>
              <option value= "" > </option>
              <option value= "Lawful Good" >Lawful Good</option>
              <option value= "Neutral Good" >Neutral Good</option>
              <option value= "Chaotic Good" >Chaotic Good</option>
              <option value= "Lawful Neutral" >Lawful Neutral</option>
              <option value= "Neutral" >Neutral</option>
              <option value= "Chaotic Neutral" >Chaotic Neutral</option>
              <option value= "Lawful Evil" >Lawful Evil</option>
              <option value= "Neutral Evil" >Neutral Evil</option>
              <option value= "Chaotic Evil" >Chaotic Evil</option>
            </select>
            <br />
            <label>Homeland</label>
            <br />
            <input style={{width: '10em'}} type="text" name="homeland" value={this.state.homeland} onChange={this.renderChange}/>
            <br />
            <label>Deity</label>
            <br />
            <input style={{width: '10em'}} type="text" name="deity" value={this.state.deity} onChange={this.renderChange}/>
            <br /><br />
            <button onClick={() => this.props.renderEdit(this.state, 'background')}>Submit</button>
          </div>
        </div>
      </Portal>
    );
  }
}


export default BackgroundForm
