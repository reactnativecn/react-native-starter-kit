/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import router from '../utils/routerDecorator';
import LinkContainer from '../utils/LinkContainer';

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
  render() {
    return (
      <View style={styles.container}>
        <Text>This is splash page</Text>
        <LinkContainer to="/login">
          <Text onPress={this.go}>Click me to continue</Text>
        </LinkContainer>
      </View>
    );
  }
}
