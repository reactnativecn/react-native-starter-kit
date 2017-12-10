import { Pattern, SagaIterator, Predicate } from "redux-saga";
import { call, getContext, take, takeEvery, takeLatest } from "redux-saga/effects";
import { Action } from 'redux';

export interface ScreenAction extends Action {
  navKey?: string;
}

function inScreenRule(key: string, rule?: Pattern): Pattern {
  if (!rule || rule === '*') {
    return (action: ScreenAction) => action.navKey === key;
  }
  if (typeof rule === 'function') {
    if (rule.hasOwnProperty('toString')) {
      rule = rule.toString();
    } else {
      return (action: ScreenAction) => action.navKey === key && (rule as Predicate<Action>)(action);
    }
  }
  return (action: ScreenAction) => action.navKey === key && action.type === rule;
}

export function takeInScreen(rule?: Pattern){
  return call(function*() : SagaIterator {
    const key = yield getContext('navKey');
    return take(inScreenRule(key, rule));
  })
}

export function takeEveryInScreen(rule: Pattern, worker: any, ...args: any[]) {
  return call(function*() : SagaIterator {
    const key = yield getContext('navKey');
    return takeEvery(inScreenRule(key, rule), worker, ...args);
  })
}

export function takeLatestInScreen(rule: Pattern, worker: any, ...args: any[]) {
  return call(function*() : SagaIterator {
    const key = yield getContext('navKey');
    return takeLatest(inScreenRule(key, rule), worker, ...args);
  })
}
