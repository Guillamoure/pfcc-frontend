import React from 'react';
import './App.scss';
import './css/character.css';
import './css/combat.css';
import './css/card.css';
import './css/container.css';
import './css/animations.scss';
import './css/form.scss';
import './css/mobile.scss';
import './css/popups.scss';
import './css/campaign-show.scss';
import './css/character-creation.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import localhost from './localhost'

import NavBar from './container/navbar'
import Tooltip from './modals/tooltip'
import ModalSkeleton from './modals/skeleton'
import Notifications from './components/modals/notifications'

import Home from './container/home'
import Classes from './container/classes'
import Races from './container/races'
import Skills from './container/skills'
import Spells from './container/spells'
import Class from './container/class_show'
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

import HowToFeature from './container/how_to_feature'



class App extends React.Component {

  // COMMENTED OUT FOR TESTING PURPOSES
  componentDidMount(){
    fetch(`${localhost}/api/v1/data`)
    .then(r => r.json())
    .then(data => {
      this.props.dispatch({type: 'EVERYTHING', classes: data.klasses, races: data.races, skills: data.skills})
    })
  }
  // COMMENTED OUT FOR TESTING PURPOSES


  render(){
    let computer
    console.log(this.props)
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
            {this.props.tooltip.message && <Tooltip />}
            {this.props.modal.detail && <ModalSkeleton />}
            {!!this.props.notifications.length && <Notifications />}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/classes" component={Classes} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/classes-form" component={ClassForm} />
              <Route exact path="/classes/:slug" component={Class} />
              <Route exact path="/ancestries" component={Races} />
              <Route exact path="/ancestries-form" component={RaceForm} />
              <Route exact path="/ancestries/:slug" component={Race} />
              <Route exact path="/skills" component={Skills} />
              <Route exact path="/skills-form" component={SkillForm} />
              <Route exact path="/skills/:slug" component={Skill} />
              <Route exact path="/spells" component={Spells} />
              <Route exact path="/creation" component={CharacterCreation} />
              <Route exact path="/characters/:slug" component={Character} />
              <Route exact path="/campaigns/new" component={NewCampaign} />
              <Route path="/campaigns/:slug" component={Campaign} />
              <Route path="/how-to-build-a-feature" component={HowToFeature} />
            </Switch>
          </React.Fragment>
        </Router>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    tooltip: state.tooltip,
    modal: state.modal,
		notifications: state.notifications
  }
}

export default connect(mapStatetoProps)(App);
