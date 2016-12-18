/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import router from '../utils/routerDecorator';
import { loadToken } from '../logics/rpc';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

@router('splash')
export default class Splash extends Component {
  static hideNavBar = true;
  static contextTypes = {
    navigator: PropTypes.object,
  };
  async componentWillMount() {
    const { navigator } = this.context;
    if (await loadToken()) {
      navigator.replace({ location: '/home/home' });
    } else {
      navigator.replace({ location: '/auth/login' });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>This is splash page</Text>
      </View>
    );
  }
}
