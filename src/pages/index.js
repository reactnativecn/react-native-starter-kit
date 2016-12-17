/**
 * Created by tdzl2003 on 12/17/16.
 */
import Splash from './Splash';

import auth from './auth';

export default {
  path: '/',
  childRoutes: [
    Splash,
    auth,
  ].map(v => v.routeConfig || v),
};
