/**
 * Created by tdzl2003 on 12/17/16.
 */
import Splash from './Splash';

export default {
  path: '/',
  childRoutes: [
    Splash,
  ].map(v => v.routeConfig || v),
};
