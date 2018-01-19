import { Record, Map } from 'immutable';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { NavigationAction, NavigationActions, NavigationDispatch, NavigationState } from "react-navigation";
import {
  combineReducers,
} from 'redux-immutable';
import { AppNavigator } from '../screens';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { mainFlow } from '../sagas/index';
import widgetStateReducer from './widgetState';

const StoreRecord = Record({
  navigation: null,
  widgetState: Map(),
});

export class StoreState extends StoreRecord {
  navigation: NavigationState;
  widgetState: Map<string, any>;

  static reducer = combineReducers({
    navigation: (state: NavigationState, action: NavigationAction) => AppNavigator.router.getStateForAction(action, state),
    widgetState: widgetStateReducer,
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

sagaMiddleware.run(mainFlow);

export default store;
