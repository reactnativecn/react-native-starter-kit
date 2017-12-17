import { Pattern, SagaIterator, Predicate } from "redux-saga";
import { call, getContext, take, takeEvery, takeLatest, put } from "redux-saga/effects";
import { Action, Dispatch, bindActionCreators, ActionCreatorsMapObject, Reducer } from 'redux';
import { connect, MapStateToPropsParam, InferableComponentEnhancerWithProps } from "react-redux";
import { NavigationScreenProps, NavigationState, NavigationRouter, NavigationContainer, NavigationComponent, NavigationNavigator } from 'react-navigation';

export interface ScreenAction extends Action {
  screenKey?: string;
}

export interface ScreenProps<ParamType> {
  screenKey: string;
  screenParams: ParamType;
}

function mergeActionCreators<TScreenActions, TGlobalActions, State>(screenActions: TScreenActions, globalActions: TGlobalActions, dispatch: Dispatch<State>, ownProps: NavigationScreenProps<any>): TScreenActions & TGlobalActions {
  const ret: any = {};
  const screenKey = ownProps.navigation.state.key;

  if (screenActions) {
    for (const k of Object.keys(screenActions)) {
      const f = (screenActions as any)[k];
      ret[k] = (...args: any[]) => dispatch({ ...f(...args), screenKey });
    }
  }
  if (globalActions) {
    for (const k of Object.keys(globalActions)) {
      const f = (globalActions as any)[k];
      ret[k] = (...args: any[]) => dispatch(f(...args));
    }
  }

  return ret as any;
}

export function connectScreen<TStateProps={}, TScreenActions={}, TGlobalActions={}, TOwnProps={}, State={}>(
  selector: MapStateToPropsParam<TStateProps, TOwnProps & NavigationScreenProps<any>, State> | null | undefined,
  screenActions: TScreenActions,
  globalActions?: TGlobalActions,
): InferableComponentEnhancerWithProps<TStateProps & TScreenActions & TGlobalActions & ScreenProps<any>, TOwnProps & NavigationScreenProps<any>> {
  return connect(
    (state: State, props: TOwnProps & NavigationScreenProps<any>) => ({ ...(selector && selector(state, props) || {}), screenKey: props.navigation.state.key, screenParams: props.navigation.state.params }),
    (dispatch: Dispatch<State>, props: TOwnProps & NavigationScreenProps<any>) => mergeActionCreators(screenActions, globalActions, dispatch, props),
  )
}

function inScreenRule(key: string, rule?: Pattern): Pattern {
  if (!rule || rule === '*') {
    return (action: ScreenAction) => action.screenKey === key;
  }
  if (typeof rule === 'function') {
    if (rule.hasOwnProperty('toString')) {
      rule = rule.toString();
    } else {
      return (action: ScreenAction) => action.screenKey === key && (rule as Predicate<Action>)(action);
    }
  }
  return (action: ScreenAction) => {
    return action.screenKey === key && action.type === rule;
  };
}

export function takeInScreen(rule?: Pattern) {
  return call(function* (): SagaIterator {
    const key = yield getContext('screenKey');
    return yield take(inScreenRule(key, rule));
  })
}

export function takeEveryInScreen(rule: Pattern, worker: any, ...args: any[]) {
  return call(function* (): SagaIterator {
    const key = yield getContext('screenKey');
    return yield takeEvery(inScreenRule(key, rule), worker, ...args);
  })
}

export function takeLatestInScreen(rule: Pattern, worker: any, ...args: any[]) {
  return call(function* (): SagaIterator {
    const key = yield getContext('screenKey');
    return yield takeLatest(inScreenRule(key, rule), worker, ...args);
  })
}

export function putInScreen<T extends Action>(action: T) {
  return call(function* (): SagaIterator {
    const screenKey = yield getContext('screenKey');
    return yield put({ ...action as any, screenKey });
  })
}

function mapStateReducer(state: any, action: ScreenAction, root: NavigationComponent) {
  const nav = root as NavigationNavigator<any, any, any, any>;
  if (nav.router) {
    let routes = null;
    for (let i = 0; i < state.routes.length; i++) {
      const subRoute = state.routes[i];
      const newState = mapStateReducer(subRoute, action, nav.router.getComponentForRouteName(subRoute.routeName))
      if (newState !== subRoute) {
        routes = routes || [...state.routes];
        routes[i] = newState;
      }
    }
    if (routes) {
      return {
        ...state,
        routes,
      };
    } else {
      return state;
    }
  }

  if (state.key !== action.screenKey) {
    // Not this page.
    return;
  }

  const comp = root as any as { reducer?: Reducer<any> };

  if (!comp.reducer) {
    return state;
  }

  const newParams = comp.reducer(state.params, action);
  if (newParams !== state.params) {
    return {
      ...state,
      params: newParams,
    }
  }
  return state;
}

export function screenReducerFactory(root: NavigationComponent) {
  return function (state: NavigationState, action: ScreenAction) {
    if (!action.screenKey) {
      return state;
    }
    return mapStateReducer(state, action, root);
  }
}
