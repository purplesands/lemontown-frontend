import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import store from './store';
import { Provider } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider'
import { BrowserRouter as Router, Route } from 'react-router-dom'





ReactDOM.render(
  <ActionCableProvider url={'wss://lemon-town-api.herokuapp.com/cable'}>
    <Provider store={store}>
      <Router>
          <Route path="/" component={App}/>
      </Router>
    </Provider>
  </ActionCableProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
