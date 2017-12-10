import { View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import styles = require('./Splash.style');
import { NavigationScreenProps } from 'react-navigation';
import { autoFlow } from '../utils/autoFlow';
import { SagaIterator } from 'redux-saga';
import { connect } from 'react-redux';
import { take } from 'redux-saga/effects';

type PropType = NavigationScreenProps<void>;

@autoFlow
export default class Splash extends React.Component<PropType> {
  static navigationOptions = {
      header: null,
  };

  static *flow(props: PropType): SagaIterator {
    console.log(`I'm Here! ${props.navigation.state.key}`);
    for (;;) {
      const a = yield take();
      console.log(`I'm Here! ${props.navigation.state.key}`);
    }
  }

  onPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Splash');
  };
  back = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <TouchableOpacity onPress={this.back}>
          <Text>Back</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
