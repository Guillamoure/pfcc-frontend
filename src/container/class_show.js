import React from 'react'
// import _ from 'lodash'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


import Introduction from '../components/class_show/introduction'
import Table from '../components/class_show/table'
import Features from '../components/class_show/feature_list'
import FeatureForm from '../components/class_show/feature_form'
import ClassForm from  '../components/class_form'
import ClassSkillsForm from '../components/class_skills_form'
import SpellsForm from '../components/spells_form'

import FeatureEffect from '../modals/classes/effect'
import FeatureOptions from '../components/class_show/feature_options'

class Class extends React.Component {

  state ={
    klass : {},
    toggleFeatureForm: false,
    toggleClassForm: false,
    toggleClassSkillsForm: false,
    toggleSpellsForm: false,
    modal: false,
    features: true
  }

  renderURL = () => {
    let url = window.location.href
    let urlArray = url.split("/")
    return urlArray[urlArray.length - 1]
  }

  componentDidMount() {
    const klass = this.renderURL()
    let fw = ""
    if (klass === "Fate%20Weaver"){
      fw = "Fate Weaver"
    }
    if (this.props.classes.find(kl => kl.name === klass || kl.name === fw)){
      let selectedClass = this.props.classes.find(kl => kl.name === klass || kl.name === fw)
      this.setState({klass: selectedClass})
    } else {
      fetch(`http://localhost:3000/api/v1/klasses/${klass}`)
      .then(r => r.json())
      .then(data => this.setState({klass: data.klass}))
    }
  }

  changeAddFeatureToggle = () => {
    this.setState({toggleFeatureForm: !this.state.toggleFeatureForm})
  }
  toggleClassForm = () => {
    this.setState({toggleClassForm: !this.state.toggleClassForm})
  }

  toggleClassSkillsForm = () => {
    this.setState({toggleClassSkillsForm: !this.state.toggleClassSkillsForm})
  }
  toggleSpellsForm = () => {
    this.setState({toggleSpellsForm: !this.state.toggleSpellsForm})
  }

  renderSubmit = (e, feature) => {
    e.preventDefault()

    fetch('http://localhost:3000/api/v1/klass_features', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_id: this.state.klass.id,
        features: feature
      })
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error){
        this.renderClassFeature(data)
      } else {
        console.log(data.error)
      }
    })
  }

  renderClassEdit = (e, klass_updates) => {
    e.preventDefault()

    fetch(`http://localhost:3000/api/v1/klasses/${this.state.klass.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_id: this.state.klass.id,
        updates: klass_updates
      })
    })
    .then(r => r.json())
    .then(data => {
      if(!data.error){
        this.setState({klass: data.klass, toggleClassForm: false})
      } else {
        console.log(data.error)
      }
    })
  }

  renderClassSkillsFetch = (e, skills_data, method)=> {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/class_skillset_skills`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        klass_id: this.state.klass.id,
        skills: skills_data,
        skillset_id: this.props.currentUser.skillset_id
      })
    })
    .then(r => r.json())
    .then(data => {
      if(!data.error){
        this.setState({klass: data.klass, toggleClassSkillsForm: false})
      } else {
        console.log(data.error)
      }
    })
  }

  submitSpellsPerDay = (nestedSpells) => {
    fetch(`http://localhost:3000/api/v1/spells_per_day`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        spells_per_day: nestedSpells,
        klass_id: this.state.klass.id
      })
    })
    .then(r => r.json())
    .then(data => {
      debugger
      this.setState({klass: data.klass, toggleSpellsForm: false})
    })
  }

  renderClassFeature = (newData) => {
    let remappedFeatures
    if (Number.isInteger(newData)) {
      remappedFeatures = this.state.klass.klass_features.filter(feature => {
        return feature.id !== newData
      })
    } else if (!this.state.klass.klass_features.find(el => el.id === newData.klass_feature.id)){
      remappedFeatures = this.state.klass.klass_features
      remappedFeatures.push(newData.klass_feature)
    } else if (typeof newData === 'object'){
      remappedFeatures = this.state.klass.klass_features.map(feature => {
        return feature.id === newData.id ? newData : feature
      })
    }
    this.setState({
      klass: {
        ...this.state.klass,
        klass_features: remappedFeatures
      },
      toggleFeatureForm: false
    })
  }

  fetchClassFeatureEffect = (state, effect) => {
    debugger
    fetch(`http://localhost:3000/api/v1/${effect}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ability_score: state.abilityScore,
        prepared: state.prepared,
        limited: state.limited,
        klass_feature_id: this.state.modal
      })
    })
    .then(r =>  r.json())
    .then(data => {
      this.setState({klass: data.klass, modal: false})
      // confirm that this works?
    })
  }

  toggleModal = (id) => {
    console.log("this feature is being adjusted", id)
    this.setState({modal: id})
  }

  clickOut = (e) => {
    if(e.target.classList[0] === "page-dimmer"){
      this.setState({modal: false})
    }
  }
  exitModal = () => {
    this.setState({modal: false})
  }

  featuresTab = () => {
    let featureOptions = false
    let feature = ""
    let featureOptionsArray = []
    this.state.klass.klass_features.forEach(kf => {
      if (kf.feature_options.length){
        featureOptions = true
        feature = kf.name
        featureOptionsArray = kf.feature_options
      }
    })
    if (!featureOptions){
      return <Features klass={this.state.klass} renderClassFeature={this.renderClassFeature} modal={this.state.modal} toggleModal={this.toggleModal}/>
    } else {
      return (
        <div>
          <div id='options-toggle'>
            <span className={this.toggleFeatureOptionCSS("features")} onClick={() => this.setState({features: true})}>Class Features</span><span className={this.toggleFeatureOptionCSS("options")} onClick={() => this.setState({features: false})}>{feature}</span>
          </div>
          {
            this.state.features ?
              <Features klass={this.state.klass} renderClassFeature={this.renderClassFeature} modal={this.state.modal} toggleModal={this.toggleModal}/>
            :
              <FeatureOptions options={featureOptionsArray} />
          }
        </div>
      )
    }
  }

  toggleFeatureOptionCSS = (feature) => {
    if ((this.state.features && feature === "features") || (!this.state.features && feature === "options")){
      return "tab-list-active"
    } else {
      return "none"
    }
  }

  render() {
    console.log("Class info", this.state.klass)
    return (
      <span className='roboto show'>
        {this.state.klass.name && <Introduction klass={this.state.klass}/>}
        {this.props.admin ? <button onClick={this.toggleClassForm}>{this.state.toggleClassForm ? "Hide Edit Class" : "Edit Class"}</button> : null}
        {this.state.toggleClassForm ? <ClassForm toggleClassForm={this.state.toggleClassForm} klass={this.state.klass} renderClassEdit={this.renderClassEdit} history={this.props.history} /> : null }

        {this.props.admin ? <button onClick={this.toggleClassSkillsForm}>{this.state.toggleClassSkillsForm ? "Hide Skills Form" : "Skills Form"}</button> : null}
        {this.props.admin ? <button onClick={this.toggleSpellsForm}>{this.state.toggleSpellsForm ? "Hide Spells Form" : "Spells Form"}</button> : null}

        {this.state.toggleClassSkillsForm && <ClassSkillsForm toggleClassSkillsForm={this.state.toggleClassSkillsForm} klass={this.state.klass} renderClassSkills={this.renderClassSkillsFetch} />}

        {this.state.toggleSpellsForm && <SpellsForm submitSpellsPerDay={this.submitSpellsPerDay} toggleSpellsForm={this.state.toggleSpellsForm} klass={this.state.klass}/>}

        <Table klass={this.state.klass}/>

        <div className='header' style={{marginLeft: '2em'}}>Class Features</div>
        {this.state.klass.name && this.featuresTab()}
        {this.props.admin ? <button onClick={this.changeAddFeatureToggle}>{this.state.toggleFeatureForm ? "Hide new Feature Form" : "Add a new Class Feature"}</button> : null}

        < br />< br />

        <FeatureForm toggleFeatureForm={this.state.toggleFeatureForm} renderSubmit={this.renderSubmit}/>

        {this.state.modal && <FeatureEffect exitModal={this.exitModal} clickOut={this.clickOut} fetch={this.fetchClassFeatureEffect}/>}
      </span>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    classes: state.classes
  }
}

export default connect(mapStatetoProps)(Class)
