import React from 'react';
import './App.css';
import './css/character.css';
import './css/combat.css';
import './css/card.css';
import './css/container.css';
import './css/animations.css';
import './css/form.css';
import './css/new.scss'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from './localhost'


import Home from './container/home'
import Classes from './container/classes'
import Races from './container/races'
import Skills from './container/skills'
import Spells from './container/spells'
import Class from './container/class_show'
import NavBar from './container/navbar'
import Race from './container/race_show'
import Skill from './container/skill_show'
import CharacterCreation from './container/character_creation'
import Character from './container/character_show'
import Campaign from './container/campaign_show'
import NewCampaign from './container/new_campaign'

import Login from './components/login'
import SignUp from './components/signup'
import ClassForm from './components/class_form'
import RaceForm from './components/race_form'
import SkillForm from './components/skill_form'



class App extends React.Component {

  // COMMENTED OUT FOR TESTING PURPOSES
  // componentDidMount(){
  //   fetch(`${localhost}/api/v1/data`)
  //   .then(r => r.json())
  //   .then(data => {
  //     this.props.dispatch({type: 'EVERYTHING', classes: data.klasses, races: data.races })
  //   })
  // }
  // COMMENTED OUT FOR TESTING PURPOSES


  render(){
    let computer
    if (window.outerWidth/window.outerHeight < 0.85){
      console.log("Imma Phone! Here is my width/height percentage", window.outerWidth/window.outerHeight)
      computer = false
    } else {
      console.log("Imma Computer! Here is my width/height percentage", window.outerWidth/window.outerHeight)
      computer = true
    }
    localStorage.setItem("computer", computer)
    return (
        <Router>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/classes" component={Classes} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/classes-form" component={ClassForm} />
              <Route exact path="/classes/:slug" component={Class} />
              <Route exact path="/races" component={Races} />
              <Route exact path="/races-form" component={RaceForm} />
              <Route exact path="/races/:slug" component={Race} />
              <Route exact path="/skills" component={Skills} />
              <Route exact path="/skills-form" component={SkillForm} />
              <Route exact path="/skills/:slug" component={Skill} />
              <Route exact path="/spells" component={Spells} />
              <Route exact path="/creation" component={CharacterCreation} />
              <Route exact path="/characters/:slug" component={Character} />
              <Route exact path="/campaigns/new" component={NewCampaign} />
              <Route path="/campaigns/:slug" component={Campaign} />
            </Switch>
          </React.Fragment>
        </Router>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin
  }
}

export default connect(mapStatetoProps)(App);
