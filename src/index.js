import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore } from 'redux'
import { Provider } from 'react-redux'




const initialState = {
  currentUser: null,
  admin: false
}



const reducer = (state = initialState, action) => {
  console.log('State Changer is called')
  console.log('current state is', state)
  console.log('the action is', action)

  switch(action.type){
    case ('SIGNIN'):
      return {...state, currentUser: action.user, admin: action.admin};
    default:
      return state
  }
}


const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
