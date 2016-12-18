/**
 * Created by tdzl2003 on 12/17/16.
 */
import Splash from './Splash';

import auth from './auth';
import home from './home';
import NavBar from './NavBar';

export default {
  path: '/',
  component: NavBar,
  childRoutes: [
    Splash,
    auth,
    home,
  ].map(v => v.routeConfig || v),
};
