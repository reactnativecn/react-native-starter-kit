/**
 * Created by Yun on 2015-12-21.
 */
import { createStore as _createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

const finalCreateStore = applyMiddleware(
  thunkMiddleware
)(_createStore);

const store = finalCreateStore(reducer);
export default store;
