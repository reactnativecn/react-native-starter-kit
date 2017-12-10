import { Record } from 'immutable';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { NavigationActions, NavigationDispatch, NavigationState } from "react-navigation";
import {
  combineReducers,
} from 'redux-immutable';
import { AppNavigator } from '../screens';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import main from '../sagas/index';

const StoreRecord = Record({
  navigation: null,
});

export class StoreState extends StoreRecord {
  navigation: NavigationState;

  static reducer = combineReducers({
    navigation: (state, action) => AppNavigator.router.getStateForAction(action, state) || state,
  });
};

export const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [
  sagaMiddleware,
];

if (__DEV__) {
  middlewares.push(logger);
}

const store = createStore(
  StoreState.reducer,
  new StoreState(),
  applyMiddleware(
    ...middlewares
  ),
);

sagaMiddleware.run(main);

export default store;
