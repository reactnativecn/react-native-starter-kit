/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import route from '../../utils/routerDecorator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

@route('personal')
export default class Personal extends Component {
  render() {
    return (
      <View style={styles.container} />
    );
  }
}
