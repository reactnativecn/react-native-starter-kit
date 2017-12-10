import { sagaMiddleware } from "../store/index";
import { Task, SagaIterator } from "redux-saga";
import { ComponentClass } from "react";
import { NavigationScreenProps } from "react-navigation";

export function autoFlow(component: any) {
  const { flow } = component;

  return class extends component {
    __flow?: Task;
    componentDidMount() {
      this.__flow = sagaMiddleware.run(flow, this.props);

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

