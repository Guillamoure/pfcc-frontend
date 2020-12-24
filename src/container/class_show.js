import React from 'react'
// import _ from 'lodash'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from '../localhost'


import Introduction from '../components/class_show/introduction'
import Table from '../components/class_show/table'
import Features from '../components/class_show/feature_list'
import FeatureForm from '../components/class_show/feature_form'
import ClassForm from  '../components/class_form'
import ClassSkillsForm from '../components/class_skills_form'
import SpellsForm from '../components/spells_form'

import FeatureEffect from '../modals/classes/effect'
import FeatureOptions from '../components/class_show/feature_options'

const ClassShow = props => {

	const [ klassDisplay, setKlassDisplay ] = React.useState({
    klass : {},
    toggleFeatureForm: false,
    toggleClassForm: false,
    toggleClassSkillsForm: false,
    toggleSpellsForm: false,
    modal: false,
    features: true
  })


  const renderURL = () => {
    let url = window.location.href
    let urlArray = url.split("/")
    return urlArray[urlArray.length - 1]
  }

  React.useEffect(() => {
    const klass = renderURL()
    let fw = ""
    if (klass === "Fate%20Weaver"){
      fw = "Fate Weaver"
    }
		if (props.klass){
			setKlassDisplay({...klassDisplay, klass: props.klass})
		} else if (props.classes.find(kl => kl.name === klass || kl.name === fw)){
      let selectedClass = props.classes.find(kl => kl.name === klass || kl.name === fw)
      setKlassDisplay({...klassDisplay, klass: selectedClass})
    } else {
      fetch(`${localhost}/api/v1/klasses/${klass}`)
      .then(r => r.json())
      .then(data => setKlassDisplay({...klassDisplay, klass: data.klass}))
    }
  }, [])

  const changeAddFeatureToggle = () => {
		setKlassDisplay({...klassDisplay, toggleFeatureForm: !klassDisplay.toggleFeatureForm})
  }
  const toggleClassForm = () => {
		setKlassDisplay({...klassDisplay, toggleClassForm: !klassDisplay.toggleClassForm})
  }
  const toggleClassSkillsForm = () => {
		setKlassDisplay({...klassDisplay, toggleClassSkillsForm: !klassDisplay.toggleClassSkillsForm})
  }
  const toggleSpellsForm = () => {
		setKlassDisplay({...klassDisplay, toggleSpellsForm: !klassDisplay.toggleSpellsForm})
  }

  const renderSubmit = (e, feature) => {
    e.preventDefault()

    fetch(`${localhost}/api/v1/klass_features`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_id: klassDisplay.klass.id,
        features: feature
      })
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        renderClassFeature(data)
      } else {
        console.log(data.error)
      }
    })
  }

  const renderClassEdit = (e, klass_updates) => {
    e.preventDefault()

    fetch(`${localhost}/api/v1/klasses/${klassDisplay.klass.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_id: klassDisplay.klass.id,
        updates: klass_updates
      })
    })
    .then(r => r.json())
    .then(data => {
      if(!data.error){
				setKlassDisplay({...klassDisplay, klass: data.klass, toggleClassForm: false})
      } else {
        console.log(data.error)
      }
    })
  }

  const renderClassSkillsFetch = (e, skills_data, method)=> {
    e.preventDefault()
    fetch(`${localhost}/api/v1/class_skillset_skills`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_id: klassDisplay.klass.id,
        skills: skills_data,
        skillset_id: props.currentUser.skillset_id
      })
    })
    .then(r => r.json())
    .then(data => {
      if(!data.error){
				setKlassDisplay({...klassDisplay, klass: data.klass, toggleClassSkillsForm: false})
      } else {
        console.log(data.error)
      }
    })
  }

  const submitSpellsPerDay = (nestedSpells) => {
    fetch(`${localhost}/api/v1/spells_per_day`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        spells_per_day: nestedSpells,
        klass_id: klassDisplay.klass.id
      })
    })
    .then(r => r.json())
    .then(data => {
			setKlassDisplay({...klassDisplay, klass: data.klass, toggleSpellsForm: false})
    })
  }

  const renderClassFeature = (newData) => {
    let remappedFeatures
    if (Number.isInteger(newData)) {
      remappedFeatures = klassDisplay.klass.klass_features.filter(feature => {
        return feature.id !== newData
      })
    } else if (!klassDisplay.klass.klass_features.find(el => el.id === newData.klass_feature.id)){
      remappedFeatures = klassDisplay.klass.klass_features
      remappedFeatures.push(newData.klass_feature)
    } else if (typeof newData === 'object'){
      remappedFeatures = klassDisplay.klass.klass_features.map(feature => {
        return feature.id === newData.id ? newData : feature
      })
    }
    setKlassDisplay({
			...klassDisplay,
      klass: {
        ...klassDisplay.klass,
        klass_features: remappedFeatures
      },
      toggleFeatureForm: false
    })
  }

  const fetchClassFeatureEffect = (state, effect) => {
    fetch(`${localhost}/api/v1/${effect}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ability_score: state.abilityScore,
        prepared: state.prepared,
        limited: state.limited,
        klass_feature_id: klassDisplay.modal
      })
    })
    .then(r =>  r.json())
    .then(data => {
      setKlassDisplay({...klassDisplay, klass: data.klass, modal: false})
      // confirm that this works?
    })
  }

  const toggleModal = (id) => {
    console.log("this feature is being adjusted", id)
    setKlassDisplay({...klassDisplay, modal: id})
  }

  const clickOut = (e) => {
    if(e.target.classList[0] === "page-dimmer"){
      setKlassDisplay({...klassDisplay, modal: false})
    }
  }
  const exitModal = () => {
    setKlassDisplay({...klassDisplay, modal: false})
  }

  const featuresTab = () => {
    let featureOptions = false
    let feature = ""
    let featureOptionsArray = []
    // klassDisplay.klass.klass_features.forEach(kf => {
    //   if (kf.feature_options.length){
    //     featureOptions = true
    //     feature = kf.name
    //     featureOptionsArray = kf.feature_options
    //   }
    // })
    if (!featureOptions){
      return <Features klass={klassDisplay.klass} renderClassFeature={renderClassFeature} modal={klassDisplay.modal} toggleModal={toggleModal} chosenArchetypes={props.chosenArchetypes}/>
    } else {
      return (
        <div>
          <div id='options-toggle'>
            <span className={toggleFeatureOptionCSS("features")} onClick={() => setKlassDisplay({...klassDisplay, features: true})}>Class Features</span><span className={toggleFeatureOptionCSS("options")} onClick={() => setKlassDisplay({...klassDisplay, features: false})}>{feature}</span>
          </div>
          {
            klassDisplay.features ?
              <Features klass={klassDisplay.klass} renderClassFeature={renderClassFeature} modal={klassDisplay.modal} toggleModal={toggleModal}/>
            :
              <FeatureOptions options={featureOptionsArray} />
          }
        </div>
      )
    }
  }

  const toggleFeatureOptionCSS = (feature) => {
    if ((klassDisplay.features && feature === "features") || (!klassDisplay.features && feature === "options")){
      return "tab-list-active"
    } else {
      return "none"
    }
  }

	const displayTable = () => {
		if (props.options?.displayTable === false){return null}
		return <Table klass={klassDisplay.klass}/>
	}

  return (
    <span className='roboto show'>
      {klassDisplay.klass.name && <Introduction klass={klassDisplay.klass} options={props.options} chosenArchetypes={props.chosenArchetypes}/>}
      {props.admin ? <button onClick={toggleClassForm}>{klassDisplay.toggleClassForm ? "Hide Edit Class" : "Edit Class"}</button> : null}
      {klassDisplay.toggleClassForm ? <ClassForm toggleClassForm={klassDisplay.toggleClassForm} klass={klassDisplay.klass} renderClassEdit={renderClassEdit} history={props.history} /> : null }

      {props.admin && <><button onClick={toggleClassSkillsForm}>{klassDisplay.toggleClassSkillsForm ? "Hide Skills Form" : "Skills Form"}</button><br/><button onClick={toggleSpellsForm}>{klassDisplay.toggleSpellsForm ? "Hide Spells Form" : "Spells Form"}</button></>}

      {klassDisplay.toggleClassSkillsForm && <ClassSkillsForm toggleClassSkillsForm={klassDisplay.toggleClassSkillsForm} klass={klassDisplay.klass} renderClassSkills={renderClassSkillsFetch} />}

      {klassDisplay.toggleSpellsForm && <SpellsForm submitSpellsPerDay={submitSpellsPerDay} toggleSpellsForm={klassDisplay.toggleSpellsForm} klass={klassDisplay.klass}/>}

      {displayTable()}

      {klassDisplay.klass.name && featuresTab()}
      {props.admin ? <button onClick={changeAddFeatureToggle}>{klassDisplay.toggleFeatureForm ? "Hide new Feature Form" : "Add a new Class Feature"}</button> : null}

      <FeatureForm toggleFeatureForm={klassDisplay.toggleFeatureForm} renderSubmit={renderSubmit}/>

      {klassDisplay.modal && <FeatureEffect exitModal={exitModal} clickOut={clickOut} fetch={fetchClassFeatureEffect}/>}
    </span>
  )
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(ClassShow)
