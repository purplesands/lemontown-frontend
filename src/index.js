import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';


const initialState = {
  cool: false
}
function reducer(state=initialState, action){
  console.log(state, action)
  switch(action.type) {
    case "COOL":
    return {...state, cool: !state.cool}
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
  // <Router>
    <App />
    // </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
