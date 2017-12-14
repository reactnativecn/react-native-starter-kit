import { sagaMiddleware } from "../store/index";
import { Task, SagaIterator } from "redux-saga";
import { ComponentClass } from "react";
import { NavigationScreenProps } from "react-navigation";
import { call, setContext } from "redux-saga/effects";

export function autoFlow(component: any) {
  const { flow } = component;

  function *main(screenKey: string) {
    yield setContext({ screenKey });
    yield call(flow);
  }

  return class extends component {
    __flow?: Task;
    componentDidMount() {
      this.__flow = sagaMiddleware.run(main, this.props.navigation.state.key);

      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }
    componentWillUnmount() {
      if (this.__flow) {
        this.__flow.cancel();
        this.__flow = undefined;
      }
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }
  } as any as typeof component;
}

