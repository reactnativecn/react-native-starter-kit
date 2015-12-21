/**
 * Created by Yun on 2015-12-20.
 */

import { Provider } from 'react-redux';
import store from './redux/store';

import React, {
  AppRegistry,
  View,
} from 'react-native';

class App extends React.Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <View />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MyProject', () => App);
