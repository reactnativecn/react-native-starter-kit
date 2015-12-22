/**
 * Created by Yun on 2015-12-20.
 */

import { Provider } from 'react-redux';
import store from './redux/store';

import React, {
  AppRegistry,
  Platform,
  BackAndroid,
  Navigator,
} from 'react-native';

import Splash from './pages/Splash';

class App extends React.Component {
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  onBackAndroid = () => {
    const nav = this.refs.navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    return false;
  };
  initialRoute = {
    component: Splash,
  };
  configureScene() {
    if (Platform.OS === 'ios') {
      return Navigator.SceneConfigs.PushFromRight;
    }
    return Navigator.SceneConfigs.FloatFromBottomAndroid;
  }
  renderScene(route, navigator) {
    const Component = route.component;

    return (
      <Component {...route.params} navigator={navigator} />
    );
  }
  render() {
    return (
      <Provider store={store} key="provider">
        <Navigator
          ref={nav => { this.navigator = nav; }}
          initialRoute={this.initialRoute}
          configureScene={() => this.configureScene()}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MyProject', () => App);
