/**
 * Created by Yun on 2015-12-21.
 */
import { createStore as _createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';
import createLogger from 'redux-logger';

const middleWares = [
  thunkMiddleware,
];

if (__DEV__) {
  middleWares.unshift(createLogger());
}

const finalCreateStore = applyMiddleware(
  ...middleWares
)(_createStore);

const store = finalCreateStore(reducer);
export default store;
