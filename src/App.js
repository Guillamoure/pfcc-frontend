import React from 'react';
import './App.css';
import logo from './logo.svg';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './container/home'
import Classes from './container/classes'
import Class from './container/class_show'

import Login from './components/login'
import SignUp from './components/signup'
import ClassForm from './components/class_form'


class App extends React.Component {



  render(){

    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/classes" component={Classes} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/classes-form" component={ClassForm} />
          <Route exact path="/classes/:slug" component={Class} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
