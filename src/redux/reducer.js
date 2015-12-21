/**
 * Created by Yun on 2015-12-21.
 */
import { combineReducers } from 'redux';

import sessionReducer from './modules/session';

export default combineReducers({
  session: sessionReducer,
});
