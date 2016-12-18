/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import route from '../../utils/routerDecorator';
import TestModal from './TestModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

@route('home')
export default class Home extends Component {
  static contextTypes = {
    navigator: PropTypes.object,
  };
  showTestModal = () => {
    const { navigator } = this.context;
    navigator.push({
      component: TestModal,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.showTestModal}>Click me to test modal</Text>
      </View>
    );
  }
}
