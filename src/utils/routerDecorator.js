/**
 * Created by Yun on 2016-03-13.
 */

export function wrapOnEnter(onEnter) {
  return (nextState, replace, callback) => {
    Promise.resolve(onEnter(nextState, replace)).then(callback);
  };
}

export default function router(path) {
  return (ComponentClass) => {
    const target = ComponentClass;
    target.routeConfig = {
      path,
      component: target,
      onEnter: target.onEnter && wrapOnEnter(target.onEnter),
      childRoutes: target.childRoutes && target.childRoutes.map(v => v.routeConfig || v),
      indexRoute: target.indexRoute && (target.indexRoute.routeConfig || target.indexRoute),
      title: target.title,
      hideNavBar: target.hideNavBar,
      leftNavTitle: target.leftNavTitle,
      rightNavTitle: target.rightNavTitle,
    };
  };
}
