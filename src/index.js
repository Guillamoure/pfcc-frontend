import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './store'
import Initialization from './utils/websocket/initialization'


// import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import reducer from './reducer'
// import reduxThunk from 'redux-thunk'
// const Websocket = {}
// Websocket.cable = actionCable.createConsumer(`${websocket}/cable`)


Initialization()

// const store = createStore(reducer, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={Store}>
    <App/>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
