import React from 'react';
import logo from './logo.svg';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './container/home'
import Classes from './container/classes'
import './App.css';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/classes" component={Classes} />
      </React.Fragment>
    </Router>
  );
}

export default App;
