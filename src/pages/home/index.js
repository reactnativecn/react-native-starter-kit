/**
 * Created by tdzl2003 on 12/18/16.
 */
import TabBar from './TabBar';
import Home from './Home';
import Shop from './Shop';
import Personal from './Personal';

export default {
  path: 'home',
  component: TabBar,
  childRoutes: [
    Home,
    Shop,
    Personal,
  ].map(v => v.routeConfig || v),
};
