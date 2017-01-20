/**
 * Created by tdzl2003 on 12/17/16.
 */
import React, { Component } from 'react';
import {
  BackAndroid,
  AppState,
  StyleSheet,
  View,
  Navigator,
  ToastAndroid,
} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { observer } from 'mobx-react/native';
import { Subscribe, SubscribeDOM } from 'react-subscribe';
import routeConfig from './pages';
import NavigatorProvider from './utils/NavigatorProvider';
import RouterContainer from './utils/RouterContainer';
import RPC from './logics/rpc';
import hookNavigator from './utils/hookNavigator';
import { configureScene } from './SceneConfig';

const INITIAL_ROUTE = {
  location: '/splash',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
});

function configureSceneWithRoute(route) {
  return configureScene(routeConfig, route);
}

@observer
export default class App extends Component {
  lastBackPressed = 0;
  lastAppState = 'active';
  onHardwareBackPress = () => {
    const nav = this.navigator;
    if (!nav) {
      return false;
    }
    const routers = nav.getCurrentRoutes();

    if (routers.length > 1) {
      // 当按下back键时回退到上一页面
      nav.pop();
      return true;
    }
    const now = Date.now();
    if (now - this.lastBackPressed < 1500) {
      BackAndroid.exitApp();
    } else {
      this.lastBackPressed = now;
      ToastAndroid.show('再按一次返回键退出本应用', 1000);
    }

    return true;
  };
  onAppStateChange = (state) => {
    if (state === 'active' && this.lastAppState !== 'active') {
      dismissKeyboard();
    }
    this.lastAppState = state;
  };
  onWillFocus = () => {
    dismissKeyboard();
  };
  onInvalidToken = () => {
    const { navigator } = this;
    if (navigator) {
      navigator.immediatelyResetRouteStack([{
        location: '/auth/login',
      }]);
    }
  };
  onNavigatorRef = (ref) => {
    this.navigator = ref;
    if (ref) {
      hookNavigator(ref);
    }
  };
  renderScene = (currentRoute, navigator) => {
    const { location, passProps, component: Comp } = currentRoute || 0;
    if (location) {
      // 通过location渲染页面
      return (
        <NavigatorProvider navigator={navigator} currentRoute={currentRoute}>
          <RouterContainer
            routeConfig={routeConfig}
            passProps={passProps}
            location={location}
          />
        </NavigatorProvider>
      );
    } else if (Comp) {
      // 通过component渲染页面,用于Dialog等场景
      return (
        <NavigatorProvider navigator={navigator}>
          <Comp {...passProps} />
        </NavigatorProvider>
      );
    }
    return null;
  };
  render() {
    return (
      <View style={styles.root}>
        <SubscribeDOM target={AppState} eventName="change" listener={this.onAppStateChange} />
        {__ANDROID__ && <SubscribeDOM target={BackAndroid} eventName="hardwareBackPress" listener={this.onHardwareBackPress} />}
        <Subscribe target={RPC} eventName="invalidToken" listener={this.onInvalidToken} />
        <Navigator
          configureScene={configureSceneWithRoute}
          onWillFocus={this.onWillFocus}
          initialRoute={INITIAL_ROUTE}
          renderScene={this.renderScene}
          ref={this.onNavigatorRef}
        />
      </View>
    );
  }
}
