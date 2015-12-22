/**
 * Created by tdzl2_000 on 2015-12-22.
 */

import React, {
  View,
  Text,
} from 'react-native';

import styles from './Splash.styles';

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>
          Hello, React-Native Starter Kit!
        </Text>
      </View>
    );
  }
}
