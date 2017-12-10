import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';

import { connect, Provider } from "react-redux";
import store, { StoreState } from './store';
import { AppNavigator } from './screens';
import { NavigationDispatch, NavigationStackAction, addNavigationHelpers } from 'react-navigation';

const Content = connect(
  ({ navigation } : StoreState) => ({ navigation })
)(function ({ navigation, dispatch }) {
  return (
    <AppNavigator
      navigation={addNavigationHelpers({
        dispatch: dispatch as NavigationDispatch<NavigationStackAction>,
        state: navigation,
      })}
    />
  );
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Content />
      </Provider>
    );
  }
}
