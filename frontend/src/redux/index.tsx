import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import baseReducer from './reducer';

const logger: any = createLogger();

export default (preloaderState: any) => {
  const middlewares: Array<any> = [thunk];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const store = createStore(
    baseReducer,
    preloaderState,
    compose(applyMiddleware(...middlewares)),
  )
  
  return store;
}



