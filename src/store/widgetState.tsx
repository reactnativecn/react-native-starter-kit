import * as React from 'react';
import { connect, Dispatch, DispatchProp } from 'react-redux';
import { createAction, Action, Reducer } from 'redux-actions';
import { sagaMiddleware } from './index';
import { Map } from 'immutable';
import { Task, Pattern, Predicate } from 'redux-saga';
import { call, setContext, getContext, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

let idCounter = 0;
function genKey(name: string) {
  let key = (++idCounter).toString(36);
  if (__DEV__) {
    return `${name}-${key}`;
  }
  return key;
}

const widgetInstanceType: { [key: string]: Reducer<any, any> } = {};

export interface StoreStateInterface {
  widgetState: Map<string, any>;
}

export interface WidgetProps<WidgetState> {
  widgetKey: string;
  widgetState: WidgetState;
}

export interface ActionWithWidgetKey<Payload> extends Action<Payload> {
  widgetKey?: string;
}

function mapStateToProps(state: StoreStateInterface, { widgetKey }: { widgetKey: string }) {
  return { widgetState: state.widgetState.get(widgetKey) };
}

export type ActionMap = { [key: string]: Action<any> };

function mapDispatchToProps<ActionMapType>(actions: ActionMapType) {
  return function<StoreState extends StoreStateInterface>(
    dispatch: Dispatch<StoreState>,
    { widgetKey }: { widgetKey: string },
  ): ActionMapType {
    const ret: any = {};
    for (const key of Object.keys(actions)) {
      const actionCreator = (actions as any)[key];
      ret[key] = (...args: any[]) => dispatch({ ...actionCreator(...args), widgetKey });
    }
    return ret;
  };
}

function noop<WidgetState>(state: WidgetState) {
  return state;
}

export const INIT = '@@Widget/INIT';
export const init = createAction(INIT);

export const UNLOAD = '@@Widget/UNLOAD';
export const unload = createAction(UNLOAD);

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

// 用来包装一个widget，替代connect，并提供widgetKey和widgetState属性。
// actions 可以包含local actions或全局actions，但发出的action都会有widgetKey字段。
export function widget<TActions = {}, WidgetState = {}>(
  reducer: Reducer<WidgetState, any> = noop,
  actions: TActions = {} as TActions,
  saga: (() => Iterator<any>) | undefined = undefined,
) {
  type TInjectedProps = TActions & WidgetProps<WidgetState> & DispatchProp<any>;
  return function<P extends TInjectedProps>(Comp: React.ComponentType<P>) {
    type TNeedsProps = Omit<P, keyof TInjectedProps>;
    const name = (Comp as any).displayName || (Comp as any).name;
    if (!name) {
      throw new Error('Component must have a name');
    }

    const ConnectedComp = connect(mapStateToProps, mapDispatchToProps(actions))(Comp);

    const Wrapped = class WrappedWidget extends React.Component<TNeedsProps> {
      widgetKey = genKey(name);
      task: Task | null = null;
      constructor(props: TNeedsProps) {
        super(props);
        widgetInstanceType[this.widgetKey] = reducer;
      }
      componentWillMount() {
        const { dispatch } = this.props;
        if (dispatch) {
          dispatch({ ...init(), widgetKey: this.widgetKey });
        }
        if (saga) {
          const { dispatch } = this.props;
          const { widgetKey } = this;
          this.task = sagaMiddleware.run(function*() {
            yield setContext({ widgetKey });
            yield call(saga);
          });
        }
      }
      componentWillUnmount() {
        const { dispatch } = this.props;
        if (dispatch) {
          dispatch({ ...unload(), widgetKey: this.widgetKey });
        }
        delete widgetInstanceType[this.widgetKey];
        if (this.task) {
          this.task.cancel();
        }
      }
      render() {
        const { dispatch, ...others } = this.props as any;
        return <ConnectedComp {...others} widgetKey={this.widgetKey} />;
      }
    };

    return connect()(Wrapped);
  };
}

// 核心reducer，用来清空移除的widget或分发事件到对应的reducer
export default function reducer(state: Map<string, any>, action: ActionWithWidgetKey<any>) {
  const { widgetKey } = action;
  if (widgetKey) {
    const widgetState = state.get(widgetKey);
    const reducer = widgetInstanceType[widgetKey];
    const nextState = reducer(widgetState, action);

    if (action.type === UNLOAD) {
      state = state.delete(widgetKey);
    } else {
      state = state.set(widgetKey, nextState);
    }
  }
  return state;
}

function localRule(key: string, rule?: Pattern): Pattern {
  if (!rule || rule === '*') {
    return (action: ActionWithWidgetKey<any>) => action.widgetKey === key;
  }
  if (typeof rule === 'function') {
    if (rule.hasOwnProperty('toString')) {
      rule = rule.toString();
    } else {
      return (action: ActionWithWidgetKey<any>) => action.widgetKey === key && (rule as Predicate<Action<any>>)(action);
    }
  }
  return (action: ActionWithWidgetKey<any>) => {
    return action.widgetKey === key && action.type === rule;
  };
}

export function takeInWidget(rule?: Pattern) {
  return call(function*() {
    const key = yield getContext('widgetKey');
    return yield take(localRule(key, rule));
  });
}

export function takeEveryInWidget(rule: Pattern, worker: any, ...args: any[]) {
  return call(function*() {
    const key = yield getContext('widgetKey');
    return yield takeEvery(localRule(key, rule), worker, ...args);
  });
}

export function takeLatestInWidget(rule: Pattern, worker: any, ...args: any[]) {
  return call(function*() {
    const key = yield getContext('widgetKey');
    return yield takeLatest(localRule(key, rule), worker, ...args);
  });
}

export function putInWidget<Payload>(action: Action<Payload>) {
  return call(function*() {
    const widgetKey = yield getContext('widgetKey');
    return yield put({ ...action, widgetKey });
  });
}
