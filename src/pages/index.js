/**
 * Created by tdzl2003 on 12/17/16.
 */
import Splash from './Splash';

import auth from './auth';
import home from './home';

export default {
  path: '/',
  childRoutes: [
    Splash,
    auth,
    home,
  ].map(v => v.routeConfig || v),
};
