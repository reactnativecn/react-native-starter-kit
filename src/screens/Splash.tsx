import { View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import styles = require('./Splash.style');
import { NavigationScreenProps } from 'react-navigation';
import { autoFlow } from '../utils/autoFlow';
import { SagaIterator } from 'redux-saga';
import { connect } from 'react-redux';
import { take, call, setContext } from 'redux-saga/effects';
import { takeInScreen } from '../utils/screenAction';
import { Action } from 'redux';

interface SplashParam{
  counter: number;
};

type PropType = NavigationScreenProps<SplashParam>;


@autoFlow
export default class Splash extends React.Component<PropType> {
  static navigationOptions = {
      header: null,
  };

  static reducer(state: SplashParam, action: Action): SplashParam {
    return state;
  }

  static *flow(): SagaIterator {
    yield takeInScreen();
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
