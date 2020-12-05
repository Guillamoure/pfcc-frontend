import React from 'react'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from '../../localhost'
import ClassTile from './class_tile'
import ClassShow from '../../container/class_show'
import ClassTable from '../class_show/table'
import ClassTabs from './class_tabs'
import { getFetch } from '../../utils/fetches'
import { addArchetypesAction } from '../../utils/action_creator/classes'
import ClassArchetypes from '../../container/class_archetypes'

const Class = props => {

  const [ classDetails, setClassDetails ] = React.useState({
    classes: [],
    activeSkillset: 0,
    skillsets: {},
		viewSpecificClassDetails: 0,
		viewSpecificArchetype: {},
		activeTab: "Base Features"
  })
	//
  // componentDidMount = () => {
  //   fetch(`${localhost}/api/v1/klasses`)
  //   .then(r => r.json())
  //   .then(data => {
  //     this.setState({classes: data})
  //   })
  // }

	React.useEffect(() => {
		if (classDetails.viewSpecificClassDetails){
			let klass = props.classes.find(kl => kl.id === classDetails.viewSpecificClassDetails)
			if (!klass.archetypes){
				getFetch(`klasses/${classDetails.viewSpecificClassDetails}/archetypes`)
				.then(data => {
					if (!data.error){
						addArchetypesAction(klass.id, data)
					}
				})
			}

		}
	}, [classDetails.viewSpecificClassDetails])

  const renderClasses = () => {
    return props.classes.map(klass => {
      return <option key={klass.id} value={klass.id}>{klass.name}</option>
    })
  }

	const chosenClasses = () => {
		let arr = [...props.chosenClasses, 0]
		return arr.map((klid, idx) => {
			if (klid > 0){
				let klass = props.classes.find(kl => kl.id == klid)
				let button = null
				if (idx == arr.length - 2){
					button = <button onClick={props.removeLatestClass}> - </button>
				}
				return <li className="selected-class-list-item"><span>Level {idx+1} - {klass.name}</span>{button}</li>
			} else {
				return <li className="empty-class-list-item">Level {idx+1}</li>
			}
		})
	}

  const displayChosenClass = (id) => {
		if (id === classDetails.viewSpecificClassDetails){
			setClassDetails({...classDetails, viewSpecificClassDetails: 0})
		} else {
			setClassDetails({...classDetails, viewSpecificClassDetails: id})
		}
  }

	const displayKlassArchetype = (arch) => {
		if (arch.id === classDetails.viewSpecificArchetype.id){
			setClassDetails({...classDetails, viewSpecificArchetype: {}})
		} else {
			setClassDetails({...classDetails, viewSpecificArchetype: arch})
		}
	}

  const mapClassDynamicFields = () => {
    return props.classes.map((val, idx)=> {
      let classId = `class-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={classId}>{`Class #${idx + 1}`} </label>
            <select
              name={classId}
              value={props.classes[idx]}
              onChange={(e) => props.renderDynamicChanges(e, idx)}
            >
              <option value= "" >Choose One</option>
              {props.classes && renderClasses()}
            </select>
            {`Level ${idx + 1}`}
        </div>
      )
    })
  }

  const checkForValidLevels = () => {
    let valid = true
    props.classes.forEach(klass => {
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

	const renderClassOptions = () => {
		let classes = props.classes ?? []
		if (props.campaignDetails) {
			classes = props.campaignDetails.klasses
		}
		let classCards = classes.sort((a,b) => a.name.localeCompare(b.name)).map(klass => <ClassTile klass={klass} renderClassChange={props.renderClassChange} displayChosenClass={displayChosenClass}/>)
		return (
			<section style={{display: "flex", flexWrap: "wrap"}}>
				{classCards}
			</section>
		)
	}

	// const renderClassImage = () => {
	// 	let klass = props.classes.find(kl => kl.id === classDetails.viewSpecificClassDetails)
	// 	return (
	// 		<div id="chosen-class-card" className="dynamic-card" onClick={() => displayChosenClass(klass.id)}>
	// 			<img className='dynamic-card-img' alt={klass.name} src={klass.img_url}></img>
	// 			<p className='dynamic-card-content-button'> {klass.name} </p>
	// 		</div>
	// 	)
	// }

	const renderTabs = () => {

		const renderTabClick = (tab) => {
			let resetSpecificArchetype = classDetails.viewSpecificArchetype
			if (tab !== "Archetypes"){
				resetSpecificArchetype = {}
			}

			setClassDetails({...classDetails, activeTab: tab, viewSpecificArchetype: resetSpecificArchetype})
		}

		return (
			<nav id="chosen-class-tabs">
				<ClassTabs activeTab={classDetails.activeTab} renderTabClick={renderTabClick}/>
			</nav>
		)
	}

	const renderClassTable = () => {
		let klass = props.classes.find(kl => kl.id === classDetails.viewSpecificClassDetails)
		return (
			<div id="chosen-class-card">
				<ClassTable klass={klass} activeArchetype={classDetails.viewSpecificArchetype}/>
			</div>
		)
	}

	const renderClassDetails = () => {
		let klass = props.classes.find(kl => kl.id === classDetails.viewSpecificClassDetails)

		let content
		switch (classDetails.activeTab){
			case "Base Features":
				content = <ClassShow klass={klass} options={{displayImage: false, displayDescription: false, displayTable: false}}/>
				break
			case "Archetypes":
				content = <ClassArchetypes archetypes={klass.archetypes} displayKlassArchetype={displayKlassArchetype}/>
				break
			default:
				content = <ClassShow klass={klass} options={{displayImage: false, displayDescription: false, displayTable: false}}/>
				break
		}
		return (
			<aside id="character-creation-class-chosen-details">
				{content}
			</aside>
		)
	}

	// <span>Class Options </span>
	// <br/>
	// <button onClick={(e) => this.props.addClassField(e, "plus", this.props.classes.length-1)}>{`Level ${this.props.classes.length + 1}`}</button>
	// {this.mapClassDynamicFields()}
	// {this.props.classes.length > 1 ? <button onClick={(e) => this.props.addClassField(e, "minus")}>Delevel</button> : null}
	// {this.checkForValidLevels()}
	// {this.props.classes[0] && this.props.chosenClassId ? this.renderChosenClass() : null}

	const className = !!classDetails.viewSpecificClassDetails ? "chosen-class" : ""
	const id = !!classDetails.viewSpecificClassDetails ? "character-creation-chosen-class" : "character-creation-class"

  return (
    <section id="character-creation-class">
			<ul>{chosenClasses()}</ul>
			{!classDetails.viewSpecificClassDetails && renderClassOptions()}
			<section className={className}>
				{!!classDetails.viewSpecificClassDetails && renderClassTable()}
				{!!classDetails.viewSpecificClassDetails && renderTabs()}
				{!!classDetails.viewSpecificClassDetails && renderClassDetails()}
				{!!classDetails.viewSpecificClassDetails && <button onClick={() => setClassDetails({...classDetails, viewSpecificClassDetails: 0, viewSpecificArchetype: {}, activeTab: "Base Features"})}>Go Back</button>}
			</section>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
		classes: state.classes
  }
}

export default withRouter(connect(mapStateToProps)(Class))
