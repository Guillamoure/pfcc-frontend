import React from 'react';
import './App.css';
import logo from './logo.svg';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './container/home'
import Classes from './container/classes'

import Login from './components/login'
import SignUp from './components/signup'
import NewClass from './components/new_class'

function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/classes" component={Classes} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/classes/new" component={NewClass} />
      </React.Fragment>
    </Router>
  );
}

export default App;
