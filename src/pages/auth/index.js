/**
 * Created by tdzl2003 on 12/18/16.
 */
import Login from './Login';

export default {
  path: 'auth',
  childRoutes: [
    Login,
  ].map(v => v.routeConfig || v),
};
