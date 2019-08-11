import React from 'react'
// import _ from 'lodash'
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

class Details extends React.Component{





  render () {
    return (
      <div >
        <span>
          <label>Character Name</label>
          <br />
          <input style={{width: '10em'}} type="text" name="name" value={this.props.name} onChange={this.props.renderChange}/>
          <br />
          <label>Alignment</label>
          <br />
          <select value={this.props.alignment} onChange={this.props.renderChange} name='alignment'>
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
          <br /><br />
          <div>
            <label>Age</label>
            <input type="number" name="age" value={this.props.age} onChange={this.props.renderChange}/>
            <label>Gender</label>
            <input type="text" name="gender" value={this.props.gender} onChange={this.props.renderChange}/>
          </div>
        </span>
        <br />
        <span>
          <label>Description</label>
          <br />
          <textarea style={{width: '15em'}} type="textfield" className="desc-box" rows="6" name="description" value={this.props.description} onChange={this.props.renderChange}/>
          <div>
            <label>Hair</label>
            <input type="text" name="hair" value={this.props.hair} onChange={this.props.renderChange}/>
            <label>Eye Color</label>
            <input type="text" name="eyes" value={this.props.eyes} onChange={this.props.renderChange}/>
            <label>Height</label>
            <input type="text" name="height" value={this.props.height} onChange={this.props.renderChange}/>
            <label>Weight</label>
            <input type="text" name="weight" value={this.props.weight} onChange={this.props.renderChange}/>
          </div>
        </span>
        <span>
          <label>Background</label>
          <br />
          <textarea style={{width: '15em'}} type="textfield" className="desc-box" rows="6" name="background" value={this.props.background} onChange={this.props.renderChange}/>
          <br />
          <label>Homeland</label>
          <br />
          <input style={{width: '10em'}} type="text" name="homeland" value={this.props.homeland} onChange={this.props.renderChange}/>
          <br />
          <label>Deity</label>
          <br />
          <input style={{width: '10em'}} type="text" name="deity" value={this.props.deity} onChange={this.props.renderChange}/>
        </span>

      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default withRouter(connect(mapStateToProps)(Details))
