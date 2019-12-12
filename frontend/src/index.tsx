import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from './router';
import cofigureStore from './redux';

const initState = {};
const store = cofigureStore(initState);

const rootEle = document.getElementById("root");
const components = (
  <Provider store={store}>
    <Router />
  </Provider>
)

ReactDOM.render(
  components,
  rootEle
)