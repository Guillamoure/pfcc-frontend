import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './container/home'
import Classes from './container/classes'
import Races from './container/races'
import Class from './container/class_show'
import NavBar from './container/navbar'
import Race from './container/race_show'
import CharacterCreation from './container/character_creation'

import Login from './components/login'
import SignUp from './components/signup'
import ClassForm from './components/class_form'
import RaceForm from './components/race_form'



class App extends React.Component {


  render(){

    return (
        <Router>
          <React.Fragment>
            <NavBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/classes" component={Classes} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/classes-form" component={ClassForm} />
            <Route exact path="/classes/:slug" component={Class} />
            <Route exact path="/races" component={Races} />
            <Route exact path="/races-form" component={RaceForm} />
            <Route exact path="/races/:slug" component={Race} />
            <Route exact path="/creation" component={CharacterCreation} />
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
