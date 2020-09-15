import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from '../../localhost'

class Class extends React.Component{

  state = {
    classes: false,
    activeSkillset: 0,
    skillsets: {}
  }
	//
  // componentDidMount = () => {
  //   fetch(`${localhost}/api/v1/klasses`)
  //   .then(r => r.json())
  //   .then(data => {
  //     this.setState({classes: data})
  //   })
  // }

  renderClasses = () => {
    return this.props.classes.map(klass => {
      return <option key={klass.id} value={klass.id}>{klass.name}</option>
    })
  }

  renderChosenClass = () => {
    let chosen = this.props.classes.find(el => el.id === _.toNumber(this.props.chosenClassId))
    return <Link to={`/classes/${chosen.name}`} >{chosen.name}< br /></Link>
  }

  mapClassDynamicFields = () => {
    return this.props.classes.map((val, idx)=> {
      let classId = `class-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={classId}>{`Class #${idx + 1}`} </label>
            <select
              name={classId}
              value={this.props.classes[idx]}
              onChange={(e) => this.props.renderDynamicChanges(e, idx)}
            >
              <option value= "" >Choose One</option>
              {this.props.classes && this.renderClasses()}
            </select>
            {`Level ${idx + 1}`}
        </div>
      )
    })
  }

  checkForValidLevels = () => {
    let valid = true
    this.props.classes.forEach(klass => {
      if (klass.level > 20 || klass.level < 1){
        valid = false
      }
    })
    if (!valid) {
      return <div>You must choose a class level between 1 and 20!</div>
    }
  }


  // <label>
  //   Class Options:
  //   <select name="class" value={this.props.chosenClassId} onChange={(e) => this.props.renderChange(e)}>
  //     <option value= "" >Select One</option>
  //     {this.props.classes[0] ? this.renderClasses() : null}
  //   </select>
  // </label>

	renderClassCard = klass => {
		let style = {border: "4px solid transparent"}
		if (parseInt(this.props.chosenClasses[0]) === klass.id){style.border = "4px solid black"}
		return (
			<div className="dynamic-card" style={style} onClick={() => this.props.renderClassChange(klass.id)}>
				<button className='dynamic-card-content-button'>
					Select {klass.name}
				</button>
				<img className='dynamic-card-img' alt={klass.name} src={klass.img_url}></img>
			</div>
		)
	}

	renderClassOptions = () => {
		let classes = this.props.classes
		if (this.props.campaignDetails) {
			classes = this.props.campaignDetails.klasses
		}
		let classCards = classes.sort((a,b) => a.name.localeCompare(b.name)).map(this.renderClassCard)
		return (
			<section style={{display: "flex", flexWrap: "wrap"}}>
				{classCards}
			</section>
		)
	}

	// <span>Class Options </span>
	// <br/>
	// <button onClick={(e) => this.props.addClassField(e, "plus", this.props.classes.length-1)}>{`Level ${this.props.classes.length + 1}`}</button>
	// {this.mapClassDynamicFields()}
	// {this.props.classes.length > 1 ? <button onClick={(e) => this.props.addClassField(e, "minus")}>Delevel</button> : null}
	// {this.checkForValidLevels()}
	// {this.props.classes[0] && this.props.chosenClassId ? this.renderChosenClass() : null}

  render () {
    return (
      <div>
				{this.renderClassOptions()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
		classes: state.classes
  }
}

export default withRouter(connect(mapStateToProps)(Class))
