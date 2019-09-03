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

class Class extends React.Component {

  state ={
    klass : {},
    toggleFeatureForm: false,
    toggleClassForm: false,
    toggleClassSkillsForm: false,
    toggleSpellsForm: false
  }

  renderURL = () => {
    let url = window.location.href
    let urlArray = url.split("/")
    return urlArray[urlArray.length - 1]
  }

  componentDidMount() {
    const klass = this.renderURL()
    fetch(`http://localhost:3000/api/v1/klasses/${klass}`)
    .then(r => r.json())
    .then(data => this.setState({klass: data.klass}))
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

        {this.state.toggleSpellsForm && <SpellsForm toggleSpellsForm={this.state.toggleSpellsForm} klass={this.state.klass}/>}

        <Table klass={this.state.klass}/>
        <div className='header' style={{marginLeft: '2em'}}>Class Features</div>
        <Features klass={this.state.klass} renderClassFeature={this.renderClassFeature} />

        {this.props.admin ? <button onClick={this.changeAddFeatureToggle}>{this.state.toggleFeatureForm ? "Hide new Feature Form" : "Add a new Class Feature"}</button> : null}
        < br />
        < br />

        <FeatureForm toggleFeatureForm={this.state.toggleFeatureForm} renderSubmit={this.renderSubmit}/>
      </span>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(Class)
